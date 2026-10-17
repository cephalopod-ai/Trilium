import { Tooltip } from "bootstrap";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("../services/i18n", async (importOriginal) => ({
    ...await importOriginal<typeof import("../services/i18n")>(),
    t: (key: string) => key
}));

import appContext from "../components/app_context";
import TabManager from "../components/tab_manager";
import TabRowWidget from "./tab_row";

const originalTabManager = appContext.tabManager;
let widget: TabRowWidget | undefined;
afterEach(() => {
    for (const element of widget?.$widget?.find("button, .note-tab-drag-handle") ?? []) Tooltip.getInstance(element)?.dispose();
    if (widget?.$widget) widget.remove();
    appContext.tabManager = originalTabManager;
    vi.useRealTimers();
    vi.restoreAllMocks();
});

it("gives tab actions native keyboard semantics and disables unavailable scrolling", () => {
    vi.useFakeTimers();
    widget = new TabRowWidget();
    // Layout/dragging requires a real layout engine; this test covers the controls and their handlers.
    vi.spyOn(widget, "layoutTabs").mockImplementation(() => {});
    vi.spyOn(widget, "setupDraggabilly").mockImplementation(() => {});
    vi.spyOn(widget, "setupEvents").mockImplementation(() => {});
    appContext.tabManager = new TabManager();
    widget.doRender();
    document.body.append(widget.$widget[0]);
    widget.addTab("keyboard-tab");
    const close = widget.$widget.find<HTMLButtonElement>(".note-tab-close")[0];
    const add = widget.$widget.find<HTMLButtonElement>(".note-new-tab")[0];
    for (const button of [close, add, ...widget.$widget.find<HTMLButtonElement>(".tab-scroll-button-left, .tab-scroll-button-right")]) {
        expect(button.tagName).toBe("BUTTON");
        expect(button.type).toBe("button");
        expect(button.hasAttribute("aria-label")).toBe(true);
    }
    close.focus();
    expect(document.activeElement).toBe(close);
    const command = vi.spyOn(widget, "triggerCommand").mockImplementation(() => {});
    close.click();
    expect(command).toHaveBeenCalledWith("closeActiveTab", expect.anything());
    widget.updateScrollButtonState();
    expect(widget.$widget.find<HTMLButtonElement>(".tab-scroll-button-left")[0].disabled).toBe(true);
    expect(widget.$widget.find<HTMLButtonElement>(".tab-scroll-button-right")[0].disabled).toBe(true);
    vi.runOnlyPendingTimers();
});
