import { render, type ComponentChildren } from "preact";
import { act } from "preact/test-utils";
import { afterEach, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
    open: undefined as ((data: { selectedOrActiveNoteIds: string[] }) => Promise<void>) | undefined,
    modal: undefined as { show?: boolean; onSubmit?: () => Promise<void>; children?: ComponentChildren } | undefined
}));
vi.mock("../react/Modal", () => ({ default: (props: NonNullable<typeof state.modal>) => {
    state.modal = props;
    return <div>{props.children}</div>;
} }));
vi.mock("../react/hooks", async (importOriginal) => ({
    ...await importOriginal<typeof import("../react/hooks")>(),
    useTriliumEvent: (name: string, handler: typeof state.open) => {
        if (name === "openBulkActionsDialog") state.open = handler;
    }
}));

import type FNote from "../../entities/fnote";
import froca from "../../services/froca";
import server from "../../services/server";
import toast from "../../services/toast";
import ws from "../../services/ws";
import BulkActionsDialog from "./bulk_actions";

const container = document.createElement("div");
afterEach(() => {
    render(null, container);
    state.open = undefined;
    state.modal = undefined;
    vi.restoreAllMocks();
});

it("uses the shared outcome notification when the main dialog executes a partial failure", async () => {
    vi.spyOn(froca, "getNote").mockResolvedValue({ getLabels: () => [] } as unknown as FNote);
    vi.spyOn(server, "post").mockResolvedValueOnce({ affectedNoteCount: 1 })
        .mockResolvedValue({ applied: 0, skipped: 1, failed: 1, outcomes: [] });
    const error = vi.spyOn(toast, "showError").mockImplementation(() => {});
    const success = vi.spyOn(toast, "showMessage").mockImplementation(() => {});
    ws.waitForMaxKnownEntityChangeId = vi.fn(async () => {});
    await act(async () => { render(<BulkActionsDialog />, container); });
    await act(async () => { await state.open?.({ selectedOrActiveNoteIds: ["one"] }); });
    expect(state.modal?.show).toBe(true);
    await act(async () => { await state.modal?.onSubmit?.(); });
    expect(server.post).toHaveBeenCalledWith("bulk-action/execute", { noteIds: ["one"], includeDescendants: false, actions: [] });
    expect(ws.waitForMaxKnownEntityChangeId).toHaveBeenCalledOnce();
    expect(error).toHaveBeenCalledOnce();
    expect(success).not.toHaveBeenCalled();
});
