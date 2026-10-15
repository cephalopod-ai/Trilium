import "./GoslingControls.css";

import { useEffect, useState } from "preact/hooks";

import { t } from "../../../services/i18n.js";
import server from "../../../services/server.js";
import Button from "../../react/Button.js";
import FormCheckbox from "../../react/FormCheckbox.js";
import type { UseLlmChatReturn } from "./useLlmChat.js";

/** Approvals remain transient; no credential or permission response is saved in a chat note. */
export default function GoslingControls({
    chat,
    onAccessChange
}: {
    chat: UseLlmChatReturn;
    onAccessChange?: () => void;
}) {
    const [extensions, setExtensions] = useState<{ name: string }[]>([]);
    const [error, setError] = useState("");
    const selected = chat.availableModels.find(
        (model) => model.id === chat.selectedModel && model.providerId === chat.selectedProviderId
    );
    const native = selected?.provider === "acp-agent" || chat.selectedProvider === "acp-agent";
    const active = native || selected?.provider === "gosling" || chat.selectedProvider === "gosling";
    useEffect(() => {
        if (!active || native) { setExtensions([]); return; }
        let disposed = false;
        server
            .get<{ name: string }[]>("gosling/extensions")
            .then((result) => {
                if (!disposed) setExtensions(result);
            })
            .catch(() => {
                if (!disposed) setError(t("llm.gosling_extension_error"));
            });
        return () => {
            disposed = true;
        };
    }, [active, native]);
    if (!active) return null;
    const state = selected?.gosling;
    const perform = (operation: Promise<void>) => {
        setError("");
        void operation.catch(() => setError(t("llm.gosling_decision_error")));
    };
    return (
        <div className="gosling-controls">
            <div>
                {selected?.name} ·{" "}
                {t("llm.gosling_endpoint", { location: selected?.nativeAgent?.endpointLocation ?? state?.endpointLocation ?? "unknown" })}
            </div>
            {state?.unavailableReason && <div role="alert">{state.unavailableReason}</div>}
            {state?.authenticationRequired && (
                <div role="status">{t("llm.gosling_auth_required")}</div>
            )}
            {state?.authenticationExpired && (
                <div role="status">{t("llm.gosling_auth_expired")}</div>
            )}
            <div className="gosling-guidance">{t(native ? "llm.native_agent_privacy" : "llm.gosling_privacy")}</div>
            {chat.goslingSessionInfo && <div role="status">{chat.goslingSessionInfo}</div>}
            {native && selected?.nativeAgent?.notes === false && <div role="status">{t("llm.native_agent_no_notes")}</div>}
            <details>
                <summary>{t(native ? "llm.native_agent_permissions" : "llm.gosling_permissions")}</summary>
                <FormCheckbox
                    name="gosling-writes"
                    currentValue={chat.goslingAllowWrites}
                    disabled={chat.isStreaming || !chat.enableNoteTools}
                    label={t("llm.gosling_writes")}
                    onChange={chat.setGoslingAllowWrites}
                />
                <FormCheckbox
                    name="gosling-handoff"
                    currentValue={chat.goslingHandoff}
                    disabled={chat.isStreaming}
                    label={t(native ? "llm.native_agent_handoff" : "llm.gosling_handoff")}
                    onChange={chat.setGoslingHandoff}
                />
                {!native && <p>{t("llm.gosling_extensions_help")}</p>}
                {extensions.map((extension) => (
                    <FormCheckbox
                        key={extension.name}
                        name={`gosling-extension-${extension.name}`}
                        label={extension.name}
                        disabled={chat.isStreaming}
                        currentValue={chat.goslingExtensions.includes(extension.name)}
                        onChange={(enabled) =>
                            chat.setGoslingExtensions(
                                enabled
                                    ? [...chat.goslingExtensions, extension.name]
                                    : chat.goslingExtensions.filter(
                                          (name) => name !== extension.name
                                      )
                            )
                        }
                    />
                ))}
            </details>
            <Button
                size="small"
                text={t("llm.gosling_revoke")}
                onClick={() => perform(chat.revokeGoslingAccess().then(() => onAccessChange?.()))}
            />
            {chat.goslingPermissions.map((request) => (
                <div
                    className="gosling-approval"
                    key={request.requestId}
                    role="group"
                    aria-label={t("llm.gosling_approval")}
                >
                    <strong>{request.title}</strong>
                    <pre>{request.input}</pre>
                    <div className="gosling-approval-actions">
                        {request.options.map((option) => (
                            <Button
                                key={option.optionId}
                                text={option.name}
                                size="small"
                                onClick={() =>
                                    perform(
                                        chat.answerGoslingPermission(
                                            request.requestId,
                                            option.optionId
                                        )
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
            {error && <div role="alert">{error}</div>}
        </div>
    );
}
