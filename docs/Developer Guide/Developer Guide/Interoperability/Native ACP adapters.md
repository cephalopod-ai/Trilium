# Native ACP adapters
The `acp-agent` host provider runs native ACP executables directly. It has no dependency on the Gosling binary, inventory methods, runtime, configuration or credential store. The pre-existing `gosling` gateway remains separate. Existing Claude SDK, Copilot, Codex and Antigravity providers are reused rather than duplicated.

## Source contracts

Launch and mode contracts were grounded in Gosling revision `6dd8b7ae8` (`crates/gosling/src/providers/{claude_acp,vibe_acp,pi_acp,gemini_cli,cursor_agent}.rs`) and verified against native sources. The implementation ports the wrapper contracts into TypeScript and reuses Trilium's ACP stdio client, process pool, prompt blocks and stream collector. No Gosling protocol additions are required by this port.

Dynamic catalogs use ACP v1 `initialize`, `session/new`, `models` and `configOptions`. Select options may be grouped. Exact `[profileId, modelId]` JSON tuples survive duplicate labels, slashes and colons. Missing catalogs are labeled as unreported CLI current-model state, never a fabricated vendor catalog. Images/binary attachments, unsupported reasoning and independent Trilium search loops are rejected.

Every prompt requires the profile's advertised approval mode and successful session-local configuration acknowledgements. Updated model/reasoning receipts are checked when supplied. HTTP note tools require explicitly advertised HTTP MCP support. Selection never updates global defaults. Catalog probes have dedicated short-lived connections and cannot dispose the pooled connection of an active chat. Inventory is cached for 60 seconds and supports explicit refresh.

Native source references:

