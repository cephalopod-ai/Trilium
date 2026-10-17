import { render } from "preact";
import { act } from "preact/test-utils";
import { afterEach, expect, it, vi } from "vitest";

const download = vi.hoisted(() => vi.fn());
vi.mock("../../react/hooks", async (importOriginal) => ({
    ...await importOriginal<typeof import("../../react/hooks")>(),
    useActiveNoteContext: () => ({ note: { type: "file", mime: "application/pdf" } }),
    useNoteProperty: (note: Record<string, string>, property: string) => note[property],
    useGetContextData: () => ({ attachments: [{ id: "attachment-1", filename: "notes.txt", size: 42 }], downloadAttachment: download })
}));
vi.mock("../RightPanelWidget", () => ({ default: ({ children }: { children: unknown }) => children }));

import PdfAttachments from "./PdfAttachments";

const container = document.createElement("div");
afterEach(() => {
    render(null, container);
    container.remove();
    vi.clearAllMocks();
});

it("exposes each attachment as a focusable native download action named by its filename", async () => {
    document.body.append(container);
    await act(async () => { render(<PdfAttachments />, container); });
    const button = container.querySelector<HTMLButtonElement>("button.pdf-attachment-item");
    expect(button?.type).toBe("button");
    expect(button?.tabIndex).toBe(0);
    expect(button?.textContent).toContain("notes.txt");
    button?.focus();
    expect(document.activeElement).toBe(button);
    button?.click();
    expect(download).toHaveBeenCalledWith("attachment-1");
});
