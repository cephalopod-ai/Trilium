import fs from "node:fs";
import path from "node:path";

import dataDirs from "../../data_dir.js";
import { RESOURCE_DIR } from "../../resource_dir.js";
import { findOnPath, needsShell } from "./binary_lookup.js";

export interface NativeAgentProfile {
    id: string;
    name: string;
    binary: string;
    binaryEnv: string;
    args: string[];
    approvalMode: string;
    setup: string;
    notes: boolean;
    unavailableReason?: string;
}

/** Launch contracts ported from Gosling's ACP providers, without a Gosling dependency. */
export const NATIVE_AGENT_PROFILES: readonly NativeAgentProfile[] = [
    {
        id: "claude-acp",
        name: "Claude Code ACP",
        binary: "claude-agent-acp",
        binaryEnv: "TRILIUM_CLAUDE_ACP_BINARY",
        args: [],
        approvalMode: "default",
        setup: "Install @agentclientprotocol/claude-agent-acp and authenticate with claude /login.",
        notes: true
    },
    {
        id: "vibe-acp",
        name: "Mistral Vibe ACP",
        binary: "vibe-acp",
        binaryEnv: "TRILIUM_VIBE_ACP_BINARY",
        args: ["--legacy-harness"],
        approvalMode: "ask",
        setup: "Install mistral-vibe 2.26.1 (standard Python entrypoint) and authenticate its Trilium profile with VIBE_HOME=<data>/native-agents/vibe-acp/home vibe --setup.",
        notes: true
    },
    {
        id: "pi-acp",
        name: "Pi ACP",
        binary: "pi-acp",
        binaryEnv: "TRILIUM_PI_ACP_BINARY",
        args: [],
        approvalMode: "approve",
        setup: "Pi ACP adapters differ in tool and MCP support.",
        notes: false,
        unavailableReason: "Pi ACP is disabled: the source adapters do not provide a verified way to disable runtime-owned filesystem/shell tools and inherited extensions. ACP client denials cannot enforce this restriction."
    },
    {
        id: "gemini-cli",
        name: "Gemini CLI ACP",
        binary: "gemini",
        binaryEnv: "TRILIUM_GEMINI_ACP_BINARY",
        args: ["--acp", "--extensions", "none"],
        approvalMode: "default",
        setup: "Install @google/gemini-cli and authenticate with GEMINI_CLI_HOME=<data>/native-agents/gemini-cli/home gemini. Select the authentication method there; no API fallback is used.",
        notes: true
    },
    {
        id: "cursor-agent",
        name: "Cursor ACP",
        binary: "cursor-agent",
        binaryEnv: "TRILIUM_CURSOR_ACP_BINARY",
        args: ["acp"],
        approvalMode: "ask",
        setup: "Cursor's ask mode is not filesystem confinement. No unrelated executable named agent is selected automatically.",
        notes: false,
        unavailableReason: "Cursor ACP is disabled until runtime-owned tools and inherited MCP can be verifiably confined. The headless --force wrapper cannot carry required approvals."
    }
];

export function nativeAgentDirectory(profile: NativeAgentProfile) {
    const directory = path.resolve(dataDirs.TRILIUM_DATA_DIR, "native-agents", profile.id);
    fs.mkdirSync(path.join(directory, "workspace", ".git"), { recursive: true, mode: 0o700 });
    return directory;
}

