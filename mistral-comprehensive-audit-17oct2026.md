# Trilium comprehensive audit — recovered Mistral work, completed 17 October 2026

**Audited snapshot:** `3e893fd876b26e8ddf5c1b899a5295e2fc8f2f8c` on `main`, `/Users/eric/Work/vscode/Trilium`.
**Authorship:** Mistral produced the recovered lane evidence; Codex recovered, reconciled, supplemented and assembled this report. The filename preserves the original requested name. This is not a claim that Mistral finished the interrupted engagement.
**Mode:** report-only static audit. Security, data-audit and playtest skills remain excluded as the saved original request specified. Product source, configuration, dependencies and Git history were not changed. This report and its JSON companion are the requested output artifacts.

## Executive verdict

The accepted in-scope set contains **18 findings: 1 High, 9 Medium and 8 Low**; none Critical. **11 are Confirmed source properties and 7 are Likely runtime-dependent mechanisms.** No target-runtime reproduction was performed in this report-completion run.

The highest-priority issue is the shared icon-button accessible-name gap. The next repair group concerns truthful batch/AI state, transport cancellation, file-log recovery, a permanently bypassed production standalone cache, provider-cache publication under configuration edits, and keyboard/crash containment. Several issues are narrow retention/cleanup or evidence-traceability defects rather than immediate production outages.

Recovered analysis is materially useful, but it contained false positives and scope leaks. The claimed overlapping-backup corruption missed the shared mutex; alleged unbounded scheduled-backup accumulation missed fixed backup slots; blanket absence of client error boundaries missed the user-script boundary. Security/data allegations were not promoted into this report. No basis was found for a whole-product deployment stop from this limited non-security/non-data review; targeted repairs and platform verification are recommended.

**Completion meaning:** the recovery and consolidated report are complete. The repository audit has comprehensive *scope inventory* with prioritized static samples; it is not an exhaustive review of every file or a claim that every catalog gate passed. The per-lens frontier, individual taxonomy dispositions and missing runtime gates are explicit below and in the JSON. The original unlaunched work is not silently marked complete.

## 1. Scope, recovery and evidence provenance

The saved parent request was: “run a full audit using agent-skills and write a report - mistral-comprehensive-audit-17oct2026.md - but skip playtest audit skills, data audit skills, and security audit skills.” The present instruction asks to finish that report and recover what is available; it does not revoke those exclusions.

### What survived

| Artifact | Recovered state | Treatment |
| --- | --- | --- |
| Parent `e662a8e3-ab12-b063-16bd-fa646fe7d5ad` | 65 saved checkpoint message records | Reconstructed intent, exclusions and unlaunched queue; not treated as proof of execution. |
| `sa-arc-1` | 157 records; partial seam analysis, no final architecture file | Candidate mechanisms and contrary evidence recovered, then checked against source. |
| `sa-fail-1` | 169 records; reliability report saved | All 8 reported candidates dispositioned. Failsafe second lens was not completed by Mistral. |
| `sa-ui-1` | 99 records; workflow and design reports saved | All 3 WFG and 5 design candidates dispositioned. |
| `sa-adv-1` | 214 records; negative-space and posture reports saved | All 5 NEG and 4 CMP candidates dispositioned, including exclusion filtering. |
| Five lane Markdown files | Found under `/tmp/trilium-audit-17oct2026/`; copied to a durable scratch directory | Preserved byte-for-byte as historical evidence; their assertions are superseded by the decisions in this report. |
| Architecture candidate list | 9 named candidates survive in the interrupted transcript | All 9 dispositioned; no invented completion of its Node second lens. |
| Queue for later waves | 26 intended lenses across 13 groups | Scope inventory rebuilt; source surveys added where useful; remaining detailed checks explicitly Not Reviewed. |

The current child-store census found the four recoverable child sessions rooted in this parent. Earlier stopped attempts appear in parent notifications, but no additional corresponding child store was found in that census. Three recovered children ended on HTTP 402 “Vibe budget exhausted”; the architecture child ended after a 720-second stream stall. Failure status does not mean saved results disappeared.

Recovery copies and readable records are at `/Users/eric/.vibe/scratchpad/mistral-recovery-2026-10-17-r5m1r7zo/`; lane copies, normalization and checkpoints are at `/Users/eric/.vibe/scratchpad/trilium-comprehensive-audit-2026-10-17/`. Raw reasoning/session records are deliberately not embedded in this portable report; conclusions, evidence and concise adjudication are.

### Snapshot, method and effort

- The recovered orientation and current HEAD agree on the same full commit. Git status was clean before report artifacts were written. The earlier merge/deletion retained all integrated code on main; branch cleanup did not remove these session files.
- Catalog discovery was rerun with the recovered exclusions. Twenty-six in-scope lenses were loaded/inventoried, and standalone applicability gates were triaged. Shared evidence discipline, severity/confidence calibration and output contracts were loaded. Exact file hashes of the active skill documents and core shared contracts are in the JSON, avoiding a false single version number for independently versioned documents.
- The static inventory includes 24 top-level app/package manifests and 2,871 tracked source/test files under the stated filter: 1,648 production files and 1,223 test files. This is an inventory count, not a deep-read or passing-test count. Excluded from this count: assets, translations, dist/out-tsc and selected vendor trees; generated/vendored artifacts were not ranked as product defects.
- All 34 recovered named candidates were reconciled: 12 retained with necessary narrowing/downgrades; the others are rejected, unconfirmed, opportunities or excluded handoffs. Six additional source findings were added, yielding 18 unique findings. Cross-lens duplicates are represented by one finding with cross-references.
- Budget shape: recover before rerunning; review all recovered candidates; trace priority producer/consumer and sibling paths; use focused static surveys for the unlaunched queue. Stop at the documented source frontier rather than inventing runtime results. The six-gate design and full performance/runtime matrices were not completed dynamically.
- Tools actually used for verification: Git status/log/ref/remote reads; rg source/reference searches; numbered source reads; Python standard-library JSON/file/hash/manifest/reference checks; primary W3C/Bootstrap documentation reads. No app build, launch, test suite, package install, database mutation, remote integration, credential read or failure drill was performed for this audit.

The 16 October data audit and remediation ledger are separate historical engagements. Their 37 fixed / 1 clarified / 2 partial / 5 routed tally is not added to this report, not revalidated here, and not represented as fresh data-audit coverage. They remain available in `/Users/eric/.vibe/scratchpad/findings/REMEDIATION-2026-10-16.{md,json}`.

## 2. Draft-prompt assessment and scope decisions

“Comprehensive” means every relevant operational surface and eligible lens receives an explicit disposition; it cannot mean a security audit after security was expressly excluded. Similar discipline applies to data correctness and playtesting. Reliability review of deadlines, resource lifetime, failure signals and operator recovery remains in scope; proving sync/import/tree integrity does not. Incidental excluded candidates are listed as unvalidated handoffs, not disguised as High NEG/ARC findings.

Assumptions: use the currently checked-out repository and original filename; complete by report generation rather than patching; reuse the recovered snapshot because its full SHA matches; preserve the original artifacts; static sampling is permissible under the shared audit method. No production topology, SLO, model retirement, current vendor pricing, independent review or successful runtime reproduction is inferred.

## 3. Surface inventory and boundary map

| Surface | Actor / trigger | Intended boundary | Static result / frontier |
| --- | --- | --- | --- |
| Server boot / host providers | Node server, Electron host | Explicit initializeCore, fatal startup refusal, lazy optional providers | Fatal outer catch and named unavailable-host error hold in sample; whole loader graph/build not verified. |
| Shared completion stack | Configured provider, active chat | Current config identity, bounded I/O, explicit done/error | Provider-cache race, Node cancellation and empty-result gaps. |
| Native/Gosling ACP | Chat turn, model/session handoff | Pending mapping, end_turn, abort and lease ownership | Sampled pending/completion/cleanup controls hold; installed CLI behavior not exercised. |
| MCP HTTP/tool adapter | External host and tool calls | Registered schemas, error channel, transport lifetime | isError and close handling hold in sample; security and live conformance excluded/unverified. |
| Batch operations | User-selected notes/actions | Per-item result retained to UI | Failure reasons disappear before unconditional toast. |
| Preact/legacy widgets | Pointer, keyboard, assistive tech | Accessible name/role, teardown, crash fallback | Shared icon naming, generic click targets, listener teardown and general mount fallback gaps. |
| Standalone browser shell | Web tab, SW and dedicated worker | One owner, explicit worker outcome, honest offline status | Web Lock holds in supported path; cache bypass and restore-waiter cleanup gaps. |
| Backup scheduler | Timer, user backup action | Serialized writer, fixed slots, complete publication | Counterevidence rejects overlap/retention claims; no crash/restore data-integrity proof. |
| Diagnostics | Process/stream failure, health probe | Durable log or visible fallback; liveness/readiness distinction | File-stream recovery gap; console fallback survives; constant health is liveness-only. |
| Repository/CI artifacts | Developer/agent, release/review | Correct target and retained verification evidence | Wrong-origin instructions and missing historical temporary logs; no root script target gap found. |

Declared dependency direction: client→commons and transports; server/standalone→core+commons; desktop→server and client assets; mobile→standalone. Deep desktop/server imports are consistent with the declared embedding graph; folder names alone do not prove a violation. Core/host portability and actual artifacts still need runtime build checks.

### Agent/provider run-state map

| State / transition | Evidence owner | Observed boundary |
| --- | --- | --- |
| Configured provider → instance | core `llm/index.ts` | Source invalidation exists, but stale async construction can republish (ARC-TRI17-001). |
| Native selection/history change → session | `native_acp.ts` | Explicit handoff required when a stored mapping cannot be reused. |
| Before prompt | `native_acp.ts` | Pending mapping is saved before session/prompt. |
| During prompt | ACP client/pool | Request deadline, routed updates, abort and lease ownership. |
| Successful native completion | `native_acp.ts` | Requires end_turn, then updates history and clears pending before done. |
| Error/interruption | provider finally and client chat | Scoped cleanup/lease release; partial output is qualified; done-only UI still lacks notice. |
| Worker loss | standalone local bridge | API pending map rejects, separate restore map is omitted (FSR-TRI17-001). |

No multi-role coder/reviewer gate is invented for a product that provides chat/provider adapters. Security authority comparisons in the AOC taxonomy remain excluded. The reviewed outputs are protocol/tool/status values, not evidence that a model’s prose proves an operation succeeded.

## 4. Skill coverage and applicability

| Skill | Work performed | Concrete sample / associated findings | Unreviewed frontier |
| --- | --- | --- | --- |
| `audit-architecture-seam` | Recovered partial analysis reconciled | Declared host/package graph; route wrappers; backend/frontend siblings; options/IPC candidates; PDF iframe boundary. ARC-TRIL-007; ARC-TRI17-001 | No full import graph or complete ownership census; the prior options/sync correctness candidate is outside the recovered exclusion scope. |
| `audit-architecture-nodejs` | Prioritized static supplement | Server startup, CLS/AsyncLocalStorage, explicit core initialization, async provider cache publication, Node/browser request siblings and host registration. ARC-TRI17-001; REL-TRIL-003 | No fresh Node/Electron/browser builds, loader-order experiment, CJS/ESM duplicate-instance proof or whole-repo cycle recount. |
| `audit-architecture-drift` | Prioritized static supplement | Architecture/Backend/Project Structure docs and their registry; actual 24 workspace manifests; declared desktop embedding and portable-core split. ARC-TRI17-002; WFG-TRI17-005 | No numeric architecture health score or trend: no comparable graph baseline. Data/security registry rows excluded, not passed. |
| `audit-contract-internalapi` | Prioritized static supplement | Bulk service→route→client outcome shape; LLM done/error protocol; typed Electron bridge vs legacy handlers; native ACP parser. WFG-TRIL-001; WFG-TRIL-003; ARC-TRIL-007 | No exhaustive field-by-field contract census or request fuzzing. A typed interface is not a runtime-validator proof. |
| `audit-reliability` | Recovered report reconciled + supplement | All eight recovered REL candidates; request deadlines, logger fallback, task lifetime, server boot and backup scheduling. REL-TRIL-003; REL-TRIL-006; REL-TRIL-007; REL-TRI17-001 | No network/disk/process failure drill, load test or availability SLO measurement. The unauthenticated resource-exhaustion claim is excluded security work. |
| `audit-failsafe-readiness` | Prioritized static supplement | Operational startup, missing provider, stalled request, worker error, restore completion, native interruption and terminal status scenarios. FSR-TRI17-001; REL-TRIL-003; REL-TRIL-006 | Scenario table below is static; no kill/corruption/production outage. Not a readiness certification. |
| `audit-recovery-idempotency` | Prioritized static supplement | Native pending mapping, explicit handoff, finalization and resource release; backup mutex/publication counterevidence; failure settlement. FSR-TRI17-001 | Deep import/erase/sync/migration data correctness and ETAPI duplication are excluded; existing 16 October follow-ups remain open, not regraded. |
| `audit-operator-signal` | Prioritized static supplement | Bulk success toast, AI toggle, empty completion, startup/error overlay, log fallback and health probe semantics. WFG-TRIL-001; WFG-TRIL-002; WFG-TRIL-003; REL-TRIL-006 | Health is liveness-only, not a proven readiness contract violation. No alert-delivery or paging drill. |
| `audit-workflow-gui` | Recovered report reconciled + supplement | All three recovered WFG findings, original server/client paths and standalone startup status/caching. WFG-TRIL-001; WFG-TRIL-002; WFG-TRIL-003; WFG-TRI17-005 | No playtest, real browser interaction or user study; workflow conclusions are traced source behavior. |
| `audit-design-webapp` | Recovered six-gate report reconciled | Five recovered candidates; shared ActionButton, tooltip hook, native control semantics, viewport and Preact mount/error containment. DES-TRIL-001; DES-TRIL-002; DES-TRIL-003; DES-TRIL-005 | No AT/device/contrast/render measurements. Gate scores below deliberately avoid whole-gate Pass claims from static samples. |
| `audit-negative-space` | Recovered report scope-filtered + static supplement | All five recovered NEG candidates classified; empty-success, partial batch, stale provider generation, dev/prod divergence and worker-loss assumptions challenged. ARC-TRI17-001; WFG-TRI17-005 | Recovered high security/data mechanisms are out of scope. No assertion that the negative-space taxonomy was exhaustively executed. |
| `audit-compliance-posture` | Recovered report reconciled | All four recovered CMP candidates checked against historical report wording, current external ledgers and temporary-log existence. CMP-TRIL-001 | No external compliance framework or certification scope supplied; no security posture attestation. Distinct skill/base versions do not automatically imply drift. |
| `audit-repo-path-consistency` | Prioritized static supplement | Actual root/remote; root script file-target existence; tracked production-source machine-home literals; workspace inventory. ARC-TRI17-002 | No fresh clone, checkout relocation, IDE resolver exercise or installed-tool origin proof. Source inventories cannot prove runtime provenance. |
| `audit-repo-state-reconciliation` | Recovered state reconciled | HEAD/main/status, merge checkpoint, original audit session, four child stores, five lane files and the separate 16 October remediation ledger. CMP-TRIL-001; ARC-TRI17-002 | No new remote fetch/PR mutation; stored origin/main is local tracking evidence. Historical statements remain dated history. |
| `audit-deadcode-cleanup` | Prioritized static supplement | Exact legacy printing channels and production senders; intentionally unreachable service-worker cache branches; documented scoped PDF shim. ARC-TRIL-007; WFG-TRI17-005 | No deletion performed; dynamic/external compatibility consumers need owner confirmation before removal. No universal dead-code clearance. |
| `audit-testsuite-economics` | Policy/fixture survey | Root/package test entry points, Vitest project selection, server setup/isolation/maxWorkers, ActionButton/tooltip specs and CI workflow selection.  | No new timings, mutation score or fixture-isolation runtime validation. Server/standalone test rollback hooks are no-ops; existing green tests are not borrowed as production rollback proof. |
| `audit-optimization-opportunities` | Evidence-gated static survey | Existing ACP pooling, dynamic model cache, selective test policy, fixed backup slots, unreachable SW cache implementation and uncleared timer. REL-TRI17-001; WFG-TRI17-005 | No measured savings, cost claims or speculative cache/refactor ranking. Pool reuse and distinct runtime tests are intentional, not presumed waste. |
| `audit-performance-profile` | Static work-shape survey only | Process reuse, model-list single-flight/TTL, startup lazy host registration, request materialization and timer retention.  | No profile, benchmark, p50/p95/p99, cold-start measurement, query plan or bundle-size measurement. Performance gates are Not Verified; do not publish invented speedups. |
| `audit-memory-lifecycle` | Prioritized static supplement | Task registry, tooltip listeners, timeLimit timer closures, warm session pools and standalone callback registries. REL-TRIL-007; WFG-TRI17-004; REL-TRI17-001; FSR-TRI17-001 | No heap snapshots, RSS curve, retained-byte measurement or native allocation drill. Retention property differs from reproduced memory exhaustion. |
| `audit-resource-lifecycle` | Prioritized static supplement | ACP request timers/dispose/idle release, Node request lifetime, logger lifecycle, backup mutex and browser callback cleanup. REL-TRIL-003; REL-TRIL-006; REL-TRI17-001 | No process-tree, FD, SIGTERM-drain or disk-full runtime proof. Platform-specific Windows and mobile cleanup remains a drill frontier. |
| `audit-dependency-criticality` | Dependency/register survey | DB worker as local single writer; configured provider as selected completion dependency; Node HTTP peer and file log directory; named unavailable-host errors. REL-TRIL-003; REL-TRIL-006; FSR-TRI17-001 | No deployment asset/quota export or high-availability requirement. A single local DB or chosen provider is not automatically a defect. |
| `audit-invariant-sync` | Non-data replicated-contract survey | Host provider types vs registrations; standalone local API prefix sets; shared LLM/WS contracts and Electron bridge membership. ARC-TRIL-007 | Persistence schema, import/export and transaction invariants excluded as data-audit work; no exhaustive replicated-list census. |
| `audit-mcp-server` | Protocol/lifecycle source survey | Shared tool-definition registration, isError propagation, lazy registry loading, stateless transport and response-close teardown.  | Security cells explicitly excluded. No SDK protocol handshake, live host, tool-selection benchmark, description-quality census or catalog-wide conformance run. |
| `audit-llm-config-drift` | Local configuration/contract survey | Selected model metadata, dynamic model listing, source-sensitive provider cache and local provider configuration paths. ARC-TRI17-001 | No live provider credentials/catalog retirement verification or price freshness certification; no model retirement alleged from memory. |
| `audit-pipeline-externalapi` | Provider seam survey | Node and browser HTTP deadline policy, model-list deadlines, provider result/error/empty outcome, cancellation and completion protocol. REL-TRIL-003; WFG-TRIL-003 | Security/credential-scope cells excluded. No live billing, rate-limit, webhook/pagination or retry-side-effect drill; unknown provider guarantees remain unknown. |
| `audit-agent-orchestration-code` | Native/Gosling seam source survey | Selected agent/model routing, explicit session handoff, pending/final mapping, end_turn requirement, cancellation, output and lease cleanup. ARC-TRI17-001; WFG-TRIL-003 | Role/credential authority cells excluded as security. No installed vendor CLI invocation or full fake-agent matrix; live interoperability is not claimed. |

