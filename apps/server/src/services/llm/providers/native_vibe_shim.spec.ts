import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { RESOURCE_DIR } from "../../resource_dir.js";

const python = spawnSync("python3", ["--version"]).status === 0;

describe("Trilium's native Vibe compatibility wrapper", () => {
    it.skipIf(!python)("reports implemented MCP support and confines both selections to the native session layer", () => {
        const fixture = `
import asyncio, runpy, sys, types
names = ["vibe", "vibe.acp", "vibe.acp.agent", "vibe.acp.entrypoint", "vibe.app_server", "vibe.app_server._config_paths", "vibe.app_server.protocol", "vibe.core", "vibe.core.config", "vibe.core.config.layers", "vibe.core.config.layers.overrides", "acp", "acp.schema"]
for name in names:
    mod = types.ModuleType(name)
    mod.__path__ = []
    sys.modules[name] = mod
sys.modules["vibe"].__version__ = "2.26.1"
class Value(types.SimpleNamespace):
    def model_copy(self, update):
        return Value(**(vars(self) | update))
sys.modules["acp.schema"].McpCapabilities = Value
sys.modules["acp.schema"].SetSessionConfigOptionResponse = Value
sys.modules["vibe.app_server.protocol"].ConfigWriteOpWire = Value
sys.modules["vibe.core.config.layers.overrides"].OverridesLayer = Value(NAME="overrides")
sys.modules["vibe.app_server._config_paths"].model_thinking_path = lambda alias: "/models/" + alias.replace("~", "~0").replace("/", "~1") + "/thinking"
sys.modules["vibe.acp.entrypoint"].main = lambda: None
class Config:
    def __init__(self):
        self.current = Value(models=[Value(alias="custom/model:b")], active_model=Value(alias="custom/model:b", thinking_levels=["off", "low"]))
        self.writes = []
    async def write(self, ops, **kwargs):
        assert all(op.target_layer == "overrides" for op in ops)
        self.writes.extend(ops)
        return Value(applied=True)
class Native:
    async def initialize(self, *args, **kwargs):
        return Value(agent_capabilities=Value(load_session=True))
    def _get_session(self, session_id):
        assert session_id == "synthetic"
        return Value(app_server=Value(resources=Value(config=self.config)))
    def _config_options(self, session):
        return ["native receipt"]
    async def set_config_option(self, *args, **kwargs):
        raise AssertionError("Native durable setter must never be called")
sys.modules["vibe.acp.agent"].VibeAcpAgent = Native
loaded = runpy.run_path(sys.argv[1])
async def check():
    agent = loaded["TriliumVibeAgent"]()
    agent.config = Config()
    initialized = await agent.initialize()
    assert initialized.agent_capabilities.mcp_capabilities.http is True
    assert initialized.agent_capabilities.load_session is True
    for key, value in [("model", "custom/model:b"), ("thinking", "low")]:
        result = await agent.set_config_option(key, "synthetic", value)
        assert result.config_options == ["native receipt"]
    assert [(op.path, op.value) for op in agent.config.writes] == [("/active_model", "custom/model:b"), ("/models/custom~1model:b/thinking", "low")]
    for key, value in [("model", "missing"), ("thinking", "max"), ("bypass", True)]:
        try:
            await agent.set_config_option(key, "synthetic", value)
            raise AssertionError("Unsupported choice was accepted")
        except ValueError:
            pass
asyncio.run(check())
sys.modules["vibe"].__version__ = "incompatible"
try:
    runpy.run_path(sys.argv[1])
    raise AssertionError("Incompatible native version accepted")
except RuntimeError:
    pass
print("native wrapper fixture passed")
`;
        expect(execFileSync("python3", ["-c", fixture, path.join(RESOURCE_DIR, "llm", "native-vibe-acp.py")], { timeout: 10_000, encoding: "utf8" })).toContain("native wrapper fixture passed");
    });
});
