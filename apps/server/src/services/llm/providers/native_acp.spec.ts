import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LlmMessage, LlmStreamChunk } from "@triliumnext/commons";

const state = vi.hoisted(() => ({ directory: "", calls: [] as { method: string; params: any }[], connections: [] as any[], scopes: [] as any[], next: 0,
    failSelection: false, mode: "ask", hold: false, pending: new Map<string, (result: unknown) => void>(), authenticated: true, load: true, stopReason: "end_turn" }));
vi.mock("../../data_dir.js", () => ({ default: { get TRILIUM_DATA_DIR() { return state.directory; } } }));
vi.mock("./native_agent_profiles.js", () => ({
    NATIVE_AGENT_PROFILES: [{ id: "fixture", name: "Native fixture", binary: "fixture-acp", args: [], approvalMode: "ask", notes: true, setup: "Native setup" }],
    nativeSessionMetadata: () => ({}),
    nativeAgentLaunch: async () => ({ binary: "fixture-acp", args: [], cwd: state.directory })
}));
vi.mock("./acp_mcp_endpoint.js", () => ({ createScopedAcpMcpEndpoint: vi.fn(async (allowed, before, observe) => {
    const scope = { url: `http://127.0.0.1:9999/native-${state.scopes.length}`, revoke: vi.fn(), allowed, before, observe };
    state.scopes.push(scope); return scope;
}) }));
vi.mock("./acp_client.js", async importOriginal => {
    const original = await importOriginal<typeof import("./acp_client.js")>();
    return { ...original, AcpClient: { start: vi.fn((_binary, options) => {
        const descriptor = (sessionId: string) => ({ sessionId, models: { currentModelId: "one", availableModels: [{ modelId: "one", name: "Same" }, { modelId: "two/:id", name: "Same" }] }, modes: { currentModeId: state.mode, availableModes: [{ id: state.mode }] }, configOptions: [{ id: "thinking", type: "select", currentValue: "low", options: [{ value: "low" }, { value: "high" }] }] });
        const client = { alive: true, dispose() { this.alive = false; }, notify(method: string, params: any) { state.calls.push({ method, params }); },
            async request(method: string, params: any) {
                state.calls.push({ method, params });
                if (method === "initialize") return { protocolVersion: 1, agentCapabilities: { loadSession: state.load, mcpCapabilities: { http: true } } };
                if (method === "session/new") { if (!state.authenticated) throw new original.AcpError(-32000, "Authentication required: secret-synthetic"); return descriptor(`session-${++state.next}`); }
                if (method === "session/load") return descriptor(params.sessionId);
                if (method === "session/set_mode") return {};
                if (method === "session/set_model") { if (state.failSelection) throw new original.AcpError(-32602, "Unsupported model"); return {}; }
                if (method === "session/set_config_option") return {};
                if (method === "session/prompt") {
                    options.onNotification("session/update", { sessionId: params.sessionId, update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: "synthetic reply" } } });
                    if (state.hold) return new Promise(resolve => state.pending.set(params.sessionId, resolve));
                    return { stopReason: state.stopReason };
                }
                throw new Error("Unexpected method " + method);
            }
        }; state.connections.push({ options, client }); return client;
    }) } };
});

const { NativeAcpProvider } = await import("./native_acp.js");
const { answerGoslingPermission } = await import("./gosling_permissions.js");
const config = { chatNoteId: "chat", model: JSON.stringify(["fixture", "one"]) };
const first: LlmMessage[] = [{ role: "user", content: "Synthetic prompt" }];
const followup: LlmMessage[] = [...first, { role: "assistant", content: "synthetic reply" }, { role: "user", content: "Follow up" }];
async function collect(stream: AsyncIterable<LlmStreamChunk>) { const chunks: LlmStreamChunk[] = []; for await (const chunk of stream) chunks.push(chunk); return chunks; }