### Excluded and inapplicable candidates

| Candidate family | Disposition | Basis |
| --- | --- | --- |
| Security family and SecOps | Excluded by original request | No new auth/exploit/credential posture findings accepted. NEG security candidates are handoff pointers only. |
| Dataflow cascade/concurrency/integrity/input-output/state-transition/temporal/pipeline-graph | Excluded by original request | No rerun of the 16 October data audit or silent reuse of its counts as fresh work. |
| Playtest | Excluded by original request | No browser walkthrough, end-user task session or device playtest. |
| audit-graphdb-design | Excluded data scope; structurally no graph-engine target | This snapshot has a SQLite-backed note graph, not a supplied graph DB deployment/proposal. |
| audit-equation-sourcebase | Not applicable; also data scope excluded | No raw→curated mathematical equation corpus/sourcebase pipeline supplied. |
| audit-flutter-ios | Not applicable | Mobile package is Capacitor/standalone, not a Flutter/Dart/pubspec target. |
| audit-design-handheld | Not applicable | Skill targets games/gamified handheld interfaces; this is a knowledge-base app. Mobile web concerns remain in design-webapp. |
| audit-go-repo-hardening | Not applicable | The supplied implementation is TypeScript/Preact/Node/Electron, not a Go CLI/daemon. |
| audit-contract-crossrepo | Not executed; second-repository side unavailable | Native/Gosling implementations outside this repository were not supplied as versioned targets. Internal bridge seams were reviewed under internalapi/AOC; third-party calls under XAPI. |
| audit-multiagent-consensus | Not requested | Recovered outputs are not blind corroboration; the completer reuses their evidence. No independent critic/consensus claim is made. |

### Taxonomy-level coverage ledger

The JSON companion retains 446 distinct skill/code rows discovered from the selected skill inventories, checklists and inventory references. Each carries a status and scope note. An unchecked cell is **Not Reviewed**, never a pass. Rows explicitly labelled Held apply only to their stated sample. Partial/security-excluded cells cannot establish whole-protocol or whole-repository clearance.

For readability, the full per-code ledger is in the companion JSON under `taxonomy_coverage`; the table above is the complete per-lens scope/frontier index. This avoids inflating hundreds of unexecuted checklist entries into clean results.

## 5. Consolidated findings

| Order | ID | Severity | Confidence | Domain | Title | Source |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | DES-TRIL-002 | High | Confirmed | Workflow-GUI | Desktop ActionButton omits a meaningful accessible name and supplies only a tooltip | Recovered + rechecked |
| P2 | WFG-TRIL-001 | Medium | Confirmed | Workflow-GUI | Bulk actions suppress item failures while the client announces execution | Recovered + rechecked |
| P3 | WFG-TRIL-002 | Medium | Likely | Workflow-GUI | The AI feature switch and existing-chat execution use different predicates | Recovered + rechecked |
| P4 | REL-TRIL-003 | Medium | Likely | Reliability | Node outbound request deadlines do not cancel the transport | Recovered + rechecked |
| P5 | REL-TRIL-006 | Medium | Likely | Reliability | The server log write stream lacks a local error and recovery policy | Recovered + rechecked |
| P6 | WFG-TRI17-005 | Medium | Confirmed | Workflow-GUI | Production standalone service-worker paths permanently bypass their static cache | Supplemental source review |
| P7 | ARC-TRI17-001 | Medium | Likely | Architecture | An in-flight provider construction can repopulate a newly invalidated cache with old settings | Supplemental source review |
| P8 | DES-TRIL-003 | Medium | Confirmed | Workflow-GUI | Tab controls and PDF attachment actions use click-only generic elements | Recovered + rechecked |
| P9 | DES-TRIL-001 | Medium | Likely | Workflow-GUI | The shared viewport explicitly caps user scaling at one | Recovered + rechecked |
| P10 | DES-TRIL-005 | Medium | Likely | Workflow-GUI | General Preact widget mounts have no shared crash fallback | Recovered + rechecked |
| P11 | REL-TRIL-007 | Low | Confirmed | Reliability | TaskContext retains every task ID for the lifetime of the process | Recovered + rechecked |
| P12 | WFG-TRI17-004 | Low | Confirmed | Workflow-GUI | Tooltip effect cleanup leaves its native show listener attached | Supplemental source review |
| P13 | FSR-TRI17-001 | Low | Likely | Failsafe | Standalone worker failure does not settle restore waiters | Supplemental source review |
| P14 | WFG-TRIL-003 | Low | Confirmed | Workflow-GUI | A successful stream with no content ends without an empty-result notice | Recovered + rechecked |
| P15 | REL-TRI17-001 | Low | Confirmed | Reliability | timeLimit leaves its deadline timer armed after early settlement | Supplemental source review |
| P16 | ARC-TRIL-007 | Low | Confirmed | Architecture | Legacy print and PDF-export IPC handlers have no supported bridge caller | Recovered + rechecked |
| P17 | CMP-TRIL-001 | Low | Confirmed | Compliance-Posture | Historical verification evidence points only to twelve missing temporary logs | Recovered + rechecked |
| P18 | ARC-TRI17-002 | Low | Confirmed | Architecture | Repository instructions name a different origin and checkout topology | Supplemental source review |

Confidence is about the named property, not a guarantee of a runtime incident. Confirmed retention does not mean measured OOM; confirmed cache bypass does not mean every offline start fails. High accessibility impact is specific to affected assistive-technology workflows.

## 6. Detailed findings

### DES-TRIL-002: Desktop ActionButton omits a meaningful accessible name and supplies only a tooltip

Severity: High  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Workflow-GUI

Provenance: recovered DES-TRIL-002; source and upstream Bootstrap implementation rechecked.

Evidence:

- `apps/client/src/widgets/react/ActionButton.tsx:45-65`

```
    const title = keyboardShortcut?.length
        ? `${text} (${keyboardShortcut.map((shortcut) => joinShortcut(formatShortcut(shortcut))).join(", ")})`
        : text;
    const titleRef = useRef(title);
    titleRef.current = title;
    const declined = !!noTooltipOnTouch && cachedIsMobile;
    const hasTitle = !!title && title.length > 0 && !declined;

    // The tooltip is recreated only when its structural options (or its presence) change — not when
    // the label text changes. A plain text change is pushed into the live tooltip via setContent
    // below, so a dynamic label updates in place instead of disposing and recreating the tooltip,
    // which would drop the current hover. The title is resolved lazily (a function) so Bootstrap
    // always reads the latest value from titleRef rather than one captured when the config was memoized.
    const tooltipConfig = useMemo<Partial<Tooltip.Options>>(() => ({
        title: hasTitle ? () => titleRef.current ?? "" : undefined,
        placement: titlePosition ?? "bottom",
        fallbackPlacements: [ titlePosition ?? "bottom" ],
        customClass: tooltipClass ?? "",
        html: tooltipHtml ?? false,
        trigger: cachedIsMobile ? "focus" : "hover focus",
        animation: false
```

- `apps/client/src/widgets/react/ActionButton.tsx:81-95`

```
    return <button
        ref={buttonRef}
        // An action button is driven by its onClick — it must never act as a form's
        // implicit submit button (a <button> defaults to type="submit"). Otherwise,
        // inside a <form>, pressing Enter could activate it instead of submitting
        // (e.g. the error-dismiss button stealing the login form's Enter).
        type="button"
        class={`${className ?? ""} ${!noIconActionClass ? "icon-action" : "btn"} ${icon} ${frame ? "btn btn-primary" : ""} ${disabled ? "disabled" : ""} ${active ? "active" : ""}`}
        onClick={triggerOwnCommand}
        // Only where the tooltip that would otherwise carry it has been declined: elsewhere the
        // tooltip is the button's name, and a second one here would be read out beside it.
        aria-label={declined ? title : undefined}
        disabled={disabled}
        {...restProps}
    />;
```

- `apps/client/src/widgets/react/hooks.tsx:1342-1352`

```
    useEffect(() => {
        const hasTooltip = config?.title || elRef.current?.getAttribute("title");
        if (!elRef?.current || !hasTooltip) return;

        // Capture element now, since elRef.current may be null during cleanup.
        const element = elRef.current;

        // Dispose any existing tooltip before creating a new one
        Tooltip.getInstance(element)?.dispose();

        const tooltip = new Tooltip(element, config);
```

- `apps/client/package.json:40`

```
    "bootstrap": "5.3.8",
```

