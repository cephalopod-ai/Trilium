import { describe, expect, it, vi } from "vitest";

describe("initialization boundary", () => {
    it("fails with an actionable message before SQL and context are initialized", async () => {
        vi.resetModules();
        const { getSql } = await import("./sql/index");
        const { getContext } = await import("./context");
        expect(() => getSql()).toThrow(/SQL not initialized.*initializeCore/);
        expect(() => getContext()).toThrow(/Context not initialized.*initializeCore/);
    });
});
