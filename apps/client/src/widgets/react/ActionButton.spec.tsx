import { Tooltip } from "bootstrap";
import { render } from "preact";
import { act } from "preact/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Component from "../../components/component";
import NoteContext from "../../components/note_context";
import ActionButton from "./ActionButton";
import { NoteContextContext, ParentComponent } from "./react_utils";

describe("ActionButton", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        render(null, container);
        container.remove();
        for (const orphan of document.querySelectorAll(".tooltip")) {
            orphan.remove();
        }
    });

    it("keeps a plain accessible name before hover and updates it with the label", async () => {
        await act(async () => { render(<ActionButton icon="bx bx-play" text="Run" />, container); });
        const button = container.querySelector("button");
        expect(button?.getAttribute("aria-label")).toBe("Run");
        expect(document.querySelector(".tooltip")).toBeNull();
        await act(async () => { render(<ActionButton icon="bx bx-play" text="<b>Run &amp; save</b>" tooltipHtml />, container); });
        expect(button?.getAttribute("aria-label")).toBe("Run & save");
    });

    it("removes its show listener when tooltip options change on the same button", async () => {
        await act(async () => { render(<ActionButton icon="bx bx-play" text="Run" />, container); });
        const button = container.querySelector("button");
        if (!button) throw new Error("Missing button");
        const add = vi.spyOn(button, "addEventListener");
        const remove = vi.spyOn(button, "removeEventListener");
        await act(async () => { render(<ActionButton icon="bx bx-play" text="Run" titlePosition="top" />, container); });
        const listener = add.mock.calls.find(([name]) => name === "show.bs.tooltip")?.[1];
        expect(listener).toBeDefined();
        await act(async () => { render(<ActionButton icon="bx bx-play" text="Run" titlePosition="left" />, container); });
        expect(remove).toHaveBeenCalledWith("show.bs.tooltip", listener);
    });

    it("triggers its command from the surrounding component, naming the note context it stands in", () => {
        const parentComponent = new Component();
        const triggerCommand = vi.spyOn(parentComponent, "triggerCommand").mockReturnValue(undefined);

        act(() => render(
            <ParentComponent.Provider value={parentComponent}>
                <NoteContextContext.Provider value={new NoteContext("_popup-editor")}>
                    <ActionButton icon="bx bx-play" text="Run" triggerCommand="runActiveNote" />
                </NoteContextContext.Provider>
            </ParentComponent.Provider>, container));

        const button = container.querySelector("button");
        expect(button).not.toBeNull();
        act(() => button?.click());

        expect(triggerCommand).toHaveBeenCalledWith("runActiveNote", { ntxId: "_popup-editor" });
    });

    it("names the note context of the closest legacy ancestor, such as a split, when no provider surrounds it", () => {
        const split = Object.assign(new Component(), { noteContext: new NoteContext("split-2") });
        const parentComponent = new Component();
        split.child(parentComponent);
        const triggerCommand = vi.spyOn(parentComponent, "triggerCommand").mockReturnValue(undefined);

        act(() => render(
            <ParentComponent.Provider value={parentComponent}>
                <ActionButton icon="bx bx-play" text="Run" triggerCommand="runActiveNote" />
            </ParentComponent.Provider>, container));

        const button = container.querySelector("button");
        expect(button).not.toBeNull();
        act(() => button?.click());

        expect(triggerCommand).toHaveBeenCalledWith("runActiveNote", { ntxId: "split-2" });
    });

    it("dismisses its tooltip when pressed, so it cannot sit on top of what the press opened", async () => {
        const onClick = vi.fn();
        await act(async () => render(
            <ActionButton icon="bx bx-plus" text="Add a new attribute" onClick={onClick} />, container));

        const button = container.querySelector("button");
        expect(button).not.toBeNull();

        // The tooltip is shown by hovering/focusing in the real thing; neither is reliable under
        // happy-dom, so it is shown through the instance the hook registered.
        act(() => {
            if (button) Tooltip.getInstance(button)?.show();
        });
        expect(document.querySelector(".tooltip")).not.toBeNull();

        act(() => button?.click());

        expect(document.querySelector(".tooltip")).toBeNull();
        expect(onClick).toHaveBeenCalledOnce();
    });
});