The exact upstream implementation is [Bootstrap 5.3.8 tooltip.js](https://github.com/twbs/bootstrap/blob/v5.3.8/js/src/tooltip.js), particularly `_fixTitle()` and `show()`. The naming requirement is explained by [W3C, Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). These are reference criteria, not an accessibility certification.

Observed behavior:
- The icon-only button has no text child or title attribute; aria-label is supplied only on the declined-tooltip touch path. Normal desktop rendering passes title through Bootstrap configuration.

Expected boundary:
- Every interactive control needs a programmatically determinable name independent of whether a hover popup is visible.

Failure mechanism:
- The component assumes tooltip content names its trigger. Bootstrap 5.3.8 show() assigns aria-describedby; its _fixTitle() copies a name only from a real title attribute, which this button does not provide. The hook does not add a name.

Break-it angle:
- Render an ActionButton with text and an icon on the ordinary desktop path; inspect its accessible name before and after focus. The touch path is an important counterexample, not proof the desktop path works.

Impact:
- High for assistive-technology workflows: a shared toolbar/settings control can be unidentified. The recovered count of 144 call sites is not treated as 144 independently observed failures; no screen-reader session was run.

Operational impact:
- Blast radius: Workflow; side-effect class: user-visible; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Give the button a stable accessible name on every platform, using plain label text even when the visual tooltip supports HTML. Keep tooltip descriptions and shortcut hints without duplicate announcements.
- Local guardrail: Assert the computed accessible name for desktop and touch variants, not just an aria attribute.

Implementation assessment:
- Complexity: local_guardrail; cost: S; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Assert the computed accessible name for desktop and touch variants, not just an aria attribute.
- Recommended, not run: Verify representative toolbar and settings buttons with a screen reader and check that tooltip descriptions do not duplicate the name.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### WFG-TRIL-001: Bulk actions suppress item failures while the client announces execution

Severity: Medium  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Workflow-GUI

Provenance: recovered WFG-TRIL-001; both producer and consumer rechecked.

Evidence:

- `packages/trilium-core/src/services/bulk_actions.ts:183-201`

```
function executeActions(actions: BulkAction[], noteIds: string[] | Set<string>) {
    for (const resultNoteId of noteIds) {
        const resultNote = becca.getNote(resultNoteId);

        if (!resultNote) {
            continue;
        }

        for (const action of actions) {
            try {
                getLog().info(`Applying action handler to note ${resultNote.noteId}: ${JSON.stringify(action)}`);

                const handler = ACTION_HANDLERS[action.name] as (a: typeof action, n: BNote) => void;
                handler(action, resultNote);
            } catch (e: any) {
                getLog().error(`ExecuteScript search action failed with ${e.message}`);
            }
        }
    }
```

- `packages/trilium-core/src/services/bulk_actions.ts:32-39`

```
    saveRevision: (action, note) => {
        // Mirror forceSaveRevision: skip protected notes outside a protected session
        // rather than throwing and aborting the whole batch.
        if (!note.isContentAvailable()) {
            getLog().info(`Skipping saveRevision for protected note ${note.noteId}.`);
            return;
        }
        note.saveRevision({ description: action.revisionName ?? "", source: "manual" });
```

- `packages/trilium-core/src/routes/api/bulk_action.ts:15-24`

```
    if (actions && actions.length > 0) {
        for (const action of actions) {
            if (!action.name) {
                throw new Error("Action must have a name");
            }
        }
        bulkActionService.executeActions(actions, affectedNoteIds);
    } else {
        bulkActionService.executeActionsFromNote(bulkActionNote, affectedNoteIds);
    }
```

- `apps/client/src/services/bulk_action.ts:113-122`

```
    await server.post("bulk-action/execute", {
        noteIds: targetNoteIds,
        includeDescendants,
        actions
    });

    await ws.waitForMaxKnownEntityChangeId();

    if (!silent) {
        toast.showMessage(t("bulk_actions.bulk_actions_executed"), 3000);
```

- `apps/client/src/translations/en/translation.json:92`

```
    "bulk_actions_executed": "Bulk actions have been executed successfully.",
```

Observed behavior:
- The service catches per-action errors and several handlers skip work. Neither the route nor client receives applied/skipped/failed item results; a successful request leads to the generic execution toast.

Expected boundary:
- Batch success feedback must preserve partial failure and skip information.

Failure mechanism:
- The catch converts an item failure into a log line, then the void return erases the distinction between full and partial completion across the route/client seam.

Break-it angle:
- Mix an ordinary note and a protected/unavailable note in a saveRevision batch, or provoke an action error on one item. Trace the 2xx result and toast.

Impact:
- The user cannot determine which notes were affected. Blind retries can reapply operations to already successful items. The issue is missing outcome reporting, not a claim that every action needs one all-or-nothing transaction.

Operational impact:
- Blast radius: Workflow; side-effect class: DB; reversibility: reversible; operator visibility: silent; rerun safety: unknown.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: explicit lifecycle protocol.
- Return structured per-item outcomes and aggregate counts; show partial completion with actionable reasons. Preserve per-item failure isolation.
- Local guardrail: Exercise a mixed-success batch and assert applied/skipped/failed results.

Implementation assessment:
- Complexity: workflow_protocol; cost: M; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Exercise a mixed-success batch and assert applied/skipped/failed results.
- Recommended, not run: Assert the client reports partial completion and permits retrying only failed items.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### WFG-TRIL-002: The AI feature switch and existing-chat execution use different predicates

Severity: Medium  
Confidence: Likely  
Evidence basis: simulation-reasoned  
Domain: Workflow-GUI

Provenance: recovered WFG-TRIL-002; actual English copy checked, product-intent claim downgraded.

Evidence:

- `apps/client/src/widgets/type_widgets/options/llm.tsx:42-62`

```
            {/* The switch governs the whole page rather than anything on it, so it belongs to the
                header — on the row below the title, clear of the dialog's own close button. */}
            <OptionsPageHeader
                helpUrl="GBBMSlVSOIGP"
                below={
                    <OptionCardSection
                        className="options-header-switch"
                        name="ai-enabled"
                        label={t("llm.enabled")}
                        description={t("llm.enabled_description")}
                    >
                        <FormToggle currentValue={aiEnabled} onChange={setAiEnabled} />
                    </OptionCardSection>
                }
            />

            {aiEnabled && (
                <>
                    <ProviderSettings kind="llm" allProviders={allProviders} setAllProviders={setAllProviders} />
                    <ProviderSettings kind="search" allProviders={allProviders} setAllProviders={setAllProviders} />
                    <McpSettings />
```

- `apps/client/src/services/llm_providers.ts:34-50`

```
export function readSelectedModels(): { models: ModelOption[]; groups: ModelProviderGroup[]; hasProvider: boolean } {
    const configs = ((options.getJson("llmProviders") as StoredProviderConfig[] | null) ?? [])
        .filter(config => isProviderOfKind(config, "llm"));
    const groups: ModelProviderGroup[] = configs.map(config => ({
        id: config.id,
        name: config.name,
        provider: config.provider,
        models: (config.selectedModels ?? []).map(model => ({
            ...model,
            provider: config.provider,
            providerId: config.id,
            providerName: config.name,
            costDescription: formatModelCost(model)
        }))
    }));
    const models = groups.flatMap(g => g.models);
    return { models, groups, hasProvider: configs.length > 0 };
```

- `apps/client/src/widgets/type_widgets/llm_chat/ChatInputBar.tsx:249-257`

```
    // Show setup prompt if no provider is configured
    if (!chat.isCheckingProvider && !chat.hasProvider) {
        return (
            <div className="llm-chat-no-provider">
                <div className="llm-chat-no-provider-content">
                    <span className="bx bx-bot llm-chat-no-provider-icon" />
                    <p>{t("llm_chat.no_provider_message")}</p>
                    <Button
                        text={t("llm_chat.add_provider")}
```

- `packages/trilium-core/src/services/llm/chat.ts:34-75`

```
): AsyncGenerator<LlmStreamChunk> {
    // `webSearch` comes from the stored provider config only, never from the request.
    const config: LlmProviderConfig = { ...requestConfig, webSearch: getSearchProviderSetup(requestConfig.webSearchProviderId) };
    try {
        if (!hasConfiguredProviders()) {
            yield { type: "error", error: "No LLM providers configured. Please add a provider in Options → AI / LLM." };
            return;
        }

        // Prefer routing by the provider config id — it disambiguates multiple
        // configs of the same type (e.g. OpenAI + a self-hosted Ollama). Chats
        // saved before providerId existed fall back to type-based resolution.
        // Host-provided tool registries load lazily; the providers' synchronous
        // buildTools() reads the registry array, so it must be complete first.
        await resolveToolRegistries();

        const provider = config.providerId
            ? await getProvider(config.providerId)
            : await getProviderByType(config.provider || "anthropic");

        const modelId = config.model || provider.getAvailableModels().find(m => m.isDefault)?.id;
        if (!modelId) {
            yield { type: "error", error: "No model specified and no default model available for the provider." };
            return;
        }

        // Prefer the config's stored selection for name/pricing — it carries the
        // denormalized metadata even for dynamically discovered models the curated
        // list doesn't know. Fall back to the provider's curated list, then the id.
        const selectedModel = getSelectedModel(config.providerId, modelId);
        const pricing = selectedModel?.pricing ?? provider.getModelPricing(modelId);
        const modelDisplayName = selectedModel?.name
            ?? provider.getAvailableModels().find(m => m.id === modelId)?.name
            ?? modelId;

        // Chunk-native provider (e.g. Claude Agent): it owns its own agentic loop
        // and produces LlmStreamChunks directly, including honouring the abort.
        const chunks = provider.chatChunks
            ? provider.chatChunks(messages, config, abortSignal)
            : streamToChunks(provider.chat(messages, config, abortSignal), { model: modelDisplayName, provider: provider.name, pricing });

        for await (const chunk of chunks) {
```

- `apps/client/src/translations/en/translation.json:4116-4117`

```
    "enabled": "AI features",
    "enabled_description": "Adds the AI chat sidebar and LLM chat notes, using the providers configured below.",
```

Observed behavior:
- Settings conditionally render provider/MCP cards from aiEnabled. Existing chat input uses configured-provider presence; the shared completion service does not consult the switch. Actual English copy is AI features / Adds the AI chat sidebar and LLM chat notes, using the providers configured below; it does not explicitly promise cancellation or a provider-network kill switch.

Expected boundary:
- The product must define whether disabling AI features only hides creation/entry points or also blocks further use from existing chats, and communicate that distinction.

Failure mechanism:
- Visibility gating and execution gating have different owners and predicates. Stored provider configuration survives disabling, and the active chat path continues resolving it.

Break-it angle:
- Configure a provider, retain an existing chat note, turn AI off, and trace sending from that note or the authenticated completion route. No credential or security-boundary claim is made here.

Impact:
- An operator may interpret the off state as preventing new AI work although existing chats remain usable. This is a Likely workflow/policy mismatch, not a confirmed violation of an explicit network-disable promise. Ongoing-turn cancellation semantics also need an explicit product decision.

Operational impact:
- Blast radius: Workflow; side-effect class: external API; reversibility: reversible; operator visibility: silent; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: explicit lifecycle protocol.
- Define whether the switch means hide or disable. If it disables capability, gate the shared completion entry point and existing-chat input, and refresh open views on option changes.
- Local guardrail: With aiEnabled false, assert the agreed behavior through every completion transport.

Implementation assessment:
- Complexity: workflow_protocol; cost: M; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: With aiEnabled false, assert the agreed behavior through every completion transport.
- Recommended, not run: Keep a chat open while toggling the option and verify visible state and provider-call counts.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### REL-TRIL-003: Node outbound request deadlines do not cancel the transport

Severity: Medium  
Confidence: Likely  
Evidence basis: simulation-reasoned  
Domain: Reliability

Provenance: recovered REL-TRIL-003; Node/browser sibling comparison; runtime confidence downgraded.

Evidence:

- `apps/server/src/services/request.ts:132-155`

```
                const request = resolvedClient.request({
                    method: opts.method,
                    // url is used by electron net module
                    url: opts.url,
                    // 4 fields below are used by http and https node modules
                    protocol: parsedTargetUrl.protocol,
                    host: parsedTargetUrl.hostname,
                    port: parsedTargetUrl.port,
                    path: parsedTargetUrl.path,
                    timeout: opts.timeout, // works only for node.js client
                    headers,
                    agent: proxyAgent,
                    // Chromium caches a 301 indefinitely, so a cached redirect would outlive a fixed sync host.
                    cache: "no-store"
                });

                request.on("error", (err) => reject(generateError(opts, err)));

                request.on("response", (response) => {
                    // Once headers arrive, `electron.net` reports a mid-body failure by
                    // destroying the response stream rather than the request. An "error"
                    // event with no listener is rethrown by Node and crashes the Electron
                    // main process, so this listener is load-bearing, not defensive.
                    response.on("error", (err: unknown) => reject(generateError(opts, String(err))));
```

- `packages/trilium-core/src/services/utils/index.ts:176-191`

```
    return new Promise((res, rej) => {
        let resolved = false;

        promise
            .then((result) => {
                resolved = true;

                res(result);
            })
            .catch((error) => rej(error));

        setTimeout(() => {
            if (!resolved) {
                rej(errorTimeLimit);
            }
        }, limitMs);
```

- `packages/trilium-core/src/services/setup.ts:83-90`

```
        // the response is expected to contain documentId and documentSecret options
        const resp = await request.exec<SetupSyncSeedResponse>({
            method: "get",
            url: `${syncServerHost}/api/setup/sync-seed`,
            auth: { password, totpToken },
            proxy: syncProxy,
            timeout: 30000 // seed request should not take long
        });
```

- `apps/standalone/src/lightweight/request_provider.ts:46-60`

```

        const controller = new AbortController();
        const timeoutId = opts.timeout
            ? setTimeout(() => controller.abort(), opts.timeout)
            : undefined;

        try {
            const response = await fetch(opts.url, {
                method: opts.method,
                headers,
                body,
                signal: controller.signal,
                credentials: "include"
            });

```

Observed behavior:
- The Node provider passes timeout to request options but registers no timeout teardown handler. Callers may race the returned promise against timeLimit; the seed setup call relies only on the request option. The browser sibling explicitly aborts its fetch.

Expected boundary:
- Deadline expiry must end the underlying I/O and settle the operation, not only stop one caller waiting.

Failure mechanism:
- Promise rejection is disconnected from socket/request lifetime. The Node request is not destroyed when the wrapper expires; setup has no wrapper deadline on the seed call. Actual socket leakage/hang was not reproduced.

Break-it angle:
- Use a local fake peer that accepts and stalls; inspect request closure after deadline and repeat without restarting the client. Also exercise the setup seed path.

Impact:
- A stalled peer may leave setup pending or accumulate live network work after callers report timeouts. No EMFILE, OOM or once-per-minute leak was observed; connection behavior and the sync mutex must be considered in a drill.

Operational impact:
- Blast radius: Service; side-effect class: network; reversibility: reversible; operator visibility: log-only; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Add deadline-driven cancellation at the transport owner, propagate abort signals, clean up timers/listeners, and handle the Node and Electron client variants explicitly.
- Local guardrail: A fake stalled peer must cause bounded rejection and connection closure, including setup seed.

Implementation assessment:
- Complexity: local_guardrail; cost: S; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: A fake stalled peer must cause bounded rejection and connection closure, including setup seed.
- Recommended, not run: Repeat timeout, partial-body error, success and caller cancellation cases and assert no retained sockets or timers.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### REL-TRIL-006: The server log write stream lacks a local error and recovery policy

Severity: Medium  
Confidence: Likely  
Evidence basis: simulation-reasoned  
Domain: Reliability

Provenance: recovered REL-TRIL-006; narrowed after inspecting console fallback and rotation.

Evidence:

- `apps/server/src/log_provider.ts:43-57`

```
    protected override openLogFile(fileName: string): void {
        const logPath = path.join(dataDir.LOG_DIR, fileName);
        this.logFile = fs.createWriteStream(logPath, { flags: "a" });
    }

    protected override closeLogFile(): void {
        if (this.logFile) {
            this.logFile.end();
            this.logFile = undefined;
        }
    }

    protected override writeEntry(entry: string): void {
        this.logFile?.write(entry);
    }
```

- `packages/trilium-core/src/services/file_based_log.ts:83-99`

```
    protected async rotateLogFile(): Promise<void> {
        await this.closeLogFile();
        this.todaysMidnight = this.getTodaysMidnight();
        await this.openLogFile(this.getLogFileName());

        // Trigger cleanup asynchronously
        this.cleanupOldLogFiles().catch(() => {
            // Ignore cleanup errors
        });
    }

    protected checkDateAndRotate(millisSinceMidnight: number): number {
        if (millisSinceMidnight >= DAY) {
            // Trigger rotation asynchronously to avoid blocking
            this.rotateLogFile().catch(() => {});
            return millisSinceMidnight - DAY;
        }
```

- `apps/server/src/services/process_errors.ts:117-127`

```
function logSafely(description: string) {
    // The console line goes out first and unconditionally: it is the only channel guaranteed to exist,
    // and terminal users would otherwise see nothing.
    console.error(description);

    try {
        getLog().error(description);
    } catch {
        // The log service may not be initialized yet — an escaped error during startup is exactly when
        // that happens — and this handler must never throw.
    }
```

Observed behavior:
- The file stream is opened and written without a stream-specific error listener or recovery state. The shared date rotation starts asynchronously and suppresses rotation rejection. Process error reporting does retain a console fallback.

Expected boundary:
- Diagnostic-channel failure should be detected without depending on the same failed channel; recovery or explicit degradation should be bounded and visible.

Failure mechanism:
- No component owns a failed file stream transition. The general error handler can report to console, but does not reopen the stream. An outage lasting for the entire process lifetime is not established: later rotation can reopen it.

Break-it angle:
- Inject a write-stream error on a disposable path, then restore writability and examine console, UI and subsequent file output.

Impact:
- File diagnostics may be lost while the process continues. The recovered claim of total silent diagnostic loss was too strong because console output and process-level notifications exist.

Operational impact:
- Blast radius: Service; side-effect class: file; reversibility: reversible; operator visibility: log-only; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Own write-stream errors locally, keep the console fallback, mark degradation, and define a bounded reopen/backoff policy that does not recurse through the failed logger.
- Local guardrail: Inject stream-open and mid-write errors and assert no uncaught logging recursion.

Implementation assessment:
- Complexity: local_guardrail; cost: S; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Inject stream-open and mid-write errors and assert no uncaught logging recursion.
- Recommended, not run: Restore writability and prove either recovery or a persistent actionable degraded signal.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### WFG-TRI17-005: Production standalone service-worker paths permanently bypass their static cache

Severity: Medium  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Workflow-GUI

Provenance: supplemental Codex source review.

Evidence:

- `apps/standalone/src/sw.ts:1-10`

```
// public/sw.js
const VERSION = "localserver-v1.4";
const STATIC_CACHE = `static-${VERSION}`;

// Check if running in dev mode (passed via URL parameter)
const isDev = true;

/* v8 ignore next 3 -- @preserve: isDev is hardcoded true, so the dev-mode log always runs and has no testable alternate branch. */
if (isDev) {
    console.log('[Service Worker] Running in DEV mode - caching disabled');
```

- `apps/standalone/src/sw.ts:70-84`

```
async function cacheFirst(request) {
    /* v8 ignore start -- @preserve: isDev is hardcoded true, so only the dev bypass executes; the cache implementation is dead code. */
    // In dev mode, always bypass cache
    if (isDev) {
        return fetch(request);
    }

    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;

    const fresh = await fetch(request);
    // Cache only successful GETs
    if (request.method === "GET" && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
```

- `apps/standalone/src/sw.ts:88-106`

```
async function networkFirst(request) {
    /* v8 ignore start -- @preserve: isDev is hardcoded true, so only the dev bypass executes; the cache implementation is dead code. */
    // In dev mode, always bypass cache
    if (isDev) {
        return fetch(request);
    }

    const cache = await caches.open(STATIC_CACHE);
    try {
        const fresh = await fetch(request);
        // Cache only successful GETs
        if (request.method === "GET" && fresh.ok) cache.put(request, fresh.clone());
        return fresh;
    } catch (error) {
        // Fallback to cache if network fails
        const cached = await cache.match(request);
        if (cached) return cached;
        throw error;
    }
```

- `apps/standalone/vite.config.mts:369-375`

```
        outDir: join(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: join(__dirname, 'src', 'index.html'),
                sw: join(__dirname, 'src', 'sw.ts'),
                'local-bridge': join(__dirname, 'src', 'local-bridge.ts'),
```

- `apps/standalone/vite.config.mts:465-468`

```
    define: {
        "process.env.IS_PREACT": JSON.stringify("true"),
        __TRILIUM_INTEGRATION_TEST__: JSON.stringify(process.env.TRILIUM_INTEGRATION_TEST ?? ""),
    }
```

- `apps/standalone/src/main.ts:24-30`

```
 * report it while the worker was still on `sqlite`, and the monotonic guard in reportSplashPhase()
 * would then swallow every later worker phase.
 */
const STANDALONE_STARTUP_PHASES: SplashPhase[] = [
    { id: "service-worker", weight: 1, status: "Setting up offline support…" },
    { id: "worker-modules", weight: 1, status: "Starting up…" },
    { id: "sqlite", weight: 3, status: "Loading the database engine…" },
```

Observed behavior:
- The service worker hardcodes isDev=true. Both cache-first and network-first immediately return fetch(), and installation never precaches. The production entry includes this source; Vite defines no replacement for that local constant. Startup nevertheless describes the phase as offline support.

Expected boundary:
- A production offline-support signal should correspond to an intentional, tested application-shell cache strategy, or clearly describe the limitation.

Failure mechanism:
- A development bypass is compiled into the same service-worker entry used for production. The apparent cache/fallback implementation is unreachable. This is separate from local database persistence and the API worker bridge.

Break-it angle:
- Build a production browser artifact, warm it, close it, then reopen without network with ordinary HTTP-cache conditions controlled. Compare network/cache behavior with the source expectations.

Impact:
- The service worker provides no static-shell offline fallback and no intended cache-first performance behavior. Browser HTTP caching might still permit some starts; the audit does not assert universal offline failure. Bundled Capacitor assets are a distinct deployment and are not claimed broken.

Operational impact:
- Blast radius: Workflow; side-effect class: network; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: explicit lifecycle protocol.
- Choose explicit production caching/update semantics, derive development mode from the build, and verify an offline shell plus deployment-update consistency. Do not cache mutable API responses as a shortcut.
- Local guardrail: Assert production routing reaches the intended cache path while development remains network-only.

Implementation assessment:
- Complexity: workflow_protocol; cost: M; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Assert production routing reaches the intended cache path while development remains network-only.
- Recommended, not run: Test production warm-start, offline reopen, cache eviction, new-deployment update and missing-asset recovery.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### ARC-TRI17-001: An in-flight provider construction can repopulate a newly invalidated cache with old settings

Severity: Medium  
Confidence: Likely  
Evidence basis: simulation-reasoned  
Domain: Architecture

Provenance: supplemental Codex source review.

Evidence:

- `packages/trilium-core/src/services/llm/index.ts:123-133`

```
function getConfiguredProviders(): LlmProviderSetup[] {
    try {
        const providersJson = optionService.getOptionOrNull("llmProviders");
        if (providersJson !== cachedProvidersSource) {
            cachedProviders = {};
            cachedProvidersSource = providersJson;
        }
        if (!providersJson) {
            return [];
        }
        return (JSON.parse(providersJson) as LlmProviderSetup[]).filter(c => isProviderOfKind(c, "llm"));
```

- `packages/trilium-core/src/services/llm/index.ts:144-168`

```
export async function getProvider(providerId?: string): Promise<LlmProvider> {
    const configs = getConfiguredProviders();

    if (configs.length === 0) {
        throw new Error("No LLM providers configured. Please add a provider in Options → AI / LLM.");
    }

    // Find the requested provider or use the first one
    const config = providerId
        ? configs.find(c => c.id === providerId)
        : configs[0];

    if (!config) {
        throw new Error(`LLM provider not found: ${providerId}`);
    }

    // Check cache
    if (cachedProviders[config.id]) {
        return cachedProviders[config.id];
    }

    // Create new provider instance
    const provider = await createProviderInstance(config.provider, config.apiKey, config.baseURL);
    cachedProviders[config.id] = provider;
    return provider;
```

- `packages/trilium-core/src/services/llm/index.ts:225-230`

```
/**
 * Clear the provider cache. Call this when provider configurations change.
 */
export function clearProviderCache(): void {
    cachedProviders = {};
    cachedProvidersSource = null;
```

Observed behavior:
- Provider configuration changes clear a shared cache. getProvider reads a configuration, awaits creation, and then stores the resulting instance into the current cache keyed only by config ID.

Expected boundary:
- Cache publication must remain associated with the configuration revision that created the instance.

Failure mechanism:
- Request A captures settings A and awaits a dynamic factory. Settings change; request B resets/builds cache B. If A finishes later, it can insert an A instance into cache B, while cachedProvidersSource still records settings B. A later lookup for that ID returns stale settings until another invalidation.

Break-it angle:
- Defer a first construction, edit the same provider ID, complete the new lookup, then release the old factory and inspect subsequent resolution. This interleaving was reasoned from source, not executed.

Impact:
- A saved provider edit may not take effect consistently; calls can continue using the old endpoint/configuration. Race frequency and live provider effects are unmeasured.

Operational impact:
- Blast radius: Workflow; side-effect class: external API; reversibility: reversible; operator visibility: silent; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: explicit lifecycle protocol.
- Bind cache entries and in-flight construction to a source/generation fingerprint; publish only if that generation is still current. Define whether the initiating request may finish using its original configuration.
- Local guardrail: Use deferred factories to reproduce both completion orders across a configuration change.

Implementation assessment:
- Complexity: workflow_protocol; cost: S; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Use deferred factories to reproduce both completion orders across a configuration change.
- Recommended, not run: Assert subsequent lookups always use the current revision and that a stale completion cannot overwrite it.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### DES-TRIL-003: Tab controls and PDF attachment actions use click-only generic elements

Severity: Medium  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Workflow-GUI

Provenance: recovered DES-TRIL-003; markup and alternate-path qualification rechecked.

Evidence:

- `apps/client/src/widgets/tab_row.ts:30-43`

```
const TAB_TPL = `
<div class="note-tab">
  <div class="note-tab-wrapper">
    <div class="note-tab-drag-handle"></div>
    <div class="note-tab-icon"></div>
    <div class="note-tab-title"></div>
    <div class="note-tab-pin-indicator bx bx-pin" aria-label="${t("tab_row.unpin_tab")}"></div>
    <div class="note-tab-close bx bx-x" aria-label="${t("tab_row.close_tab")}"></div>
  </div>
</div>`;

const CONTAINER_ANCHOR_TPL = `<div class="tab-row-container-anchor"></div>`;

const NEW_TAB_BUTTON_TPL = `<div class="note-new-tab" data-trigger-command="openNewTab" aria-label="${t("tab_row.add_new_tab")}">+</div>`;
```

- `apps/client/src/widgets/sidebar/pdf/PdfAttachments.tsx:51-61`

```
    const sizeText = formatSize(attachment.size);

    return (
        <div className="pdf-attachment-item" onClick={() => onDownload(attachment.id)}>
            <Icon icon="bx bx-paperclip" />
            <div className="pdf-attachment-info">
                <div className="pdf-attachment-filename">{attachment.filename}</div>
                <div className="pdf-attachment-size">{sizeText}</div>
            </div>
            <Icon icon="bx bx-download" />
        </div>
```

Observed behavior:
- Close/new-tab controls are divs; PDF attachment rows attach onClick to a div without native button semantics, focusability or keyboard activation in that component.

Expected boundary:
- Each visible interactive control should expose its role and be operable through the keyboard, with native elements preferred.

Failure mechanism:
- Click delegation works independently of semantic element type, so the visual action can work with a mouse while lacking direct focus/activation semantics.

Break-it angle:
- Navigate the visible controls using Tab, Enter and Space. Separately verify global tab shortcuts: they mitigate access to tab operations but do not give the controls their own roles.

Impact:
- Keyboard and assistive-technology users encounter inconsistent controls. The report does not claim that opening or closing a tab is impossible through every alternate command.

Operational impact:
- Blast radius: Workflow; side-effect class: user-visible; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: truthful operator feedback.
- Use native buttons or links with appropriate names. Preserve drag exclusions and styling, set type=button, and avoid nested interactive elements.
- Local guardrail: Assert semantic role, accessible name and focus order for each changed control.

Implementation assessment:
- Complexity: operator_ux; cost: M; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Assert semantic role, accessible name and focus order for each changed control.
- Recommended, not run: Activate through Enter/Space and verify the same tab/download outcome as pointer activation.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### DES-TRIL-001: The shared viewport explicitly caps user scaling at one

Severity: Medium  
Confidence: Likely  
Evidence basis: simulation-reasoned  
Domain: Workflow-GUI

Provenance: recovered DES-TRIL-001; severity and runtime claims recalibrated.

Evidence:

- `apps/client/index.html:6-9`

```
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, interactive-widget=resizes-content" />
        <link rel="manifest" crossorigin="use-credentials" href="manifest.webmanifest">
```

Reference: [W3C, Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html). Browser-specific magnification and reflow were not observed.

Observed behavior:
- The client viewport contains maximum-scale=1.

Expected boundary:
- Supported low-vision workflows need a usable way to enlarge content; browser-specific zoom behavior must be tested rather than assumed.

Failure mechanism:
- A maximum-scale directive requests a fixed scale on browsers/WebViews that honor it. User accessibility overrides and browsers that ignore it prevent a universal no-zoom claim.

Break-it angle:
- On each supported mobile browser/WebView, enlarge the interface and note content to at least 200% and check controls, reading and reflow.

Impact:
- Potential zoom restriction on honoring runtimes. The original High and platform-wide claims are reduced to Medium/Likely because no device or browser measurement exists.

Operational impact:
- Blast radius: Workflow; side-effect class: user-visible; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Remove the restrictive scale cap unless a demonstrated platform requirement justifies it; test gesture behavior and accessible text enlargement on the supported device matrix.
- Local guardrail: Inspect the delivered viewport after production build.

Implementation assessment:
- Complexity: local_guardrail; cost: XS; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Inspect the delivered viewport after production build.
- Recommended, not run: Check enlargement and reflow on Android Chrome/WebView and iOS separately; do not infer their behavior from one runtime.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### DES-TRIL-005: General Preact widget mounts have no shared crash fallback

Severity: Medium  
Confidence: Likely  
Evidence basis: simulation-reasoned  
Domain: Workflow-GUI

Provenance: recovered DES-TRIL-005; false global-absence assertion corrected.

Evidence:

- `apps/client/src/widgets/react/react_utils.tsx:86-101`

```
export function renderReactWidgetAtElement(parentComponent: Component | null, el: JSX.Element, container: Element | DocumentFragment) {
    render((
        <ParentComponent.Provider value={parentComponent}>
            {el}
        </ParentComponent.Provider>
    ), container);
    return $(container) as JQuery<HTMLElement>;
}

/**
 * Unmounts the tree rendered into `container`, running every effect cleanup and releasing the DOM
 * the vnodes still point at. `container` has to be the element the tree was rendered *into* -- for a
 * widget built by `renderReactWidget()` that is the fragment, not the `$widget` it returned.
 */
export function disposeReactWidget(container: Element | DocumentFragment) {
    render(null, container);
```

- `apps/client/src/services/render.tsx:81-99`

```
    // Render the element.
    const UserErrorBoundary = class UserErrorBoundary extends Component {
        constructor(props: object) {
            super(props);
            this.state = { error: null };
        }

        componentDidCatch(error: unknown) {
            onError?.(error, bundle.noteId);
            this.setState({ error });
        }

        render() {
            if ("error" in this.state && this.state?.error) return null;
            return this.props.children;
        }
    };
    const el = h(UserErrorBoundary, {}, h(result as () => VNode, {}));
    renderReactWidgetAtElement(closestComponent, el, $el[0]);
```

Observed behavior:
- The ordinary mount helper renders the supplied subtree directly through a context provider. A separate UserErrorBoundary exists for script-rendered user components, so the recovered blanket claim of no boundary anywhere is false.

Expected boundary:
- A fault in a normal application widget should have a bounded, visible recovery state at an appropriate pane boundary.

Failure mechanism:
- The script-render path owns an error boundary, while the general mount seam does not introduce one. A normal widget render failure can escape that mount; actual pane loss and recovery have not been exercised.

Break-it angle:
- Use a test-only throwing child at a normal widget mount; compare with the script-render boundary and check unaffected panes.

Impact:
- Potential blank/broken pane and unclear recovery. No claim that every error unmounts the complete application or loses editor content is supported.

Operational impact:
- Blast radius: Workflow; side-effect class: user-visible; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: explicit lifecycle protocol.
- Place a scoped error boundary at the normal widget/pane mount seam with error reporting and an explicit retry/reload affordance. Keep script error handling separate.
- Local guardrail: Inject a throwing normal child and assert a visible fallback plus preserved sibling interaction.

Implementation assessment:
- Complexity: workflow_protocol; cost: M; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Inject a throwing normal child and assert a visible fallback plus preserved sibling interaction.
- Recommended, not run: Verify resetting the boundary on note/pane change and that logging is preserved.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### REL-TRIL-007: TaskContext retains every task ID for the lifetime of the process

Severity: Low  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Reliability

Provenance: recovered REL-TRIL-007; retention confirmed, magnitude not inferred.

Evidence:

- `packages/trilium-core/src/services/task_context.ts:7-8`

```
// taskId => TaskContext
const taskContexts: Record<string, TaskContext<any>> = {};
```

- `packages/trilium-core/src/services/task_context.ts:41-47`

```
    static getInstance<T extends TaskType>(taskId: string, taskType: T, data: TaskData<T>): TaskContext<T> {
        if (!taskContexts[taskId]) {
            taskContexts[taskId] = new TaskContext(taskId, taskType, data);
        }

        return taskContexts[taskId];
    }
```

- `packages/trilium-core/src/services/task_context.ts:143-161`

```
    reportError(message: string) {
        ws.sendMessageToAllClients({
            type: "taskError",
            taskId: this.taskId,
            taskType: this.taskType,
            data: this.data,
            message
        } as WebSocketMessage);
    }

    taskSucceeded(result: TaskResult<T>) {
        getSql().afterCommit(() => ws.sendMessageToAllClients({
            type: "taskSucceeded",
            taskId: this.taskId,
            taskType: this.taskType,
            data: this.data,
            result
        } as WebSocketMessage));
    }
```

- `packages/trilium-core/src/routes/api/notes.ts:302-306`

```

    if (typeof taskId !== "string") {
        throw new ValidationError("Missing or incorrect type for task ID.");
    }
    const taskContext = TaskContext.getInstance(taskId, "deleteNotes", null);
```

Observed behavior:
- getInstance adds contexts to a module-root object; error and success methods do not remove them. A source reference census found no other removal path for that private object.

Expected boundary:
- Task state should have a defined ownership window and bounded retention after completion, including multi-request task groups.

Failure mechanism:
- A growing set of distinct IDs keeps data, counters and context objects rooted. Retention is directly evidenced; its RSS magnitude and any exhaustion threshold were not measured.

Break-it angle:
- Finish many ordinary tasks with distinct IDs, then inspect retained context count and reuse of a completed ID without relying on GC heuristics.

Impact:
- Unbounded object-count growth over long uptime; reuse can inherit an old context. This is not a reproduced OOM or an unauthenticated abuse claim.

Operational impact:
- Blast radius: Service; side-effect class: process; reversibility: reversible; operator visibility: silent; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Define explicit group completion and TTL/cap cleanup. Do not delete a context at the first per-branch response when the task spans several requests.
- Local guardrail: Assert completed groups are eventually evicted while active grouped tasks survive.

Implementation assessment:
- Complexity: local_guardrail; cost: S; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Assert completed groups are eventually evicted while active grouped tasks survive.
- Recommended, not run: Test success, error, abandonment and completed-ID reuse with a fake clock.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### WFG-TRI17-004: Tooltip effect cleanup leaves its native show listener attached

Severity: Low  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Workflow-GUI

Provenance: supplemental Codex source review.

Evidence:

- `apps/client/src/widgets/react/hooks.tsx:1352-1360`

```
        const tooltip = new Tooltip(element, config);
        element.addEventListener("show.bs.tooltip", () => {
            // Hide all the other tooltips.
            for (const otherTooltip of tooltips) {
                if (otherTooltip === tooltip) continue;
                otherTooltip.hide();
            }
        });
        tooltips.add(tooltip);
```

- `apps/client/src/widgets/react/hooks.tsx:1432-1440`

```
        return () => {
            disposeDelegateTracking();
            element.removeEventListener("click", dismissOnPress);
            tooltips.delete(tooltip);
            // Dispose even when the trigger element is already detached (e.g. a keyed remount
            // replaced it before this cleanup ran) — dispose() also removes a currently-shown
            // popup from the DOM, and with the trigger gone nothing else ever would (#10567).
            // The pending-callback crash of bootstrap#37474 is handled by the dispose() patch above.
            tooltip.dispose();
```

- `apps/client/src/widgets/react/hooks.tsx:1461-1462`

```
        };
    }, [ elRef, config ]);
```

Observed behavior:
- The effect adds an anonymous show.bs.tooltip listener to its element. Cleanup removes the click listener and tooltip-set entry but has no handle to remove that native show listener.

Expected boundary:
- Effect setup and teardown must remove the same listeners across configuration changes on a retained element.

Failure mechanism:
- Each config-driven rerun can leave a closure over an old tooltip on the same DOM node. Bootstrap disposal does not know about native handlers installed by this hook. Old listeners iterate the current tooltip set using the old identity.

Break-it angle:
- Rerender one element with different tooltip configurations repeatedly, dispatch a show event and count callbacks/hide calls, then unmount.

Impact:
- Listener/closure retention and possible interference with newly created tooltips. Visible flicker or hiding was not reproduced; the confirmed property is missing symmetric removal.

Operational impact:
- Blast radius: Workflow; side-effect class: process; reversibility: reversible; operator visibility: silent; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Name the show handler and remove it in cleanup before disposing the tooltip. Verify configuration changes as well as DOM removal.
- Local guardrail: After repeated config changes there must be exactly one active show listener on the element.

Implementation assessment:
- Complexity: local_guardrail; cost: XS; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: After repeated config changes there must be exactly one active show listener on the element.
- Recommended, not run: After cleanup, dispatching show must not invoke a retired tooltip callback.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### FSR-TRI17-001: Standalone worker failure does not settle restore waiters

Severity: Low  
Confidence: Likely  
Evidence basis: simulation-reasoned  
Domain: Failsafe

Provenance: supplemental Codex source review.

Evidence:

- `apps/standalone/src/local-bridge.ts:76-99`

```
export function restoreBackup(opts: {
    backup: File;
    passphrase?: string;
    onProgress?: (progress: StandaloneRestoreProgress) => void;
}): Promise<StandaloneRestoreResult> {
    if (!isLeader()) {
        return Promise.reject(new Error(
            "A backup can only be restored from the tab that owns the database. "
            + "Close the other Trilium tabs and try again."
        ));
    }

    const worker = startLocalServerWorker();
    const id = Math.random().toString(36).slice(2);

    return new Promise((resolve, reject) => {
        restores.set(id, { resolve, reject, onProgress: opts.onProgress });
        worker.postMessage({
            type: "RESTORE_BACKUP",
            id,
            backup: opts.backup,
            passphrase: opts.passphrase
        });
    });
```

- `apps/standalone/src/local-bridge.ts:475-487`

```
    // Handle worker errors during initialization
    localWorker.onerror = (event) => {
        console.error("[LocalBridge] Worker error:", event);
        showErrorOverlay(
            "Trilium couldn't start",
            event.message || "The database worker failed to start. See the console for details."
        );
        // Reject all pending requests
        for (const [, resolver] of pending) {
            resolver.reject(new Error(`Worker error: ${event.message}`));
        }
        pending.clear();
    };
```

- `apps/standalone/src/local-bridge.ts:505-515`

```
        if (msg?.type === "RESTORE_RESULT") {
            restores.get(msg.id)?.resolve(msg.result);
            restores.delete(msg.id);
            return;
        }

        // Handle fatal platform crashes (shown as an overlay to the user)
        if (msg?.type === "FATAL_ERROR") {
            console.error("[LocalBridge] Fatal error:", msg.message);
            showErrorOverlay("Trilium crashed", msg.message);
            return;
```

- `apps/standalone/src/local-bridge.ts:525-537`

```
        if (msg?.type === "WORKER_ERROR") {
            console.error("[LocalBridge] Worker reported error:", msg.error);
            showErrorOverlay(
                "Trilium couldn't start",
                msg.error?.message || "The database worker reported an error.",
                msg.error?.stack
            );
            // Reject all pending requests with the error
            for (const [, resolver] of pending) {
                resolver.reject(new Error(msg.error?.message || "Unknown worker error"));
            }
            pending.clear();
            return;
```

Observed behavior:
- Restore requests use a separate restores map. Worker error handling rejects pending API requests, but does not reject/clear restore waiters. FATAL_ERROR displays an overlay and returns; only RESTORE_RESULT settles a restore.

Expected boundary:
- A fatal worker transition should settle every in-flight operation it owns, even when the global UI already reports a crash.

Failure mechanism:
- The request families have divergent failure cleanup. A worker that stops before RESTORE_RESULT leaves the restore promise and associated callback rooted without a terminal result.

Break-it angle:
- Start a restore on a fake worker, then emit its error/fatal event instead of RESTORE_RESULT. Do not kill a real database worker for this check.

Impact:
- The caller may never receive its terminal restore outcome. Severity stays Low because the global overlay is visible; this is not evidence that restore data is corrupt or that every failure is silent.

Operational impact:
- Blast radius: Workflow; side-effect class: process; reversibility: reversible; operator visibility: UI-visible; rerun safety: unknown.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: explicit lifecycle protocol.
- Centralize worker-failure settlement across pending, restore, download and save families. Preserve the global error overlay and report that the operation outcome is uncertain where appropriate.
- Local guardrail: Use the fake worker to assert restore rejection and callback-map cleanup on every fatal event family.

Implementation assessment:
- Complexity: workflow_protocol; cost: S; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Use the fake worker to assert restore rejection and callback-map cleanup on every fatal event family.
- Recommended, not run: Verify a late response cannot settle a replacement operation or report old work as successful.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report. Safe-state target: fail_visible; observed classification: visible worker error with incomplete operation settlement. The synthetic event scenario was traced only.

Resilience mapping:
- Phase: recover; objectives: understand, reconstitute; target safe state: fail_visible.

Failure analysis (FMECA row):
- Failure mode: restore waiter outlives worker. Cause: divergent terminal cleanup. Phase: recovery. Local effect: pending promise. Workflow effect: terminal outcome absent. Operator effect: crash overlay exists, but operation state is unsettled. Detection: immediate worker error/overlay. Compensating provision: do not infer success; inspect recovery state before retry.

Criticality:
- Trigger likelihood: plausible. Detectability: obvious (global overlay). No numeric RPN or production likelihood was measured.

### WFG-TRIL-003: A successful stream with no content ends without an empty-result notice

Severity: Low  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Workflow-GUI

Provenance: recovered WFG-TRIL-003; deterministic finalizer behavior rechecked.

Evidence:

- `apps/client/src/services/llm_chat.ts:308-313`

```
        case "error":
            callbacks.onError(chunk.error, chunk.errorDetails);
            break;
        case "done":
            callbacks.onDone();
            break;
```

- `apps/client/src/widgets/type_widgets/llm_chat/useLlmChat.ts:713-728`

```
            if (contentBlocks.length > 0) {
                setMessages([...conversation, {
                    id: randomString(),
                    role: "assistant",
                    content: contentBlocks,
                    createdAt: new Date().toISOString(),
                    citations: citations.length > 0 ? citations : undefined,
                    usage
                }]);
            }

            setTargetBlocks([]);
            setPendingCitations([]);
            setStreamingStatus(null);
            setIsStreaming(false);
            abortControllerRef.current = null;
```

Observed behavior:
- A done chunk calls finalization; finalization appends an assistant message only if there are content blocks, then clears the streaming indicator.

Expected boundary:
- A completed request should yield a reply or a recognizable empty-result outcome.

Failure mechanism:
- The zero-block branch has no message or error result, so protocol completion and useful response are indistinguishable in the finalizer.

Break-it angle:
- Feed a done-only or usage-plus-done stream into the client callback path.

Impact:
- An unexplained empty turn; no claim is made about how frequently real providers produce it.

Operational impact:
- Blast radius: Workflow; side-effect class: user-visible; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Represent empty completion explicitly and offer an appropriate retry action without automatically replaying possibly side-effecting tool work.
- Local guardrail: Drive the stream consumer with no content plus done and assert a visible notice.

Implementation assessment:
- Complexity: local_guardrail; cost: XS; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Drive the stream consumer with no content plus done and assert a visible notice.
- Recommended, not run: Keep nonempty, tool-only, error and interrupted-turn behavior distinct.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### REL-TRI17-001: timeLimit leaves its deadline timer armed after early settlement

Severity: Low  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Reliability

Provenance: supplemental Codex source review.

Evidence:

- `packages/trilium-core/src/services/utils/index.ts:166-192`

```
export function timeLimit<T>(promise: Promise<T>, limitMs: number, errorMessage?: string): Promise<T> {
    // TriliumNextTODO: since TS avoids this from ever happening – do we need this check?
    if (!promise || !promise.then) {
        // it's not actually a promise
        return promise;
    }

    // better stack trace if created outside of promise
    const errorTimeLimit = new Error(errorMessage || `Process exceeded time limit ${limitMs}`);

    return new Promise((res, rej) => {
        let resolved = false;

        promise
            .then((result) => {
                resolved = true;

                res(result);
            })
            .catch((error) => rej(error));

        setTimeout(() => {
            if (!resolved) {
                rej(errorTimeLimit);
            }
        }, limitMs);
    });
```

Observed behavior:
- timeLimit creates a setTimeout but does not retain or clear its handle after either success or failure.

Expected boundary:
- A settled wrapper should release the timer and captured closure promptly.

Failure mechanism:
- Successful promises set a boolean but keep the timer until the full limit; rejected promises do not set that boolean either. A later reject is ignored by the already settled promise, but the scheduled work still exists.

Break-it angle:
- Complete or reject many wrapped promises immediately while using long limits; inspect pending timers with a fake clock.

Impact:
- Avoidable timer/closure retention and wakeups. No event-loop benchmark, RSS or process-exit delay was measured.

Operational impact:
- Blast radius: Workflow; side-effect class: process; reversibility: reversible; operator visibility: silent; rerun safety: safe.

Adjacent failure modes:
- REL-TRIL-003

Recommended mitigation:
- Remediation pattern: local boundary guard.
- Clear a retained timer on both settlement paths and keep timeout cancellation policy distinct from cancellation of the underlying operation.
- Local guardrail: Immediate success and failure must leave no deadline timer.

Implementation assessment:
- Complexity: local_guardrail; cost: XS; cost drivers: modules, tests; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Immediate success and failure must leave no deadline timer.
- Recommended, not run: A genuinely pending promise still times out once, with no double terminal notification.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### ARC-TRIL-007: Legacy print and PDF-export IPC handlers have no supported bridge caller

Severity: Low  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Architecture

Provenance: recovered ARC-TRIL-007; exact-channel production census rechecked.

Evidence:

- `apps/desktop/src/services/printing.ts:254-275`

```
/** Registers all printing-related IPC handlers. Call once on Electron startup. */
export function setupPrintingHandlers() {
    electron.ipcMain.on("print-note", async (e, { notePath }: PrintOpts) => {
        try {
            const { browserWindow, printReport } = await getBrowserWindowForPrinting(e, notePath, "printing");
            browserWindow.webContents.print({}, (success, failureReason) => {
                if (!success && failureReason !== "Print job canceled") {
                    electron.dialog.showErrorBox(t("pdf.unable-to-print"), failureReason);
                }
                e.sender.send("print-done", printReport);
                browserWindow.destroy();
            });
        } catch (err) {
            e.sender.send("print-done", {
                type: "error",
                message: err instanceof Error ? err.message : String(err),
                stack: err instanceof Error ? err.stack : undefined
            });
        }
    });

    electron.ipcMain.on("export-as-pdf", async (e, { title, notePath, landscape, pageSize, scale, margins, pageRanges }: ExportAsPdfOpts) => {
```

- `apps/desktop/src/preload.ts:185-215`

```
    printing: {
        sendPrintProgress(progress: number) {
            ipcRenderer.send("print-progress", progress);
        },
        onPrintProgress(callback: (data: { progress: number; action: string }) => void) {
            ipcRenderer.on("print-progress", (_event, data) => callback(data));
        },
        onPrintDone(callback: (printReport: unknown, liveJobId?: number) => void) {
            ipcRenderer.on("print-done", (_event, printReport, liveJobId) => callback(printReport, liveJobId));
        },
        removePrintListeners() {
            ipcRenderer.removeAllListeners("print-progress");
            ipcRenderer.removeAllListeners("print-done");
        },
        getPrinters(): Promise<unknown[]> {
            return ipcRenderer.invoke("get-printers");
        },
        exportAsPdfPreview(opts: Record<string, unknown>) {
            ipcRenderer.send("export-as-pdf-preview", opts);
        },
        onExportAsPdfPreviewResult(callback: (result: { buffer?: Uint8Array; error?: string; requestId?: number }) => void) {
            ipcRenderer.on("export-as-pdf-preview-result", (_event, result) => callback(result));
        },
        removeExportAsPdfPreviewResultListener() {
            ipcRenderer.removeAllListeners("export-as-pdf-preview-result");
        },
        savePdf(data: { title: string; buffer: Uint8Array }) {
            ipcRenderer.send("save-pdf", data);
        },
        printFromPreview(opts: Record<string, unknown>) {
            ipcRenderer.send("print-from-preview", opts);
```

Observed behavior:
- Main registers print-note and export-as-pdf. A production-source string census finds no send/invoke for those exact channels; preload exposes preview/from-preview operations instead. Tests still invoke the legacy handlers directly.

Expected boundary:
- A registered legacy operation should have a supported consumer or an explicit compatibility owner and sunset policy.

Failure mechanism:
- The old implementation remains reachable only as a registered internal handler, while the supported preload-facing path has moved. Direct handler tests establish behavior, not a current product caller.

Break-it angle:
- Trace each exact channel from its registration through the typed bridge and production renderer calls; distinguish export-as-pdf-preview from export-as-pdf.

Impact:
- Maintenance and test surface for apparently retired paths. This does not assert a security exploit or that printing/PDF export is broken.

Operational impact:
- Blast radius: Repo; side-effect class: none; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: evidence provenance.
- Confirm any external compatibility requirement with the owner, then remove the obsolete registration and matching tests together, or document and expose the supported caller.
- Local guardrail: Retain an end-to-end bridge contract test for preview and print-from-preview.

Implementation assessment:
- Complexity: governance_decision; cost: S; cost drivers: docs; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Retain an end-to-end bridge contract test for preview and print-from-preview.
- Recommended, not run: Before removal, prove no supported production caller uses the two exact legacy channel names.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### CMP-TRIL-001: Historical verification evidence points only to twelve missing temporary logs

Severity: Low  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Compliance-Posture

Provenance: recovered CMP-TRIL-001; twelve-path existence check repeated; stale-state and overclaim rhetoric removed.

Evidence:

- `grok-audit-security-14OCT2026.md:858-867`

```
| Check | Result | Evidence |
| --- | --- | --- |
| `pnpm --filter server test` with the 26 affected auth, setup, sync, custom, clipper, request, share and CSP spec files | 464 passed | `/tmp/trilium-server-final-green.log`; subsequent changed-path checks: `/tmp/trilium-first-run-final.log`, `/tmp/trilium-boundaries-complete.log` |
| `pnpm --filter standalone test` with 10 affected core/setup/sync/share and browser/native-bridge request-provider specs | 276 passed | `/tmp/trilium-standalone-final-green.log` |
| `pnpm --filter client test src/set_password.spec.tsx src/setup.spec.tsx src/setup_unlock.spec.tsx src/widgets/type_widgets/options/sync.spec.tsx` | 62 passed | `/tmp/trilium-client-final-green.log` |
| `pnpm --filter web-clipper test entrypoints/options/options.spec.tsx entrypoints/background/trilium_server_facade.spec.ts` | 28 passed | `/tmp/trilium-clipper-final.log` |
| `pnpm --filter desktop test src/services/request.spec.ts` | 4 passed | `/tmp/trilium-desktop-tests.log` |
| `pnpm --filter share-theme test src/templates/boot_script.spec.ts` | 4 passed | `/tmp/trilium-theme-final.log` |
| `pnpm typecheck` | No errors | `/tmp/trilium-typecheck-closed.log` |
| `node .claude/skills/writing-documentation/docs.mjs sync` and `check` | Generated help updated; 0 errors, 68 warnings | `/tmp/trilium-doc-sync-final.log`, `/tmp/trilium-doc-check-final.log` |
```

Observed behavior:
- The historical report lists twelve distinct /tmp verification-log paths. All twelve are absent at the time of this reconciliation. The report does contain explicit test-scope and self-review caveats.

Expected boundary:
- Durable verification claims should retain portable evidence or state that only the historical execution summary survives.

Failure mechanism:
- The verification table points at ephemeral paths without durable copies or run links in those rows. Missing logs make historical execution details unverifiable now; they do not prove that the checks never ran or that the patches are wrong.

Break-it angle:
- Resolve every cited log path from a new session and distinguish missing evidence from contradicted evidence.

Impact:
- A reader cannot independently reconstruct the historical test executions from the cited artifacts. No security finding or fix disposition is regraded in this audit.

Operational impact:
- Blast radius: Repo; side-effect class: none; reversibility: reversible; operator visibility: silent; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: evidence provenance.
- Retain sanitized logs or CI run identifiers with commit/command/config hashes, and mark unavailable historical logs as not retained. Add an addendum rather than rewriting history.
- Local guardrail: Validate evidence links when closing an audit and from a fresh checkout.

Implementation assessment:
- Complexity: governance_decision; cost: XS; cost drivers: docs; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Validate evidence links when closing an audit and from a fresh checkout.
- Recommended, not run: Ensure the grade distinguishes source verification, historical test summaries and retained execution evidence.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

### ARC-TRI17-002: Repository instructions name a different origin and checkout topology

Severity: Low  
Confidence: Confirmed  
Evidence basis: source-evidenced  
Domain: Architecture

Provenance: supplemental Codex source review.

Evidence:

- `CLAUDE.md:39-43`

```
### Opening a PR

`git push -u origin <branch>` then `gh pr create --base main --title … --body-file <file>`. There is no PR template in `.github/`, so the body is yours to shape.

- **`origin` is `TriliumNext/Trilium`** — the working directory is named `Notes` and ~19 contributor forks are configured as remotes, so neither the path nor the remote list names the target. `gh` resolves it from `remote.origin.gh-resolved`, already set, so `--repo` is redundant; `upstream` is the archived `zadam/trilium` and is never a base.
```

Observed behavior:
- The checked-in instructions say origin is TriliumNext/Trilium, the working directory is Notes and roughly nineteen contributor remotes exist. Read-only Git inspection shows this checkout is Trilium with only origin at cephalopod-ai/Trilium.

Expected boundary:
- Repository operation instructions should separate upstream examples from observed fork-specific destinations.

Failure mechanism:
- A hardcoded environment assertion is phrased as current operational truth. It can misdirect target selection in an agent or human workflow that fails to re-read Git state.

Break-it angle:
- Compare the instruction paragraph to git remote -v and git rev-parse --show-toplevel in this checkout.

Impact:
- Misleading operational guidance for this fork. No wrong-target push was observed; the earlier integration used the actual remote correctly.

Operational impact:
- Blast radius: Repo; side-effect class: none; reversibility: reversible; operator visibility: UI-visible; rerun safety: safe.

Adjacent failure modes:
- See the cross-lens escalation and scenario tables; no additional unverified mechanism is counted.

Recommended mitigation:
- Remediation pattern: evidence provenance.
- State the upstream relationship separately and require destination discovery from the active checkout. Preserve the concrete project workflow without machine-specific claims.
- Local guardrail: Check instruction examples against the current remote topology.

Implementation assessment:
- Complexity: governance_decision; cost: XS; cost drivers: docs; nominal implementation agent: other-agent.
- Requires source editing and the listed focused checks; assignment is capability-based. Runtime-sensitive changes also need the named platform verification.

Validation:
- Recommended, not run: Check instruction examples against the current remote topology.
- Recommended, not run: For a fork or second worktree, verify publishing instructions discover the intended destination instead of assuming the upstream name.

Non-goals:
- Do not expand this slice into an unrelated subsystem rewrite.

Verification limit:
- Static review only. No target tests, application launches, device or outage drills were run for this report.

## 7. Recovered-candidate adjudication

All original IDs remain traceable. Rejected or excluded entries are not counted in the accepted severity totals. Original lane text is historical input and must not override the current decisions.

| Original ID | Disposition | Reason / counterevidence |
| --- | --- | --- |
| REL-TRIL-001 | operational limitation | The constant endpoint proves liveness only. No cited contract requires DB readiness; do not call ordinary liveness a confirmed readiness lie. A separate readiness signal is a bounded opportunity. |
| REL-TRIL-002 | excluded security issue | The recovered main claim is unauthenticated resource-exhaustion exposure; security audits were expressly excluded. Keep a follow-up pointer, not an in-scope High finding. |
| REL-TRIL-003 | retained, downgraded | Missing transport cancellation retained as Likely; no socket/FD exhaustion observed. |
| REL-TRIL-004 | rejected | backupNow enters the same async mutex used by every backup; the claim that it excludes sync but not another backup is false. |
| REL-TRIL-005 | rejected | Scheduled names are fixed daily/weekly/monthly slots, not timestamped daily files. |
| REL-TRIL-006 | retained, narrowed | File stream lacks a local recovery policy; console fallback and possible later rotation contradict complete permanent diagnostic silence. |
| REL-TRIL-007 | retained | Task registry insertion without eviction is source-evidenced; no memory magnitude inferred. |
| REL-TRIL-008 | not confirmed | Readiness is marked before listening, but listen errors crash and awaited startup failures reach the fatal top-level catch. No concrete swallowed startup failure was established. |
| WFG-TRIL-001 | retained | Void batch result and unconditional toast discard item failures. |
| WFG-TRIL-002 | retained, downgraded | Actual copy says AI features, not an explicit provider-network kill switch. Predicate divergence is confirmed; whether it violates product intent remains Likely and needs a policy decision. |
| WFG-TRIL-003 | retained, confidence clarified | Confirmed for the deterministic done-only client branch; actual provider prevalence remains unknown. |
| DES-TRIL-001 | retained, downgraded | Medium/Likely; a directive exists, but universal browser/WebView zoom effects were not observed. |
| DES-TRIL-002 | retained | The current component and exact Bootstrap version establish the accessible-name gap. Call-site population is not a runtime accessibility census. |
| DES-TRIL-003 | retained | Generic click controls lack native role/focus behavior; alternate shortcuts qualify the impact. |
| DES-TRIL-004 | design opportunity | The explicit confirmation/scope flow exists. A missing red danger variant alone does not establish a Medium functional defect; optional irreversible erase and default focus deserve UX review. |
| DES-TRIL-005 | retained, narrowed | The general mount has no shared fallback; user-script rendering does have an error boundary. |
| CMP-TRIL-001 | retained, downgraded | Low evidence-retention gap only. Historical baseline/uncommitted statements are not automatically current falsehoods. |
| CMP-TRIL-002 | rejected | Targeted regression verified does not imply independent/full-suite verification when the same report explicitly discloses scope and self-review. |
| CMP-TRIL-003 | not confirmed | The skill and shared documents have independently versioned contracts; a mixed version range alone does not prove inconsistent grading. This report pins file hashes instead. |
| CMP-TRIL-004 | not confirmed | The referenced external remediation ledger exists and was found; absence from the repo is not evidence that it is lost or fabricated. Portability is addressed by a retained-artifact pointer. |
| NEG-TRIL-001 | excluded security issue | Executable-note capability/authority allegation belongs to the excluded security boundary; not re-audited or accepted as current. |
| NEG-TRIL-002 | excluded security issue | Anonymous publication/authority allegation belongs to the excluded security boundary; not re-audited or accepted as current. |
| NEG-TRIL-003 | excluded data issue | Tree-cycle integrity hypothesis belongs to the excluded data-audit scope; recovered confidence was only Plausible. |
| NEG-TRIL-004 | excluded security issue | Integration-token authorization/expiry design belongs to security; no incidental regrading. |
| NEG-TRIL-005 | excluded security issue | Process-global MCP policy/authority question belongs to security; no incidental regrading. |
| ARC-TRIL-001 | not confirmed defective | share-theme/client imports are real, but the recovered report does not establish a violated build contract or a concrete failure; monorepo app reuse is not inherently invalid. |
| ARC-TRIL-002 | rejected as unsanctioned boundary | Architecture explicitly declares desktop depends on server/client assets. Deep imports alone are not proof this declared embedding architecture is broken. |
| ARC-TRIL-003 | observation | BNote/FNote folder predicates differ on subtreeHidden; a harmful shared-contract violation was not traced. UI presentation vs backend/share semantics must be distinguished before unifying. |
| ARC-TRIL-004 | rejected mechanism | The surrounding synchronous HTTP wrapper owns the transaction. Layer placement may merit refactoring but does not establish the claimed partial commit. |
| ARC-TRIL-005 | excluded data mechanism | Options/cache repair and sync-cursor consequences cross into excluded data correctness; retain as a handoff, not a fresh accepted finding. |
| ARC-TRIL-006 | not confirmed defective | Literal IPC channels are duplicated, but a particular live sender/receiver shape mismatch was not shown. Dead legacy handlers are tracked separately. |
| ARC-TRIL-007 | retained, narrowed | Exact obsolete channels have no supported production sender in the source census. Security attack-surface rhetoric removed. |
| ARC-TRIL-008 | not confirmed defective | An SDK-derived stream type exists at the provider-adapter boundary. No concrete portability failure or malformed consumer output was established. |
| ARC-TRIL-009 | rejected impact claim | The PDF storage patch is documented and scoped to the embedded PDF-viewer realm and keys; it is not evidence of application-wide localStorage breakage. |

### Out-of-scope handoffs

The recovered NEG executable-note, public-share, integration-token and unscoped-MCP allegations, plus the REL pre-auth-body-size allegation, should go to a separately scoped security review if wanted. The tree-cycle and options/cache/sync-cursor candidates belong to a data review. Their historical titles are recovery pointers, not verified present defects. No security or data severity is imported into this audit.

## 8. Checked boundaries and non-findings

These are source-held samples, not passing-test or end-to-end certifications. Every row includes the controlling line(s).

### Backup mutual exclusion

Both backupNow and backupAs enter the same process-wide mutex; a mutex excludes every acquire, not just callers named sync. The recovered overlap-corruption allegation is rejected.

- `apps/server/src/backup_provider.ts:92-114`

```
        // we don't want to back up DB in the middle of sync with potentially inconsistent DB state
        return await syncMutexService.doExclusively(async () => {
            const format = await this.resolveFormat();
            const customDir = format.keepLocal ? null : this.getCustomBackupDir();

            if (customDir) {
                try {
                    return await writeBackup(customDir, baseName, format, "custom");
                } catch (e) {
                    // A backup that cannot reach the chosen location is still worth having, so the
                    // default one takes over instead of the backup being lost altogether. The reason
                    // reaches the log; where it was headed reaches only the user, in the toast.
                    getLog().error(`Could not back up to the custom backup location, using the default one instead: ${e}`);
                    ws.sendMessageToAllClients({
                        type: "toast",
                        message: t("backup.custom_directory_unwritable", { location: customDir }),
                        timeout: 15000
                    });
                }
            }

            return await writeBackup(getDefaultBackupDir(), baseName, format, "default");
        });
```

- `packages/trilium-core/src/services/sync_mutex.ts:11-18`

```
async function doExclusively<T>(func: () => T) {
    const releaseMutex = await instance.acquire();

    try {
        return await func();
    } finally {
        releaseMutex();
    }
```

### Scheduled backup retention shape

Daily, weekly and monthly use fixed backup names; the alleged daily timestamped-file accumulation does not occur on this path. This says nothing about user-named manual backups.

- `packages/trilium-core/src/services/backup.ts:122-125`

```
    protected async runScheduledBackups(): Promise<void> {
        await this.periodBackup("lastDailyBackupDate", "daily", 24 * 3600);
        await this.periodBackup("lastWeeklyBackupDate", "weekly", 7 * 24 * 3600);
        await this.periodBackup("lastMonthlyBackupDate", "monthly", 30 * 24 * 3600);
```

- `packages/trilium-core/src/services/backup.ts:152-157`

```
        const now = new Date();
        const lastBackupDate = dateUtils.parseDateTime(this.options.getOption(optionName));

        if (now.getTime() - lastBackupDate.getTime() > periodInSeconds * 1000) {
            await this.backupNow(backupType);
            this.options.setOption(optionName, dateUtils.utcNowDateTime());
```

- `apps/server/src/backup_provider.ts:82-90`

```
    override async backupNow(name: string): Promise<string> {
        // Sanitize backup name to prevent path traversal (CWE-22).
        // Only allow alphanumeric characters, hyphens, and underscores.
        const sanitizedName = name.replace(/[^a-zA-Z0-9_-]/g, "");
        if (!sanitizedName) {
            throw new Error("Invalid backup name: must contain at least one alphanumeric character, hyphen, or underscore.");
        }

        const baseName = `backup-${sanitizedName}`;
```

### Backup publication

The container path renames after writing and removes snapshot/part files in finally. Crash durability/fsync and actual restore correctness were not drilled.

- `apps/server/src/backup_provider.ts:429-443`

```
    try {
        await sql.copyDatabase(snapshot);

        await writeBackupContainer(fs.createReadStream(snapshot), fs.createWriteStream(partial), {
            compress: format.compress,
            passphrase: format.passphrase ?? undefined,
            plaintextSize: fs.statSync(snapshot).size,
            onProgress
        });

        // Renamed last, so a half-written container is never mistaken for a finished one.
        fs.renameSync(partial, backupFile);
    } finally {
        fs.rmSync(snapshot, { force: true });
        fs.rmSync(partial, { force: true });
```

### Branch route transaction owner

The synchronous HTTP wrapper supplies the SQL transaction; inline route code alone does not prove non-atomicity. Standalone transaction equivalence is not certified by this one trace.

- `apps/server/src/routes/route_api.ts:77-82`

```
export function route<P extends ParamsDictionary>(method: HttpMethod, path: string, middleware: express.Handler[], routeHandler: SyncRouteRequestHandler<P>, resultHandler: ApiResultHandler | null = null) {
    internalRoute(method, path, middleware, routeHandler, resultHandler, true);
}

export function asyncRoute<P extends ParamsDictionary>(method: HttpMethod, path: string, middleware: express.Handler[], routeHandler: ApiRequestHandler<P>, resultHandler: ApiResultHandler | null = null) {
    internalRoute(method, path, middleware, routeHandler, resultHandler, false);
```

- `apps/server/src/routes/route_api.ts:93-100`

```
            const result = cls.init(() => {
                cls.set("componentId", req.headers["trilium-component-id"]);
                cls.set("localNowDateTime", req.headers["trilium-local-now-datetime"]);
                cls.set("hoistedNoteId", req.headers["trilium-hoisted-note-id"] || "root");

                const cb = () => routeHandler(req, res, next);

                return transactional ? sql.transactional(cb) : cb();
```

### Fatal server boot handling

startApplication awaits initialization/startup and catches failures with process.exit(1). Listen errors also call platform.crash. The recovered speculative pre-listening escape example is not established.

- `apps/server/src/main.ts:12-25`

```
async function startApplication() {
    await initializeServerCore();

    const startTriliumServer = (await import("./www.js")).default;
    await startTriliumServer();

    if (!sql_init.isDbInitialized()) {
        getLog().banner(t("sql_init.db_not_initialized_server", { port }));
    }
}

startApplication().catch((err) => {
    console.error("Fatal error during Trilium server startup:", err);
    process.exit(1);
```

- `apps/server/src/www.ts:181-204`

```
    httpServer.on("error", (error) => {
        let message = error.stack || "An unexpected error has occurred.";

        // handle specific listen errors with friendly messages
        if ("code" in error) {
            switch (error.code) {
                case "EACCES":
                    message = `Port ${port} requires elevated privileges. It's recommended to use port above 1024.`;
                    break;
                case "EADDRINUSE":
                    message = `Port ${port} is already in use. Most likely, another Trilium process is already running. You might try to find it, kill it, and try again.`;
                    break;
                case "EADDRNOTAVAIL":
                    message = `Unable to start the server on host '${host}'. Make sure the host (defined in 'config.ini' or via the 'TRILIUM_HOST' environment variable) is an IP address that can be listened on.`;
                    break;
            }
        }

        const platform = getPlatform();
        if (platform.shouldIgnoreStartupError?.(error)) {
            console.error(message);
        } else {
            platform.crash(`Error while initializing the server: ${message}`);
        }
