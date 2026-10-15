import { LLM_REASONING_EFFORTS, type LlmReasoningEffort } from "@triliumnext/commons";

export interface NativeAcpSession {
    sessionId: string;
    models?: { currentModelId?: string; availableModels?: { modelId: string; name?: string }[] };
    modes?: { currentModeId: string; availableModes: { id: string; name?: string }[] };
    configOptions?: NativeAcpOption[];
}

export interface NativeAcpOption {
    id: string;
    category?: string;
    type: string;
    currentValue: string;
    options: ({ value: string; name?: string } | { group: string; options: { value: string; name?: string }[] })[];
}

/** ACP options can be grouped; values, rather than display names, control routing. */
export function optionValues(option: NativeAcpOption) {
    return option.options.flatMap(entry => "value" in entry ? [entry] : entry.options);
}

export function sessionCatalog(value: unknown): NativeAcpSession {
    if (!value || typeof value !== "object" || !("sessionId" in value) || typeof value.sessionId !== "string") {
        throw new Error("The ACP agent returned an invalid session response.");
    }
    const session = value as NativeAcpSession;
    if (session.models?.availableModels?.some(model => typeof model.modelId !== "string" || !model.modelId)) {
        throw new Error("The ACP agent returned an invalid model catalog.");
    }
    if (session.configOptions && (!Array.isArray(session.configOptions) || session.configOptions.some(option =>
        typeof option.id !== "string" || option.type !== "select" || !Array.isArray(option.options) ||
        optionValues(option).some(entry => typeof entry.value !== "string")))) {
        throw new Error("The ACP agent returned unsupported session configuration options.");
    }
    return session;
}

export function modelChoices(session: NativeAcpSession) {
    const option = session.configOptions?.find(entry => entry.category === "model" || entry.id === "model");
    if (option) return optionValues(option).map(entry => ({ id: entry.value, name: entry.name ?? entry.value }));
    if (session.models?.availableModels?.length) {
        return session.models.availableModels.map(model => ({ id: model.modelId, name: model.name ?? model.modelId }));
    }
    if (session.models?.currentModelId) return [{ id: session.models.currentModelId, name: session.models.currentModelId }];
    return [{ id: "current", name: "CLI configured model (not reported)" }];
}

export function reasoningOption(session: NativeAcpSession) {
    return session.configOptions?.find(option => option.category === "thought_level" || ["thinking", "thinking_effort", "reasoning_effort"].includes(option.id));
}

export function reasoningChoices(session: NativeAcpSession): LlmReasoningEffort[] {
    const option = reasoningOption(session);
    if (!option) return [];
    return optionValues(option).map(entry => entry.value === "off" ? "none" : entry.value)
        .filter((value): value is LlmReasoningEffort => (LLM_REASONING_EFFORTS as readonly string[]).includes(value));
}

export function nativeModelId(profile: string, model: string) {
    return JSON.stringify([profile, model]);
}

export function parseNativeModelId(value: string | undefined): [string, string] {
    try {
        const parsed: unknown = JSON.parse(value ?? "");
        if (Array.isArray(parsed) && parsed.length === 2 && parsed.every(entry => typeof entry === "string" && entry.length)) {
            return parsed as [string, string];
        }
    } catch { /* An invalid identity never selects a default. */ }
    throw new Error("Select an installed native agent and model in AI settings.");
}
