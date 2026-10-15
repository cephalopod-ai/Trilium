"""Trilium's version-checked Vibe ACP wrapper; never changes native defaults.

Vibe 2.26.1 supports HTTP MCP but omits its capability receipt. Its ACP config
setters also default to durable user writes. Keep both adaptations here rather
than modifying the installed package or copying native authentication logic.
"""
from vibe import __version__

if __version__ != "2.26.1":
    raise RuntimeError("Trilium's bounded Vibe wrapper requires mistral-vibe 2.26.1")

from acp.schema import McpCapabilities, SetSessionConfigOptionResponse
from vibe.acp import agent as native
from vibe.app_server._config_paths import model_thinking_path
from vibe.app_server.protocol import ConfigWriteOpWire
from vibe.core.config.layers.overrides import OverridesLayer


class TriliumVibeAgent(native.VibeAcpAgent):
    async def initialize(self, *args, **kwargs):
        result = await super().initialize(*args, **kwargs)
        return result.model_copy(update={
            "agent_capabilities": result.agent_capabilities.model_copy(update={
                "mcp_capabilities": McpCapabilities(http=True, sse=True)
            })
        })

    async def set_config_option(self, config_id, session_id, value, **kwargs):
        session = self._get_session(session_id)
        config = session.app_server.resources.config
        if config_id == "model" and isinstance(value, str):
            if not any(model.alias == value for model in config.current.models):
                raise ValueError("Model is unavailable; no substitute was selected")
            field = "/active_model"
        elif config_id == "thinking" and isinstance(value, str):
            model = config.current.active_model
            if value not in model.thinking_levels:
                raise ValueError("Reasoning level is unavailable")
            field = model_thinking_path(model.alias)
        else:
            raise ValueError("Unsupported Trilium native session configuration")
        response = await config.write([
            ConfigWriteOpWire(op="set", path=field, value=value,
                              target_layer=OverridesLayer.NAME)
        ], reason="Trilium session-only selection", reload_runtime=True)
        if not response.applied:
            raise ValueError("Native session configuration was not applied")
        return SetSessionConfigOptionResponse(config_options=self._config_options(session))


# The native entrypoint resolves this class when it constructs its ACP server.
# All authentication, execution, streaming and permission handling stay native.
native.VibeAcpAgent = TriliumVibeAgent
from vibe.acp.entrypoint import main

main()