```

### Portable host-provider absence

An unregistered host provider produces an explicit named build-unavailable error. It does not silently fall back to a different provider.

- `packages/trilium-core/src/services/llm/host_providers.ts:74-80`

```
export async function createHostProvider(type: HostProvidedType): Promise<LlmProvider> {
    const factory = hostProviderFactories.get(type);
    if (!factory) {
        throw new Error(`The ${HOST_PROVIDED_TYPES[type]} provider is not available in this build.`);
    }
    return await factory();
}
```

### ACP request/pool cleanup

Requests clear deadline timers when resolved/rejected; pool release arms an idle reaper. This held sample does not cover every child-process shutdown race.

- `apps/server/src/services/llm/providers/acp_client.ts:178-205`

```
    async request<T = unknown>(method: string, params: unknown, timeoutMs = 120_000): Promise<T> {
        if (this.exitError) {
            throw this.exitError;
        }
        const id = this.nextId++;
        const response = await new Promise<JsonRpcMessage>((resolve, reject) => {
            const timer = setTimeout(() => {
                this.pending.delete(id);
                reject(new Error(`ACP request "${method}" timed out after ${Math.round(timeoutMs / 1000)} s.`));
            }, timeoutMs);
            this.pending.set(id, {
                resolve: msg => {
                    clearTimeout(timer);
                    resolve(msg);
                },
                reject: err => {
                    clearTimeout(timer);
                    reject(err);
                }
            });
            try {
                this.send({ jsonrpc: "2.0", id, method, params });
            } catch (err) {
                // A synchronous write failure would otherwise leave the timer
                // armed and the id stranded in `pending` until it elapses.
                clearTimeout(timer);
                this.pending.delete(id);
                reject(err instanceof Error ? err : new Error(String(err)));
```

- `apps/server/src/services/llm/providers/acp_client_pool.ts:95-100`

```
    /** Return a lease. The client is reaped once no turn has used it for {@link IDLE_TIMEOUT_MS}. */
    release(): void {
        this.activeTurns = Math.max(0, this.activeTurns - 1);
        if (this.activeTurns === 0 && this.pooled) {
            this.armIdleTimer();
        }
```

- `apps/server/src/services/llm/providers/acp_client_pool.ts:175-185`

```
    private armIdleTimer(): void {
        this.cancelIdleTimer();
        this.idleTimer = setTimeout(() => {
            this.idleTimer = undefined;
            if (this.activeTurns === 0 && this.pooled) {
                getLog().info(`${this.logLabel}: reaping the idle agent process after ${Math.round(IDLE_TIMEOUT_MS / 1000)} s.`);
                this.dispose();
            }
        }, IDLE_TIMEOUT_MS);
        // An idle reap does not keep the server running.
        this.idleTimer.unref?.();
```

### Claude warm-session lifetime

The pool has an idle timeout and closes old idle sessions when over its warm-session target. Busy sessions are intentionally not evicted, so this is not proof of an admission cap on active chats.

- `apps/server/src/services/llm/providers/claude_session_pool.ts:143-159`

```
/** Hand a session back after a turn; it is reaped once idle for long enough. */
export function releaseSession(chatNoteId: string, session: ClaudeSession): void {
    session.busy = false;
    if (session.closed) {
        sessionsByChatNote.delete(chatNoteId);
        return;
    }
    cancelIdleTimer(session);
    session.idleTimer = setTimeout(() => {
        session.idleTimer = undefined;
        if (!session.busy) {
            getLog().info(`Claude Agent provider: reaping the idle agent process for chat ${chatNoteId}.`);
            closeSession(chatNoteId, session);
        }
    }, IDLE_TIMEOUT_MS);
    // Don't hold the event loop open just to reap an idle subprocess.
    session.idleTimer.unref?.();
```

- `apps/server/src/services/llm/providers/claude_session_pool.ts:180-189`

```
/** Close the least recently used idle sessions until the pool is within {@link MAX_WARM_SESSIONS}. */
function evictOldest(): void {
    for (const [chatNoteId, session] of [...sessionsByChatNote.entries()]) {
        if (sessionsByChatNote.size <= MAX_WARM_SESSIONS) {
            break;
        }
        // A busy session is streaming a reply, so it is skipped rather than closed.
        if (!session.busy) {
            closeSession(chatNoteId, session);
        }
```

### Native session completion truth

The native provider persists a pending mapping before prompting and requires end_turn before clearing it and emitting done. Interrupted output is not automatically reclassified as complete.

- `apps/server/src/services/llm/providers/native_acp.ts:239-272`

```
                this.mappings.set(chat, record);
                try {
                    this.saveMappings();
                } catch {
                    if (stored) this.mappings.set(chat, stored); else this.mappings.delete(chat);
                    throw new Error("Cannot save the host-local native session mapping. No prompt was sent; the previous session is preserved.");
                }
                this.scopes.set(chat, scope);
                this.liveCatalog.set(chat, descriptor);
                let finished = false;
                let failure: unknown;
                let result: { stopReason?: string; usage?: { inputTokens?: number; outputTokens?: number; totalTokens?: number } } | undefined;
                let text = "";
                prompted = true;
                turn.prompted = true;
                if (stagedScope !== previousScope) previousScope?.revoke();
                if (stored && stored.sessionId !== sessionId) {
                    this.runtimes.get(parseNativeModelId(stored.selection)[0])?.sessions.delete(stored.sessionId);
                }
                void client.request<typeof result>("session/prompt", { sessionId, prompt: buildPromptBlocks(last.content, prefix) }, 20 * 60_000)
                    .then(value => { result = value; }).catch(error => { failure = error; }).finally(() => { finished = true; wake?.(); });
                while ((!finished || queue.length) && !controller.signal.aborted) {
                    if (!queue.length) await new Promise<void>(resolve => { wake = resolve; });
                    wake = undefined;
                    for (const chunk of queue.splice(0)) { if (chunk.type === "text") text += chunk.content; yield chunk; }
                }
                if (controller.signal.aborted) throw new Error("Native agent turn interrupted. Partial output is incomplete; use an explicit new-session handoff to continue.");
                if (failure) throw failure;
                if (result?.stopReason !== "end_turn") throw new Error(`Native agent did not complete this turn (${result?.stopReason ?? "missing completion"}). Use an explicit handoff before retrying.`);
                record.historyHash = hashTranscript([...messages, { role: "assistant", content: text }]);
                record.pending = false;
                try { this.saveMappings(); } catch (error) { record.pending = true; throw error; }
                if (result.usage) yield { type: "usage", usage: { model: modelId, provider: runtime.profile.name, promptTokens: result.usage.inputTokens, completionTokens: result.usage.outputTokens, totalTokens: result.usage.totalTokens } };
                yield { type: "done" };
```

### Native cancellation cleanup

The finally path detaches/releases the lease and removes turn and abort listeners; incomplete scoped mappings are revoked.

- `apps/server/src/services/llm/providers/native_acp.ts:273-289`

```
            } finally { controller.signal.removeEventListener("abort", cancel); }
        } catch (error) {
            throw new Error(this.failure(runtime.profile, error));
        } finally {
            if (sessionId) runtime.pool.detach(sessionId);
            if (lease) runtime.pool.release();
            this.turns.delete(chat);
            controller.abort();
            signal?.removeEventListener("abort", abort);
            if (!prompted && sessionId) {
                runtime.sessions.delete(sessionId);
                if (stagedScope && stagedScope !== this.scopes.get(chat)) stagedScope.revoke();
            }
            if (prompted && this.mappings.get(chat)?.pending) {
                stagedScope?.revoke();
                this.scopes.delete(chat);
            }
```

### Dynamic model discovery

Listing uses a bounded fetch and a TTL/in-flight cache; failures are differentiated from unsupported listing. No live model-retirement or pricing-freshness claim is made.

- `packages/trilium-core/src/services/llm/providers/base_provider.ts:258-287`

```
    protected async fetchJson(url: string, headers: Record<string, string>): Promise<unknown> {
        const response = await llmFetch(url, { headers, signal: AbortSignal.timeout(MODEL_LIST_TIMEOUT_MS) });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error(`Authentication failed (HTTP ${response.status}) — check the API key${this.baseURL ? " and base URL" : ""}.`);
            }
            throw new Error(`HTTP ${response.status} from ${url}`);
        }
        return await response.json();
    }

    /**
     * Dynamic model listing: the live endpoint list merged with curated
     * metadata, cached for {@link MODEL_LIST_TTL_MS}. Returns the curated list
     * when the provider doesn't support dynamic listing, but a listing *failure*
     * (bad API key, unreachable endpoint) propagates — the sole caller is the
     * add/edit-provider screen, which must surface a bad credential instead of
     * masking it as success by quietly showing the curated defaults.
     */
    async listModels(): Promise<ModelInfo[]> {
        const now = Date.now();
        if (this.modelListCache && now - this.modelListCache.fetchedAt < MODEL_LIST_TTL_MS) {
            return this.modelListCache.models;
        }
        if (!this.modelListInFlight) {
            this.modelListInFlight = this.fetchAndMergeModels().finally(() => {
                this.modelListInFlight = undefined;
            });
        }
        return this.modelListInFlight;
```

### MCP result semantics and transport teardown

Tool error results set isError, and response close closes transport/server. Schema/protocol conformance beyond this sample remains unexercised.

- `apps/server/src/services/mcp/mcp_server.ts:33-40`

```
            return def.mutates
                ? sql.transactional(() => def.execute(args))
                : def.execute(args);
        });

        const content: CallToolResult["content"] = [{ type: "text", text: JSON.stringify(result) }];
        // Without `isError`, an agent (and the chat behind it) takes a failure for a success.
        return isToolErrorResult(result) ? { content, isError: true } : { content };
```

- `apps/server/src/routes/mcp.ts:143-149`

```
        res.on("close", () => {
            void transport.close();
            void server.close();
        });

        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
```

### Standalone ownership

The browser uses an exclusive Web Lock for its database-owning tab and rejects follower restore requests. The no-Web-Locks fallback is a retained platform assumption.

- `apps/standalone/src/leader_election.ts:29-45`

```
export function claimLeadership(onElected: () => void): void {
    // Web Locks is missing in some embedded WebViews. Those are single-window
    // Capacitor apps, so this tab is trivially the only possible owner.
    if (!navigator.locks?.request) {
        console.info("[Leader] Web Locks unavailable — assuming sole tab");
        promote(onElected);
        return;
    }

    void navigator.locks.request(DB_LOCK_NAME, { mode: "exclusive" }, () => {
        promote(onElected);

        // Never resolves: holding the lock for the lifetime of the tab is what
        // keeps other tabs from opening a second worker. The browser releases it
        // when the tab goes away.
        return new Promise<never>(() => {});
    });
```

- `apps/standalone/src/local-bridge.ts:76-85`

```
export function restoreBackup(opts: {
    backup: File;
    passphrase?: string;
    onProgress?: (progress: StandaloneRestoreProgress) => void;
}): Promise<StandaloneRestoreResult> {
    if (!isLeader()) {
        return Promise.reject(new Error(
            "A backup can only be restored from the tab that owns the database. "
            + "Close the other Trilium tabs and try again."
        ));
```

### Widget unmount cleanup

The ordinary dispose helper explicitly unmounts the Preact root. That is distinct from handling a render exception.

- `apps/client/src/widgets/react/react_utils.tsx:95-102`

```
/**
 * Unmounts the tree rendered into `container`, running every effect cleanup and releasing the DOM
 * the vnodes still point at. `container` has to be the element the tree was rendered *into* -- for a
 * widget built by `renderReactWidget()` that is the fragment, not the `$widget` it returned.
 */
export function disposeReactWidget(container: Element | DocumentFragment) {
    render(null, container);
}
```

### Source validation policy

CLAUDE.md calls for scoped tests and one typecheck, with full suites left to CI; the server uses fork isolation and has an explicit worker limit. No unsupported recommendation to serialize all tests or remove cross-runtime core runs is made.

- `CLAUDE.md:23-25`

```
- **Never run ESLint** (`dev:linter-check`, `dev:linter-fix`, `npx eslint`) — it dies with an out-of-memory error, so a run tells you nothing. CI does not lint either — there is no `eslint`/`linter-check` step anywhere in `.github/workflows/`, so lint findings never block a merge; the gates are `pnpm typecheck` and the per-package `test --coverage` runs. (`packages/*` is ignored by the ESLint config anyway.)
- **Never run `pnpm test:all`, `test:parallel`, `test:sequential`, or a whole-package `coverage`** during development — CI runs them on every push. Run the **narrowest** suite that covers what you touched: `pnpm --filter <pkg> test <pattern>` (Vitest treats the trailing argument as a substring filter over spec paths). Core specs need **two** runs, server and standalone (see Testing). Only reach for a full suite if the user asks or wants a final check.
- **Typecheck with `pnpm typecheck`, not a raw `tsc`** — it resolves the project references a hand-written `tsc -p …` gets wrong, and is far cheaper than a test suite. Still, run it **once, after a piece of work is finished** — not after every edit: it builds the project references, and repeating it is a common way to lose minutes across a session. Two ways its output misleads: the incremental build does not recheck the files that use an ambient `.d.ts` (`types-lib.d.ts`) after it changes — delete `apps/client/dist/*.tsbuildinfo` (gitignored) before trusting the result; and a dependent project (`tsconfig.spec.json`, `apps/build-docs`) is checked only once the app project compiles, so its errors appear only after the app's are fixed, and some vanish with them.
```

- `apps/server/vite.config.mts:78-79`

```
    pool: "forks",
    maxWorkers: 6
```

## 9. Break-it review and failsafe scenario records

All scenarios below are **static traces**, not executed drills. The expected safe-state names describe repair targets; they are not claims about certified resilience.

| Workflow / scenario | Target safe state | Static result | Finding / guardrail |
| --- | --- | --- | --- |
| Mixed batch: one item fails, another succeeds | fail_visible | Failure is caught; void route result leads to generic toast | WFG-TRIL-001; retain item outcomes rather than abandon isolation. |
| AI toggled off with an existing chat | fail_closed or explicitly documented hide-only mode | Settings and execution predicates disagree | WFG-TRIL-002; product decision + shared execution gate. |
| Peer accepts HTTP request and stalls | fail_visible | Wrapper may expire without transport cancellation; seed uses only transport option | REL-TRIL-003; fake-peer closure/deadline test required. |
| File logger becomes unwritable | fail_degraded | Console remains; file stream has no local recovery state | REL-TRIL-006; bound reopen/backoff and keep console independent. |
| Backup tick arrives during a backup | fail_idempotent / serialized work | Shared mutex prevents simultaneous writer; redundant queued work not corruption | Recovered REL-004 rejected; do not remove mutual exclusion. |
| Repeated scheduled backup days | bounded retained slots | Fixed daily/weekly/monthly names refute accumulation theory | Recovered REL-005 rejected; manual user-named backups separate. |
| Native prompt errors or ends without end_turn | fail_visible / fail_manual_hold | Pending mapping retained; explicit handoff required; cleanup path releases | Held source sample; fake-agent replay still needed. |
| Configuration changes during provider factory await | fail_visible / current-generation publication | Old construction can repopulate current cache | ARC-TRI17-001; defer factory test both completion orders. |
| Worker stops before restore result | fail_visible | Error overlay shown, restore waiter not settled by generic failure cleanup | FSR-TRI17-001; settle every callback family. |
| Stream ends with done but no blocks | fail_visible | Spinner clears, no empty-result notice | WFG-TRIL-003; synthetic done-only callback test. |
| Tooltip configuration changes on retained element | bounded lifecycle | Anonymous native show handlers lack symmetric removal | WFG-TRI17-004; listener-count/old-instance test. |
| Production standalone reopens offline | fail_degraded | Intended SW cache paths are unreachable; HTTP cache may still help | WFG-TRI17-005; production/offline/update matrix required. |
| New keyboard/AT user encounters toolbar/tab controls | fail_visible / accessible action | Missing name/native semantics are source-visible | DES-TRIL-002/003; computed-name and keyboard outcome checks. |

### Dependency criticality register

| Dependency | Consumer / absence behavior | Alternate / classification | Signal and residual verification |
| --- | --- | --- | --- |
| SQLite/OPFS owner worker | Standalone operations depend on one elected owner | Intentional single writer; no second writer should be started as fallback | Ownership/source refusal holds; worker-loss callback gap remains; no real recovery drill. |
| Selected LLM/CLI provider | A chat must use the selected provider/model | Explicit unsupported-build and no-fallback errors hold in sample; a different provider is not a transparent substitute | Fake/live provider failure and authenticated catalog checks not run. |
| Remote sync/setup peer | Node HTTP call | Peer failure should not hold unbounded local work | Deadline cancellation gap; no outage/FD measurement. Data-sync semantics excluded. |
| File log directory | File diagnostics | Console fallback exists; no durable file recovery policy in stream owner | Local diagnostic degradation, not loss of all observability. |
| Browser service worker/static assets | Browser standalone shell and request routing | API worker bridge is local; static shell still needs a caching/deployment strategy | Cache bypass source confirmed; offline/device outcomes unverified. |
| Installed native binaries | Host-provider adapters | Named build-unavailable/discovery paths; provider choice preserved | Installed CLI versions, flags and permissions not probed. |

A single database or configured provider is an intentional dependency, not automatically an unjustified single point of failure. No HA, multi-process writable document, production quota or failover requirement was supplied.

### Readiness and design gates

| Gate | Supported verdict | Missing proof |
| --- | --- | --- |
| Product/workflow | Source gaps in partial batch/AI/empty result feedback | Real tasks and user interpretation not observed. |
| Frontend handoff | Shared component/token architecture exists in recovered sample | No complete design-token/visual state audit. |
| Web semantics | Tab/PDF control gaps source-confirmed | Real focus/activation and alternate paths not exercised. |
| Accessibility | Action naming defect source-confirmed; zoom restriction directive present | Screen readers, computed accessibility trees and device enlargement not run. No WCAG conformance claim. |
| Device/browser resilience | Browser/worker architecture inventoried; cache bypass found | Mobile browser/WebView, offline reopen, update and interruption matrix not run. |
| Production readiness | Scoped test/CI policy and visible failure channels exist; lifecycle gaps remain | No builds, clean-process entrypoint run, load/soak, crash or production drill. |

## 10. Patch order and regression strategy

1. **Shared controls and user truth:** name ActionButton correctly; return batch outcomes; define/enforce AI-disable semantics. Tests must assert names/outcomes/provider calls, not component snapshots or source strings.
2. **I/O and startup shell:** connect Node deadlines to transport teardown; add logger error/recovery ownership; decide and verify production SW caching/update semantics. Use fake peers/streams and a production artifact, not a live production outage.
3. **Stateful async seams:** generation-safe provider-cache publication, keyboard-native controls, scoped crash fallback and worker terminal settlement. Use deterministic deferred factories, fake worker events and test-only render failures.
4. **Lifetime bounds and small UX:** evict task groups safely, remove tooltip listeners, clear timeLimit timers and explain empty completions. Fake clocks/listener identity are appropriate; avoid arbitrary sleeps.
5. **Cleanup/provenance:** owner-approve retirement of obsolete print handlers; correct fork-specific instructions; retain verification artifacts. Keep security/data follow-ups separately scoped.

Suggested regression targets already present in the tree: `ActionButton.spec.tsx`, `hooks.spec.tsx`, `local-bridge.spec.ts`, provider/index and ACP pool specs, server request/log/backup specs, and client LLM stream specs. Select the narrow files after the actual patch. Shared-core changes require both server and standalone host checks under repository guidance. None of these recommended executions was performed for this report.

### Test-oracle integrity

The server test setup loads an in-memory fixture and installs no-op transaction commit/rollback callbacks; the standalone test host also supplies no-op callbacks. Production server rollback reloads cache/cursor state. This is a verification limitation, not proof that every existing test is invalid: tests may intentionally isolate the SQL wrapper and explicit recovery helpers. Do not use the historical green targeted runs alone to clear production rollback, crash recovery or end-to-end import/restore claims.

No fresh-process documented entrypoint was run for this report. No target runtime was executed. Therefore no source-held boundary is promoted to `test-reproduced`, and no historical test count is presented as a new pass. Any later patch claiming end-to-end correctness should check its fixture state and prefer the documented user entrypoint in a fresh disposable environment.

## 11. Skill escalation and bounded handoff

| Finding group | Primary owner | Secondary lens / needed proof |
| --- | --- | --- |
| DES naming/semantics/zoom | design-webapp / workflow-gui | Accessible-name computation, keyboard outcomes and device/browser/AT validation. |
| Batch and AI state | workflow-gui / internalapi | Structured outcome contract, live option invalidation and product definition of disabled. |
| Node deadline / timer | reliability / resource-lifecycle | Externalapi fake stalled peer; transport cancellation and timer cleanup. |
| Logger | reliability / operator-signal | Local stream fault/recovery and nonrecursive console fallback. |
| Provider generation | architecture-nodejs / internalapi | Deferred construction interleavings and current-generation cache identity. |
| Standalone cache | workflow-gui / architecture-drift / deadcode | Production build, controlled offline/update artifact matrix. |
| Worker settlement / task and tooltip lifetime | failsafe / memory-lifecycle | Fake-worker terminals, task-group TTL/caps and listener identity. |
| Legacy print handlers | deadcode / invariant-sync | Owner compatibility decision and exact bridge-call reachability. |
| Report/instruction provenance | posture / repo reconciliation/path consistency | Durable artifacts and actual active remote; no historical attestation rewrite. |
| Excluded allegations | security or data audit, only if separately requested | Validate both sides and actual reachability before assigning current severity. |

## 12. Residual risks, opportunities and unreviewed frontier

| Item | Current control / evidence | Residual status | Next proof / owner |
| --- | --- | --- | --- |
| General render-fault containment | User-script boundary exists; normal widget mount lacks shared fallback | Likely normal-pane gap | Scoped throwing-child regression; no global-blank-screen assumption. |
| No-Web-Locks standalone host | Fallback assumes a sole tab for embedded hosts | Platform assumption retained, not newly accepted risk | Verify supported host/window model before claiming multi-tab safety without Web Locks. |
| Server shutdown and child trees | Signal handlers exit; provider cleanup exists in normal turn paths | Full SIGTERM/Windows/mobile process-tree behavior Not Verified | Disposable lifecycle drill with actual binaries; no orphan claim from static code alone. |
| Health vs readiness | Current endpoint is constant liveness | Operational capability opportunity, not a proven lying readiness endpoint | Decide whether deployment needs a separately documented DB/schema readiness probe; preserve first-run/setup availability. |
| Destructive confirmation styling/default focus | Explicit modal title, scope and confirm exist; danger variant absent | Low-priority UX opportunity, not counted Medium defect | Product review of irreversible erase state, default focus and visual hierarchy. |
| Backend/frontend folder presentation | subtreeHidden predicate differs | Unproven functional defect; no forced unification | Trace share/client icon expectations before centralizing. |
| Core cycles / import-time host configuration | Existing Architecture decision record explicitly retains lifecycle/cycle work | Known architectural debt; no new runtime failure established | Staged graph/lifecycle review with real host entrypoints; no cycle count borrowed as a current incident. |
| Performance/test economics | Pooling, scoped policy, worker limit and model-list cache exist | No measured hotspot or quantified savings accepted | Profile representative cold/warm/user workloads; do not remove necessary core host coverage. |
| Live model IDs/pricing/flags | Source catalog/discovery and tests exist | Vendor freshness Not Verified | Check exact provider/CLI versions and official sources; do not declare retirement from memory. |
| Cross-repo native/Gosling implementation | Only this repo’s adapter side reviewed | Producer side unavailable | Versioned upstream implementation and contract fixture required. |
| Prior data repair partial/routed work | Separate dated remediation ledger preserved | Not in this audit; not silently closed | Use that ledger’s seven open/partial work items for a separate repair engagement. |

No operational risk was accepted on behalf of an owner. Retained/unknown does not mean safe or approved. Runtime coverage gaps are not fresh defects by themselves.

## 13. Validation, evidence durability and final limits

Completed artifact checks: shared-schema validation of every normalized finding; unique IDs and totals; Markdown/JSON finding membership/order; exact source quote/range validation against the pinned snapshot; evidence-file content hashes; recovered-lane hashes; explicit candidate dispositions; root-script target existence; main/status identity reads. The JSON includes these checks and the individual taxonomy frontier. Any final generated-artifact check failure is a report bug to fix before delivery, not a target-product failure.

Not run: ESLint, full or focused target test suites, typecheck, app/package builds, server/UI launches, browser automation/playtests, fresh-process workflows, device/screen-reader runs, latency/heap/bundle/query measurements, real network/disk/process failure injection, two-peer sync, vendor CLI/live model calls or independent critic review. These are limits of this report-completion run; prior session validation remains historical, with the evidence-retention caveats described above.

The original five lane reports and checkpoint snapshots remain outside the repo; their hashes and paths are recorded for provenance. The report’s actual findings are portable: source evidence and contrary evidence are quoted here, with normalized fields and hashes in `mistral-comprehensive-audit-17oct2026.json`. This report does not depend on a reader interpreting private agent reasoning or accepting an old final-status message as proof.

## 14. Complete workspace inventory

`apps/build-docs`, `apps/client`, `apps/db-compare`, `apps/desktop`, `apps/dump-db`, `apps/edit-docs`, `apps/icon-pack-builder`, `apps/mobile`, `apps/script-deployer`, `apps/server`, `apps/standalone`, `apps/web-clipper`, `apps/website`, `packages/ckeditor5`, `packages/codemirror`, `packages/commons`, `packages/highlightjs`, `packages/pdfjs-viewer`, `packages/share-theme`, `packages/splitjs`, `packages/trilium-backup-container`, `packages/trilium-core`, `packages/trilium-e2e`, `packages/turndown-plugin-gfm`.

## 15. Machine-readable companion

`mistral-comprehensive-audit-17oct2026.json` contains `findings`, `counts`, `provenance`, `candidate_adjudication`, `lens_coverage`, `taxonomy_coverage`, `excluded_candidates`, `source_evidence_files`, `recovered_lane_artifacts`, `skill_contract_hashes`, `shared_contract_hashes`, `surface_inventory` and `artifact_validation`. Every finding uses the catalog schema; report-level metadata stays outside finding objects.
