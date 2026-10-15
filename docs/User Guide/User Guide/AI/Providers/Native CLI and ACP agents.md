# Native CLI and ACP agents
Native CLI / ACP agents connects Trilium directly to an installed agent over local stdio: **Trilium chat → native CLI → its selected model**. Gosling is not needed. The native CLI owns authentication and execution history; Trilium provides chat, note tools and approvals.

This is separate from the <a class="reference-link" href="Gosling.md">Gosling</a> gateway. Existing Claude Code, GitHub Copilot, OpenAI Codex and Google Antigravity integrations remain available under <a class="reference-link" href="Subscription-based%20providers.md">Subscription-based providers</a>.

## Setup

1.  Install an ACP executable on the machine running Trilium. The supported direct profiles are Claude Code ACP, Mistral Vibe ACP and Gemini CLI ACP. Trilium does not download or install these agents.
2.  Authenticate through the native CLI as described below. Keep credentials in its native credential store. Do not paste keys, credential files or subscription tokens into chat notes or Trilium provider settings.
3.  Open **Options → AI / LLM → Add Model Provider → Native CLI / ACP agents**. No API key or gateway URL is required.
4.  Select the desired models explicitly and save. Create a chat note, then choose a native agent/model in its model picker. Sending a message starts inference.

The executable runs on the Trilium host, including when Trilium is accessed through a browser. Native agents are unavailable in standalone and mobile mode. The in-editor assistant requires a different provider because native agents need persistent chat notes.

| Profile | Native setup | Executable override |
| --- | --- | --- |
| Claude Code ACP | Install `@agentclientprotocol/claude-agent-acp`; authenticate with `claude /login`. The existing Claude Code integration is also available. | `TRILIUM_CLAUDE_ACP_BINARY` |
| Mistral Vibe ACP | Install `mistral-vibe` 2.26.1 using its standard Python entrypoint. Authenticate the isolated profile with `VIBE_HOME=<data>/native-agents/vibe-acp/home vibe --setup`; configure its models there using Vibe's native configuration. | `TRILIUM_VIBE_ACP_BINARY` |
| Gemini CLI ACP | Install `@google/gemini-cli`. Run `GEMINI_CLI_HOME=<data>/native-agents/gemini-cli/home gemini` and explicitly select its native authentication method. | `TRILIUM_GEMINI_ACP_BINARY` |
| Pi ACP | Unavailable: source adapters differ in MCP support and do not establish the required runtime-owned tool restrictions. | Reserved `TRILIUM_PI_ACP_BINARY` |
| Cursor ACP | Unavailable: ask mode alone does not confine native tools. The headless wrapper requires approval bypass, which is not enabled. | Reserved `TRILIUM_CURSOR_ACP_BINARY` |

Replace `<data>` with this host's Trilium data directory. Executable overrides must be absolute paths. Otherwise Trilium searches its PATH and login-shell PATH. A generic executable named `agent` is never assumed to be Cursor.

The Vibe wrapper currently requires 2.26.1 and its standard Python entrypoint on macOS/Linux. It uses the installed package's own Python interpreter; packaged executables and other versions fail with a compatibility error. The wrapper keeps model and reasoning writes in Vibe's session-only configuration layer and reports the HTTP MCP support implemented by that version. It does not modify the installed package.

Vibe uses its supported `--legacy-harness` ACP flag because the tested default Unified Harness advertised native filesystem and shell tools despite an allowlist. Versions that remove this flag fail rather than silently switching runtimes. Only native model/auth settings belong in its isolated home; configured MCP, hooks and custom tool/agent directories are rejected. The port does not copy credentials from Gosling or another CLI profile.

## Models, reasoning and privacy

Models are discovered from each installed agent's ACP session model/configuration response. There is no built-in vendor model list. **Refresh native agents and models** in model selection reloads the catalog without rebuilding Trilium. Missing executables, native setup errors and unavailable profiles appear separately; one failed profile does not hide the others.

Exact native identifiers determine routing; names are only labels. A successful model listing proves discovery, not subscription entitlement, current authentication or inference. Errors must be resolved through the selected CLI. Trilium does not select a replacement model or a separately billed API route.

Reasoning controls appear only for supported reported values. **CLI default** retains the session's reported default. Images and binary attachments are disabled until their support is established. Text attachments are supported. Separate Trilium web-search loops and inherited native extensions are unavailable.

Transport stays on this computer, but the native CLI can use an external model endpoint. ACP does not reliably report endpoint locality, so the chat shows **Endpoint: unknown**. Check the native model configuration before sharing content. No remote gateway, synchronization or analytics is enabled by this integration. It can use local model endpoints configured in a compatible native CLI; local inference is not implied by running a local process.

## Notes and approvals

**Note access** starts off. Enabling it exposes bounded note search, metadata and content tools through Trilium's revocable loopback MCP endpoint. Current-note context is included only while note access is enabled. The agent is never given Trilium database-file access.

Reads require a once-only decision. Writes also require **Native agent session permissions → Allow proposed note writes** and a separate once-only approval for each actual tool call. A proposal is text; an applied change is a successful Trilium tool result. Rejection, revocation and tool failures remain visible as errors. The chat displays actual Trilium MCP results, even when a CLI only reports a generic completion label.

Native filesystem, shell and unrelated tools are disabled by each supported profile's native configuration and rejected at the ACP client boundary. This does not sandbox a malicious or incompatible executable; install a trusted compatible native agent. Pi and Cursor stay disabled because a client-side denial alone cannot establish the required boundary.

**Revoke access and cancel this turn** removes the active note capability and cancels pending approvals. Turning access off requires a new-session handoff, so a reused or resumed session cannot keep its earlier note tools. Previously shared content remains in native execution history and the visible conversation. The public MCP setting need not be enabled.

Additional tools such as Muninn, cephalopod-ai, Alexandria and math\_mcp are not inherited by the direct profiles. Their existing domain logic and credentials remain in their systems. Use the Gosling gateway's explicit extension selection when those authorized tools are needed; direct extension selection is not implemented here.

## Sessions and interruptions

Each chat maps to its own native session. Local mappings are stored in `native-agents/sessions.json` under the Trilium data directory; they contain identifiers and history hashes, not transcripts or credentials. They are not synchronized. Native CLIs retain their own execution state.

Model, reasoning or access changes, divergent history or interrupted turns require **Start a new native agent session with visible history on the next turn**. The previous usable session is preserved if creation or configuration fails. Native defaults and other chats are not changed.

Completed sessions resume after a restart only when the installed agent advertises native session loading. Unsupported or failed resume is an error, never automatic replay. Cancellation or a process exit leaves an incomplete turn. Concurrent chats have separate sessions and cancellation. Idle connections are reaped.

## Isolated preview and rollback

Build with `pnpm server:build`. Use a new data directory containing a copy of `packages/trilium-core/src/test/fixtures/document.db` and the isolated loopback `config.ini` example in <a class="reference-link" href="Gosling.md">Gosling</a>, changing the port to an unused port such as 39164. Keep synchronization unconfigured.

```sh
TRILIUM_DATA_DIR=/absolute/path/to/isolated-profile \
TRILIUM_ENV=production node apps/server/dist/main.mjs
```

Open the selected loopback port and log in to the synthetic fixture with `demo1234`. Configure only synthetic test data and a deliberately chosen model endpoint. Stop that preview process and start the existing installation normally to return to it. No notes migration, installation replacement or Gosling process is required.