*   [Claude ACP](https://github.com/agentclientprotocol/claude-agent-acp): `NewSessionMeta`, `createSession` SDK options and `requestPermissionFromClient` in `src/acp-agent.ts`.
*   [Gemini CLI](https://github.com/google-gemini/gemini-cli): `packages/cli/src/config/config.ts`, `packages/core/src/config/config.ts`, and ACP session management. `tools.core: []` registers no native builtin tools. The native `--acp` interface replaces Gosling's headless stream-json wrapper.
*   [Vibe](https://github.com/mistralai/mistral-vibe): checked installed 2.26.1 Python entrypoint, config layers, tool manager and ACP agent. The default Unified Harness exposed native builtins despite the configured allowlist; `--legacy-harness` honored it. The port never retries without that flag.
*   [Pi ACP](https://github.com/regadas/pi-acp) and its [upstream](https://github.com/svkozak/pi-acp): client MCP bridging and permission contracts differ; some execute native tools without ACP delegation. Pi remains unavailable.
*   [Cursor ACP](https://prod.cursor.com/docs/cli/acp): stdio and approval support exist, but ask mode alone does not confine runtime-owned reads. Cursor remains unavailable. Gosling's headless `--force` path is not used.

## Native restrictions and authentication

`native_agent_profiles.ts` owns launch, native configuration and unavailability reasons. There is no second tool loop or vendor API adapter here.

Claude sessions repeat `tools: []`, `settingSources: []`, `strictMcpConfig: true`, disabled hooks and disabled permission bypass in `_meta.claudeCode.options` for new and loaded sessions. Authentication stays in Claude's native store. The nested CLI marker is cleared; nonessential native traffic is disabled.

Vibe has an isolated `VIBE_HOME` and working directory under `native-agents/vibe-acp`. Environment restrictions, not just project configuration, allow only Trilium-prefixed tools and reject all other tool names, disable skills, connectors, telemetry and automatic updates. Runtime setup rejects inherited MCP, hooks and custom tool/agent configuration in this isolated home. Native provider/model/auth settings are preserved; credentials are not copied from another profile. Project policy files are managed and cannot overwrite an unmanaged file.

The in-repo `assets/llm/native-vibe-acp.py` wrapper subclasses the installed Vibe ACP agent. It is pinned to 2.26.1 and runs using that installation's own Python shebang interpreter. It adds the missing HTTP MCP receipt for the already implemented transport, and overrides ACP model/thinking setters to use Vibe's `config/write` with `target_layer: overrides`. The upstream ACP setters default to durable native settings; they are never called by this wrapper. Credentials, the agent loop and permission handling remain native. Unsupported versions or packaged executables fail closed. A stdlib fixture checks the version guard, capability receipt, exact escaped model path and session-only writes. The live check compares the native config file hash before and after selection/inference.

Gemini has an isolated `GEMINI_CLI_HOME`. Its native settings must already name an explicitly selected authentication method; no unspecified setup falls back to Gemini API access. Managed workspace settings disable builtin tools, discovery commands, hooks, skills and telemetry, allow only the session's `trilium` MCP server, and disable bypass/remembered allows. Native extensions are disabled with `--extensions none`. Authentication settings stay native and are never projected into notes or options. Malformed native JSON errors are sanitized rather than echoing configuration contents.

These native restrictions assume compatible trusted executables and respect administrator settings. They are not an OS sandbox. Only Vibe's actual native enforcement was exercised in this environment; Claude/Gemini launch policies have fixtures and source grounding but require live compatibility validation before sensitive use. Profiles with no enforceable boundary are unavailable even for text chat, because their runtimes could act without requesting ACP approval.

## Actual tool authority and presentation

A session gets an unguessable loopback MCP scope governed by the active chat's note and write policy. Listing can occur during session setup, but execution cannot. Inactive, revoked and cancelled scopes deny calls. The execution path rechecks permission after awaiting approval and immediately before a synchronous mutation transaction. Async approval never holds a database transaction open.

Only the existing note tool registry is exposed. Every actual operation emits a canonical tool-use block, asks for a transient chat-bound once-only decision, and emits its actual MCP result. The optional MCP result observer makes rejection and execution failures authoritative even if a native adapter only emits “Ran tool.” Native note announcements are hidden to avoid duplicate tool cards.

Some ACP adapters send only an announced tool-call ID in their permission request. With native builtins disabled, an exact known note announcement can grant transport to the guarded MCP endpoint. Metadata identifying Trilium MCP is also accepted. This is not an execution approval: the endpoint separately asks the user before invoking any note tool. Unknown/builtin operations, filesystem/terminal client RPCs and unsupported Cursor plan/question extensions are rejected. No “always allow” option is presented.

Direct additional-extension selection is deliberately absent. The interface rejects inherited extension selections; future support must use explicit named allowlists, native runtime restrictions and the same per-invocation authorization boundary. The Gosling provider already offers its separate explicit extension workflow.

## Session lifecycle

One pooled process per active native profile hosts separate chat sessions, with the existing five-minute idle reap. Stream routing includes both profile identity and session identity; cancellation affects only its chat. The host-local mapping is private atomic JSON under `native-agents/sessions.json` and contains identifiers, policy, pending state and transcript hashes only.

A mapped session is reusable only after an `end_turn`, with matching selected model, reasoning policy, access policy and visible text history. Changed or uncertain state requires an explicit handoff. New-session IDs may not reuse mapped identities. Failed session/configuration/storage transitions preserve the prior mapping and scope. The new pending mapping is saved immediately before prompting, with no intervening asynchronous approval or UI yield. Actual native resume uses `session/load` only when advertised; no silent replay or subscription/API fallback occurs.

Native errors are sanitized, stderr is suppressed, and interrupted/failed turns never emit successful completion. Frontend callbacks from a cancelled or replaced chat cannot append output or permission requests. Note-access revocation cancels the current turn and removes its capability; future tool discovery uses a new session.

## Validation

Focused contracts cover grouped/exact model catalogs, native policies, missing executables, explicit authentication choice, session selection, reasoning rejection, failed-switch and failed-storage preservation, resume, concurrency, cancellation, note authority, actual result observation and builtin permission rejection. Shared ACP transport/pool, existing Gosling behavior, core provider routing and existing client provider tests are also run. Core changes are checked in both server and standalone hosts.

The synthetic browser run used an isolated data profile, Vibe 2.26.1, a loopback OpenAI-compatible model fixture and `TRILIUM_GOSLING_BINARY=/nonexistent/gosling`. It demonstrated streamed/saved text, low reasoning, actual note reads with once-only approval, rejected and applied writes, note revocation with no remaining note tools, and persisted incomplete cancellation. The fixture observed only the bounded note tool catalog when notes were enabled and no tools after revocation.

This is a live native Vibe protocol/tool check with deterministic model responses, not Mistral cloud inference or subscription entitlement. Claude ACP and Gemini CLI were unavailable on the host and are fixture-tested/source-grounded only. Pi/Cursor execution remains disabled; the existing four native providers retain their separate validation boundary. No real notes or cloud credentials were sent to the fixture.

A direct live ACP wrapper check discovered a second synthetic native model after configuration refresh, used two different models and reasoning levels in simultaneous sessions, cancelled one while the other completed, and verified that the native configuration file remained byte-for-byte unchanged. The browser restart check resumed the same native session and saved exactly four messages without prompt replay. These checks used only the loopback fixture.

Final focused validation: 293 server tests across 18 files, 98 client tests across 8 files, and 35 core tests in the standalone host across 2 files; `pnpm typecheck` and the production server/client build pass. Documentation synchronization/check reports zero errors. The Codex compatibility fixture was corrected to recognize the existing shared `ultra` level while still rejecting an unrecognized level; no Codex runtime policy was changed.