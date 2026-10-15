import { describe, expect, it } from "vitest";

import { modelChoices, nativeModelId, optionValues, parseNativeModelId, reasoningChoices, sessionCatalog } from "./native_acp_contract.js";

describe("Native ACP contract", () => {
    it("preserves exact identities and grouped configuration values without a model catalog", () => {
        const parsed = sessionCatalog({ sessionId: "synthetic", configOptions: [
            { id: "route", category: "model", type: "select", currentValue: "a/b:c", options: [{ group: "Same display", options: [{ value: "a/b:c", name: "Same" }, { value: "different", name: "Same" }] }] },
            { id: "thinking", type: "select", currentValue: "off", options: [{ value: "off" }, { value: "low" }, { value: "ultra" }] }
        ] });
        expect(modelChoices(parsed).map(model => model.id)).toEqual(["a/b:c", "different"]);
        expect(reasoningChoices(parsed)).toEqual(["none", "low", "ultra"]);
        expect(parseNativeModelId(nativeModelId("custom/profile", "a/b:c"))).toEqual(["custom/profile", "a/b:c"]);
        expect(optionValues(parsed.configOptions?.[0] ?? { id: "", type: "select", currentValue: "", options: [] })).toHaveLength(2);
    });
    it("uses reported model state, labels an unreported default, and rejects malformed responses", () => {
        expect(modelChoices({ sessionId: "s", models: { currentModelId: "native-default" } })[0].id).toBe("native-default");
        expect(modelChoices({ sessionId: "s" })[0]).toEqual({ id: "current", name: "CLI configured model (not reported)" });
        expect(() => sessionCatalog({ sessionId: 17 })).toThrow(/invalid session/);
        expect(() => sessionCatalog({ sessionId: "s", models: { availableModels: [{ modelId: null }] } })).toThrow();
        expect(() => parseNativeModelId("provider / display name")).toThrow(/Select an installed/);
    });
});
