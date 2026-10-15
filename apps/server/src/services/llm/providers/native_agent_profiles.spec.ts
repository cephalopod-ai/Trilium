import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ directory: "", lookup: vi.fn() }));
vi.mock("../../data_dir.js", () => ({ default: { get TRILIUM_DATA_DIR() { return state.directory; } } }));
vi.mock("./binary_lookup.js", () => ({ findOnPath: state.lookup, needsShell: () => false }));
const { NATIVE_AGENT_PROFILES, nativeAgentLaunch, nativeSessionMetadata } = await import("./native_agent_profiles.js");
function profile(id: string) {
    const selected = NATIVE_AGENT_PROFILES.find(entry => entry.id === id);
    if (!selected) throw new Error("Missing test profile");
    return selected;
}

describe("Native launch restrictions", () => {
    beforeEach(() => {
        state.directory = fs.mkdtempSync(path.join(os.tmpdir(), "native-profiles-"));
        const executable = path.join(state.directory, "synthetic-agent");
        const interpreter = path.join(state.directory, "python3");
        fs.writeFileSync(interpreter, "synthetic interpreter");
        fs.writeFileSync(executable, `#!${interpreter}\n`);
        state.lookup.mockReset().mockResolvedValue(executable);
    });
    afterEach(() => { vi.unstubAllEnvs(); fs.rmSync(state.directory, { recursive: true, force: true }); });
    it("does not mistake a generic agent executable for Cursor or enable unconfined Pi", async () => {
        for (const id of ["pi-acp", "cursor-agent"]) {
            await expect(nativeAgentLaunch(profile(id))).rejects.toThrow(/disabled/);
        }
        expect(state.lookup).not.toHaveBeenCalled();
        state.lookup.mockResolvedValue(undefined);
        await expect(nativeAgentLaunch(profile("claude-acp"))).rejects.toThrow(/executable not found/);
    });
    it("uses a private Vibe home, requires the restrictive harness, and preserves native model settings", async () => {
        const first = await nativeAgentLaunch(profile("vibe-acp"));
        expect(first.args.at(-1)).toBe("--legacy-harness");
        expect(first.args[0]).toMatch(/native-vibe-acp\.py$/);
        expect(first.binary).toBe(path.join(state.directory, "python3"));
        expect(first.env.VIBE_ENABLED_TOOLS).toBe('["trilium_*"]');
        expect(first.env.VIBE_DISABLED_TOOLS).toContain("?!trilium_");
        expect(first.env.VIBE_ENABLE_TELEMETRY).toBe("false");
        expect(first.env.VIBE_ENABLED_SKILLS).toContain("?!");
        expect(fs.existsSync(path.join(first.cwd, ".git"))).toBe(true);
        const config = path.join(first.env.VIBE_HOME, "config.toml");
        fs.appendFileSync(config, '\nactive_model = "synthetic-local-model"\n');
        const before = fs.readFileSync(config, "utf8");
        await nativeAgentLaunch(profile("vibe-acp"));
        expect(fs.readFileSync(config, "utf8")).toBe(before);
        expect(fs.statSync(config).mode & 0o777).toBe(0o600);
        fs.appendFileSync(config, '\n[[mcp_servers]]\nname = "external"\n');
        await expect(nativeAgentLaunch(profile("vibe-acp"))).rejects.toThrow(/only native model and authentication/);
    });
    it("requires explicit Gemini auth rather than defaulting to API access, and disables native tools/hooks", async () => {
        await expect(nativeAgentLaunch(profile("gemini-cli"))).rejects.toThrow(/Select an authentication method/);
        const home = path.join(state.directory, "native-agents", "gemini-cli", "home");
        fs.mkdirSync(path.join(home, ".gemini"), { recursive: true });
        const settings = JSON.stringify({ security: { auth: { selectedType: "oauth-personal" } } });
        fs.writeFileSync(path.join(home, ".gemini", "settings.json"), settings);
        const launch = await nativeAgentLaunch(profile("gemini-cli"));
        expect(launch.args).toEqual(["--acp", "--extensions", "none"]);
        expect(launch.env.GEMINI_CLI_HOME).toBe(home);
        expect(launch.env.GEMINI_TELEMETRY_ENABLED).toBe("false");
        const policyFile = path.join(launch.cwd, ".gemini", "settings.json");
        const policy = JSON.parse(fs.readFileSync(policyFile, "utf8"));
        expect(policy.tools.core).toEqual([]);
        expect(policy.mcp.allowed).toEqual(["trilium"]);
        expect(policy.hooksConfig.enabled).toBe(false);
        expect(policy.security.disableYoloMode).toBe(true);
        expect(fs.readFileSync(path.join(home, ".gemini", "settings.json"), "utf8")).toBe(settings);
        fs.writeFileSync(policyFile, '{"user": true}');
        await expect(nativeAgentLaunch(profile("gemini-cli"))).rejects.toThrow(/unmanaged/);
    });
    it("repeats Claude's strict SDK policy on new and loaded sessions", async () => {
        const launch = await nativeAgentLaunch(profile("claude-acp"));
        expect(launch.env.CLAUDECODE).toBe("");
        expect(nativeSessionMetadata(profile("claude-acp"))).toMatchObject({ _meta: { claudeCode: { options: {
            tools: [], settingSources: [], strictMcpConfig: true, allowDangerouslySkipPermissions: false,
            settings: { disableAllHooks: true }
        } } } });
    });
});