describe("Direct native ACP sessions", () => {
    let provider: InstanceType<typeof NativeAcpProvider>;
    beforeEach(() => {
        state.directory = fs.mkdtempSync(path.join(os.tmpdir(), "trilium-native-agent-"));
        Object.assign(state, { calls: [], connections: [], scopes: [], next: 0, mode: "ask", hold: false, failSelection: false, authenticated: true, pending: new Map(), load: true, stopReason: "end_turn" });
        provider = new NativeAcpProvider();
    });
    afterEach(() => { provider.dispose(); fs.rmSync(state.directory, { recursive: true, force: true }); });
    it("discovers exact models directly, closes probe processes and never calls Gosling", async () => {
        const models = await provider.listModels();
        expect(models.map(model => model.id)).toEqual([JSON.stringify(["fixture", "one"]), JSON.stringify(["fixture", "two/:id"])]);
        expect(models[0].reasoningEfforts).toEqual(["low", "high"]);
        expect(state.connections[0].client.alive).toBe(false);
        expect(state.calls.some(call => /gosling|providers\//.test(call.method))).toBe(false);
        expect(state.calls.some(call => call.method === "session/prompt")).toBe(false);
        expect(models[0].pricing).toBeUndefined();
    });
    it("streams in order, enforces native approval mode and resumes without duplicate prompts", async () => {
        const chunks = await collect(provider.chatChunks(first, { ...config, reasoningEffort: "low" }));
        expect(chunks.map(chunk => chunk.type)).toEqual(["status", "session_info", "text", "done"]);
        await collect(provider.chatChunks(followup, { ...config, reasoningEffort: "low" }));
        expect(state.connections).toHaveLength(1);
        expect(state.calls.filter(call => call.method === "session/new")).toHaveLength(1);
        expect(state.calls.filter(call => call.method === "session/set_mode").every(call => call.params.modeId === "ask")).toBe(true);
        const prompts = state.calls.filter(call => call.method === "session/prompt");
        expect(prompts).toHaveLength(2);
        expect(prompts[0].params.sessionId).toBe(prompts[1].params.sessionId);
        expect(prompts[1].params.prompt.map((part: any) => part.text).join("")).not.toContain("Visible conversation");
    });
    it("preserves a usable session when a model transition fails and never substitutes a model", async () => {
        await collect(provider.chatChunks(first, config));
        state.failSelection = true;
        await expect(collect(provider.chatChunks(followup, { ...config, model: JSON.stringify(["fixture", "two/:id"]), goslingHandoff: true }))).rejects.toThrow(/rejected the operation/);
        state.failSelection = false;
        await collect(provider.chatChunks(followup, config));
        const prompts = state.calls.filter(call => call.method === "session/prompt");
        expect(prompts).toHaveLength(2);
        expect(prompts[0].params.sessionId).toBe(prompts[1].params.sessionId);
    });
    it("preserves the previous mapping and endpoint when saving a handoff fails before a prompt", async () => {
        await collect(provider.chatChunks(first, config));
        const mappingFile = path.join(state.directory, "native-agents", "sessions.json");
        const before = fs.readFileSync(mappingFile, "utf8");
        const save = vi.spyOn(fs, "renameSync").mockImplementationOnce(() => { throw new Error("Synthetic disk failure"); });
        await expect(collect(provider.chatChunks(followup, { ...config, goslingHandoff: true }))).rejects.toThrow(/No prompt was sent/);
        save.mockRestore();
        expect(fs.readFileSync(mappingFile, "utf8")).toBe(before);
        expect(state.scopes[0].revoke).not.toHaveBeenCalled();
        expect(state.scopes[1].revoke).toHaveBeenCalled();
        await collect(provider.chatChunks(followup, config));
        const prompts = state.calls.filter(call => call.method === "session/prompt");
        expect(prompts).toHaveLength(2);
        expect(prompts[0].params.sessionId).toBe(prompts[1].params.sessionId);
    });
    it("grants note transport by announced ID only, rejects native builtins and refuses cross-chat decisions", async () => {
        state.hold = true;
        const running = collect(provider.chatChunks(first, { ...config, enableNoteTools: true })).catch(error => error);
        await vi.waitFor(() => expect(state.pending.size).toBe(1));
        const connection = state.connections[0];
        const sessionId = state.calls.find(call => call.method === "session/prompt")?.params.sessionId;
        const options = [{ optionId: "once", kind: "allow_once" }, { optionId: "always", kind: "allow_always" }];
        const request = (toolCallId: string) => connection.options.onAgentRequest("session/request_permission", { sessionId, toolCall: { toolCallId }, options });
        expect(request("unknown").outcome.outcome).toBe("cancelled");
        connection.options.onNotification("session/update", { sessionId, update: { sessionUpdate: "tool_call", toolCallId: "note-call", title: "trilium_get_note_content" } });
        expect(request("note-call").outcome).toEqual({ outcome: "selected", optionId: "once" });
        expect(() => connection.options.onAgentRequest("fs/read_text_file", {})).toThrow(/disabled/);
        expect(state.scopes[0].allowed("unrelated_extension", { mutates: false })).toBe(false);
        provider.revoke("chat");
        expect(request("note-call").outcome.outcome).toBe("cancelled");
        expect(await running).toBeInstanceOf(Error);
    });
    it("resumes host-local mappings after restart, and requires handoff when resume is unavailable", async () => {
        await collect(provider.chatChunks(first, config));
        provider.dispose(); provider = new NativeAcpProvider();
        await collect(provider.chatChunks(followup, config));
        expect(state.calls.filter(call => call.method === "session/load")).toHaveLength(1);
        const file = path.join(state.directory, "native-agents", "sessions.json");
        expect(fs.statSync(file).mode & 0o777).toBe(0o600);
        expect(fs.readFileSync(file, "utf8")).not.toContain("Synthetic prompt");
        provider.dispose(); provider = new NativeAcpProvider(); state.load = false;
        await expect(collect(provider.chatChunks([...followup, { role: "assistant", content: "synthetic reply" }, { role: "user", content: "Restart" }], config))).rejects.toThrow(/does not support native resume/);
    });
    it("replaces MCP scopes on reconnection and cannot reactivate the old capability", async () => {
        await collect(provider.chatChunks(first, { ...config, enableNoteTools: true }));
        expect(state.scopes[0].allowed("get_note_content", {})).toBe(false);
        state.connections[0].client.alive = false;
        state.hold = true;
        const running = collect(provider.chatChunks(followup, { ...config, enableNoteTools: true })).catch(error => error);
        await vi.waitFor(() => expect(state.pending.size).toBe(1));
        expect(state.calls.filter(call => call.method === "session/load")).toHaveLength(1);
        expect(state.scopes).toHaveLength(2);
        expect(state.scopes[0].allowed("get_note_content", {})).toBe(false);
        expect(state.scopes[0].revoke).toHaveBeenCalled();
        expect(state.scopes[1].allowed("get_note_content", {})).toBe(true);
        provider.revoke("chat");
        expect(await running).toBeInstanceOf(Error);
    });
    it("isolates simultaneous chats and reports cancellation as incomplete", async () => {
        state.hold = true;
        const firstTurn = collect(provider.chatChunks(first, config)).catch(error => error);
        const second = collect(provider.chatChunks(first, { ...config, chatNoteId: "other" }));
        await vi.waitFor(() => expect(state.pending.size).toBe(2));
        await expect(collect(provider.chatChunks(first, config))).rejects.toThrow(/active turn/);
        const prompts = state.calls.filter(call => call.method === "session/prompt");
        provider.revoke("chat");
        expect(await firstTurn).toBeInstanceOf(Error);
        state.pending.get(prompts[1].params.sessionId)?.({ stopReason: "end_turn" });
        expect((await second).at(-1)?.type).toBe("done");
        expect(state.calls.filter(call => call.method === "session/cancel")).toEqual([{ method: "session/cancel", params: { sessionId: prompts[0].params.sessionId } }]);
    });
    it("requires an independent once-only decision at the actual MCP endpoint and revokes it", async () => {
        state.hold = true;
        const chunks: LlmStreamChunk[] = [];
        const running = (async () => { for await (const chunk of provider.chatChunks(first, { ...config, enableNoteTools: true })) chunks.push(chunk); })().catch(error => error);
        await vi.waitFor(() => expect(state.pending.size).toBe(1));
        const scope = state.scopes[0];
        expect(scope.allowed("get_note_content", { mutates: false })).toBe(true);
        expect(scope.allowed("set_note_content", { mutates: true })).toBe(false);
        const args = { noteId: "synthetic" };
        const decision = scope.before("get_note_content", args);
        await vi.waitFor(() => expect(chunks.some(chunk => chunk.type === "permission")).toBe(true));
        const permission = chunks.find(chunk => chunk.type === "permission");
        expect(permission?.type).toBe("permission");
        if (permission?.type !== "permission") throw new Error("Missing permission");
        expect(answerGoslingPermission("other", permission.permission.requestId, "allow")).toBe(false);
        expect(answerGoslingPermission("chat", permission.permission.requestId, "allow")).toBe(true);
        expect(await decision).toBe(true);
        scope.observe("get_note_content", args, { content: [{ type: "text", text: "Synthetic actual note result" }] });
        await vi.waitFor(() => expect(chunks.some(chunk => chunk.type === "tool_result" && chunk.result === "Synthetic actual note result")).toBe(true));
        provider.revoke("chat");
        expect(await running).toBeInstanceOf(Error);
        expect(scope.allowed("get_note_content", { mutates: false })).toBe(false);
        expect(scope.revoke).toHaveBeenCalled();
    });
    it("never completes a truncated native turn or replays an uncertain prompt", async () => {
        state.stopReason = "max_turn_requests";
        const chunks: LlmStreamChunk[] = [];
        await expect((async () => { for await (const chunk of provider.chatChunks(first, config)) chunks.push(chunk); })()).rejects.toThrow(/did not complete/);
        expect(chunks.some(chunk => chunk.type === "done")).toBe(false);
        expect(JSON.parse(fs.readFileSync(path.join(state.directory, "native-agents", "sessions.json"), "utf8"))[0][1].pending).toBe(true);
        state.stopReason = "end_turn";
        await expect(collect(provider.chatChunks(first, config))).rejects.toThrow(/explicit new-session handoff/);
        expect(state.calls.filter(call => call.method === "session/prompt")).toHaveLength(1);
    });
    it("rejects unsafe modes, unsupported reasoning and authentication failures before inference", async () => {
        state.mode = "auto-approve";
        await expect(collect(provider.chatChunks(first, config))).rejects.toThrow(/required 'ask'/);
        state.mode = "ask";
        await expect(collect(provider.chatChunks(first, { ...config, reasoningEffort: "ultra" }))).rejects.toThrow(/does not expose this reasoning/);
        state.authenticated = false;
        const inventory = await provider.inventory(true);
        expect(inventory.profiles[0].available).toBe(false);
        expect(JSON.stringify(inventory)).not.toContain("secret-synthetic");
        expect(state.calls.some(call => call.method === "session/prompt")).toBe(false);
    });
});