export async function nativeAgentLaunch(profile: NativeAgentProfile) {
    if (profile.unavailableReason) throw new Error(profile.unavailableReason);
    const binary = process.env[profile.binaryEnv] || await findOnPath(profile.binary);
    if (!binary || !path.isAbsolute(binary) || !fs.existsSync(binary)) throw new Error(`${profile.name} executable not found. ${profile.setup} Set ${profile.binaryEnv} to its absolute path.`);
    const directory = nativeAgentDirectory(profile);
    const env: Record<string, string> = {};
    if (profile.id === "vibe-acp") {
        const home = path.join(directory, "home");
        fs.mkdirSync(home, { recursive: true, mode: 0o700 });
        // A separate native home owns auth; environment policy also applies when project layers are disabled.
        const policy = [
            "# Managed by Trilium native ACP",
            "enable_telemetry = false",
            "enable_connectors = false",
            "experimental_enable_registry_skills = false",
            "include_project_context = false",
            'enabled_skills = ["re:^(?!)$"]',
            'enabled_agents = ["ask"]',
            'enabled_tools = ["trilium_*"]',
            "mcp_servers = []",
            "bypass_tool_permissions = false", ""
        ].join("\n");
        const config = path.join(home, "config.toml");
        if (!fs.existsSync(config)) fs.writeFileSync(config, policy, { mode: 0o600 });
        // The isolated profile is for model/auth setup only, never extension inheritance.
        const configured = fs.readFileSync(config, "utf8").replace(/^\s*mcp_servers\s*=\s*\[\s*\]\s*$/gm, "");
        if (/mcp_servers|tool_paths|agent_paths|skill_paths|\\[uU][0-9a-fA-F]{4,8}/.test(configured) ||
            ["hooks.toml", "tools", "plugins", "agents"].some(name => fs.existsSync(path.join(home, name)))) {
            throw new Error("The isolated Vibe home contains MCP, hooks or custom tools/agents. Use a clean profile containing only native model and authentication settings.");
        }
        const projectConfig = path.join(directory, "workspace", ".vibe");
        fs.mkdirSync(projectConfig, { recursive: true, mode: 0o700 });
        const managed = path.join(projectConfig, "config.toml");
        if (fs.existsSync(managed) && !fs.readFileSync(managed, "utf8").startsWith("# Managed by Trilium native ACP\n")) {
            throw new Error("The native Vibe workspace contains an unmanaged config.toml. Preserve it and choose a clean Trilium native-agent workspace.");
        }
        // Project layers are optional in Vibe; mandatory restrictions also travel in the environment.
        fs.writeFileSync(managed, policy, { mode: 0o600 });
        env.VIBE_HOME = home;
        Object.assign(env, {
            VIBE_ENABLED_TOOLS: '["trilium_*"]',
            VIBE_DISABLED_TOOLS: '["re:^(?!trilium_).*$"]',
            VIBE_MCP_SERVERS: "[]",
            VIBE_TOOL_PATHS: "[]",
            VIBE_AGENT_PATHS: "[]",
            VIBE_SKILL_PATHS: "[]",
            VIBE_DEFAULT_AGENT: "ask",
            VIBE_UTILITY_MODELS__TITLE: "active",
            VIBE_UTILITY_MODELS__SMART_APPROVE: "active",
            VIBE_ENABLED_SKILLS: '["re:^(?!)$"]',
            VIBE_ENABLE_CONNECTORS: "false",
            VIBE_ENABLE_TELEMETRY: "false",
            VIBE_EXPERIMENTAL_ENABLE_REGISTRY_SKILLS: "false",
            VIBE_INCLUDE_PROJECT_CONTEXT: "false",
            VIBE_ENABLE_AUTO_UPDATE: "false",
            VIBE_ENABLE_UPDATE_CHECKS: "false"
        });
    }
    if (profile.id === "claude-acp") {
        env.CLAUDECODE = "";
        env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1";
    }
    if (profile.id === "gemini-cli") {
        const home = path.join(directory, "home");
        const userSettings = path.join(home, ".gemini", "settings.json");
        const method = fs.existsSync(userSettings) ? readProfileJson(userSettings)?.security?.auth?.selectedType : undefined;
        if (typeof method !== "string" || !method.trim()) {
            throw new Error(`Select an authentication method in the isolated Gemini CLI profile first. ${profile.setup}`);
        }
        writeManagedJson(path.join(directory, "workspace", ".gemini", "settings.json"), {
            tools: { core: [], allowed: [], discoveryCommand: "", callCommand: "" },
            mcp: { allowed: ["trilium"] }, mcpServers: {},
            telemetry: { enabled: false }, hooksConfig: { enabled: false }, skills: { enabled: false },
            context: { includeDirectoryTree: false, memoryBoundaryMarkers: [], fileName: [] },
            security: { disableYoloMode: true, disableAlwaysAllow: true }
        });
        env.GEMINI_CLI_HOME = home;
        env.GEMINI_TELEMETRY_ENABLED = "false";
    }
    if (profile.id === "vibe-acp") {
        const descriptor = fs.openSync(binary, "r");
        const header = Buffer.alloc(512);
        try { fs.readSync(descriptor, header, 0, header.length, 0); } finally { fs.closeSync(descriptor); }
        const interpreter = header.toString("utf8").split("\n")[0].match(/^#!(\/[^\r\n]+\/python(?:3(?:\.\d+)?)?)\s*$/)?.[1];
        if (!interpreter || !fs.existsSync(interpreter)) throw new Error("The bounded Vibe adapter requires mistral-vibe 2.26.1's standard Python entrypoint. Packaged executables cannot establish the session-only configuration contract.");
        return { binary: interpreter, args: [path.join(RESOURCE_DIR, "llm", "native-vibe-acp.py"), ...profile.args], env, shell: false, cwd: path.join(directory, "workspace") };
    }
    return { binary, args: profile.args, env, shell: needsShell(binary), cwd: path.join(directory, "workspace") };
}

function writeManagedJson(file: string, config: object) {
    const marker = "Trilium native ACP";
    if (fs.existsSync(file) && readProfileJson(file)?._triliumManaged !== marker) {
        throw new Error("The native workspace contains unmanaged policy settings. Preserve them and choose a clean native-agent workspace.");
    }
    fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
    fs.writeFileSync(file, JSON.stringify({ _triliumManaged: marker, ...config }, null, 4), { mode: 0o600 });
}

function readProfileJson(file: string): { _triliumManaged?: string; security?: { auth?: { selectedType?: unknown } } } {
    try {
        const value = JSON.parse(fs.readFileSync(file, "utf8"));
        if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
        return value;
    } catch {
        throw new Error("The native profile has invalid JSON settings. Repair them using its CLI; configuration contents are not included in this error.");
    }
}

/** Repeated on load: native defaults must never restore builtin tools or inherited MCP. */
export function nativeSessionMetadata(profile: NativeAgentProfile) {
    return profile.id === "claude-acp" ? {
        _meta: { claudeCode: { options: {
            tools: [], settingSources: [], strictMcpConfig: true,
            allowDangerouslySkipPermissions: false, settings: { disableAllHooks: true }
        } } }
    } : {};
}
