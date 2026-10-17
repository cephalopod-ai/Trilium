import { render } from "preact";
import { act } from "preact/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import server from "../../../services/server";
import { buildNote } from "../../../test/easy-froca";
import AttributeCell from "./attribute_cell";

describe("AttributeCell", () => {
    let container: HTMLElement;
    const put = vi.spyOn(server, "put").mockResolvedValue({ attributeId: "attr1" });
    vi.spyOn(server, "get").mockResolvedValue([]);

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        put.mockClear();
    });

    afterEach(() => {
        act(() => render(null, container));
        container.remove();
    });

    it("shows the values as text, and a boolean as a check mark", () => {
        act(() => render(<>
            <AttributeCell noteId="n" column={{ name: "tag", type: "text" }} values={[ "a", "b" ]} />
            <AttributeCell noteId="n" column={{ name: "done", type: "boolean" }} values={[ "true" ]} />
        </>, container));

        const cells = container.querySelectorAll(".timeline-attribute-cell");
        expect(cells[0].textContent?.trim()).toBe("a, b");
        expect(cells[1].querySelector(".bx-check")).not.toBeNull();
    });

    it("keeps read-only values inert, including after an editor was open", async () => {
        const note = buildNote({ title: "Locked", "#label:status": "promoted,single,text", "#status": "open" });
        const props = { noteId: note.noteId, column: { name: "status", type: "text" as const }, values: [ "open" ] };
        await act(async () => render(<AttributeCell {...props} />, container));
        const button = container.querySelector<HTMLButtonElement>("button.timeline-attribute-cell");
        expect(button).not.toBeNull();
        await act(async () => button?.click());
        expect(container.querySelector("input")).not.toBeNull();
        await act(async () => render(<AttributeCell {...props} readOnly />, container));
        expect(container.querySelector("input, button")).toBeNull();
        const cell = container.querySelector<HTMLElement>(".timeline-attribute-cell");
        expect(cell?.textContent).toBe("open");
        await act(async () => cell?.click());
        expect(container.querySelector("input")).toBeNull();
        expect(put).not.toHaveBeenCalled();
    });

    it("edits on click, and commits when a press outside closes the editor", () => {
        const note = buildNote({ title: "Task", "#label:status": "promoted,single,text", "#status": "open" });
        act(() => render(
            <AttributeCell noteId={note.noteId} column={{ name: "status", type: "text" }} values={[ "open" ]} />,
            container));

        const cell = container.querySelector<HTMLElement>(".timeline-attribute-cell");
        expect(cell).not.toBeNull();
        act(() => cell?.click());

        const input = container.querySelector<HTMLInputElement>(".timeline-attribute-cell-editor input");
        expect(input?.value).toBe("open");
        expect(document.activeElement).toBe(input);
        if (!input) return;

        input.value = "closed";
        act(() => { document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true })); });

        expect(put).toHaveBeenCalledWith(`notes/${note.noteId}/attribute`,
            expect.objectContaining({ name: "status", value: "closed" }), expect.any(String));
        expect(container.querySelector(".timeline-attribute-cell-editor")).toBeNull();
    });
});
