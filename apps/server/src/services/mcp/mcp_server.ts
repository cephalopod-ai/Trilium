/**
 * MCP (Model Context Protocol) server for Trilium Notes.
 *
 * Exposes existing LLM tools via the MCP protocol so external AI agents
 * (e.g. Claude Desktop) can interact with Trilium.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { isToolErrorResult } from "@triliumnext/commons";
import { app_info as appInfo } from "@triliumnext/core";
import { cls } from "@triliumnext/core";

import { allToolRegistries, resolveToolRegistries } from "@triliumnext/core/src/services/llm/tools/index.js";
import type { ToolDefinition } from "@triliumnext/core/src/services/llm/tools/tool_registry.js";

import sql from "../sql.js";

/**
 * Register a tool definition on the MCP server.
 *
 * Write operations are wrapped in CLS + transaction context so that
 * Becca entity tracking works correctly.
 */
function registerTool(server: McpServer, name: string, def: ToolDefinition, allowed?: McpToolPolicy, beforeExecute?: McpToolApproval, observe?: McpToolObserver) {
    const execute = (args: any): CallToolResult => {
        if (allowed && !allowed(name, def)) {
            return { content: [{ type: "text", text: "Note access has been revoked or this operation is read-only." }], isError: true };
        }
        const result = cls.init(() => {
            cls.set("componentId", "mcp");

            return def.mutates
                ? sql.transactional(() => def.execute(args))
                : def.execute(args);
        });

        const content: CallToolResult["content"] = [{ type: "text", text: JSON.stringify(result) }];
        // Without `isError`, an agent (and the chat behind it) takes a failure for a success.
        return isToolErrorResult(result) ? { content, isError: true } : { content };
    };
    const handler = beforeExecute ? async (args: any) => {
        let result: CallToolResult;
        if (!await beforeExecute(name, args, def)) {
            result = { content: [{ type: "text", text: "Tool operation was rejected or its authority was revoked." }], isError: true };
        } else {
            // Recheck after the approval wait, immediately before the synchronous transaction.
            try { result = execute(args); } catch { result = { content: [{ type: "text", text: "Tool operation failed." }], isError: true }; }
        }
        observe?.(name, args, result);
        return result;
    } : execute;
    server.registerTool(name, { description: def.description, inputSchema: def.inputSchema }, handler);
}

export type McpToolObserver = (name: string, args: Record<string, unknown>, result: CallToolResult) => void;
export type McpToolApproval = (name: string, args: Record<string, unknown>, definition: ToolDefinition) => Promise<boolean>;
export type McpToolPolicy = (name: string, definition: ToolDefinition) => boolean;

export async function createMcpServer(allowed?: McpToolPolicy, beforeExecute?: McpToolApproval, observe?: McpToolObserver): Promise<McpServer> {
    // Host-registered registries (the User Guide tools) load lazily; the array
    // is complete only after this resolves.
    await resolveToolRegistries();

    const server = new McpServer({
        name: "trilium-notes",
        version: appInfo.appVersion
    });

    for (const registry of allToolRegistries) {
        for (const [name, def] of registry) {
            if (!allowed || allowed(name, def)) {
                registerTool(server, name, def, allowed, beforeExecute, observe);
            }
        }
    }

    return server;
}
