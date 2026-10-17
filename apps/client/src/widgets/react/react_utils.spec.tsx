import { useState } from "preact/hooks";
import { act } from "preact/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";

import { disposeReactWidget, renderReactWidget, renderReactWidgetAtElement } from "./react_utils";

const containers: HTMLElement[] = [];
afterEach(() => {
    for (const container of containers) {
        for (const mount of container.querySelectorAll(".react-widget-mount")) disposeReactWidget(mount);
        disposeReactWidget(container);
        container.remove();
    }
    containers.length = 0;
    vi.restoreAllMocks();
});

describe("widget crash boundary", () => {
    it("isolates a render failure, offers retry, and leaves sibling mounts usable", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const host = document.createElement("div");
        const sibling = document.createElement("div");
        containers.push(host, sibling);
        document.body.append(host, sibling);
        let broken = true;
        function Widget() {
            if (broken) throw new Error("render failure");
            return <span data-recovered />;
        }
        await act(async () => {
            renderReactWidgetAtElement(null, <Widget />, host);
            renderReactWidgetAtElement(null, <button onClick={() => { sibling.dataset.clicked = "yes"; }}>Sibling</button>, sibling);
        });
        expect(host.querySelector('[role="alert"]')).not.toBeNull();
        // Complete the lazy shared-control import inside act, rather than racing the runner's
        // module transform against a polling timeout under concurrent cross-runtime tests.
        await act(async () => { await import("./Button"); });
        expect(host.querySelector("button")).not.toBeNull();
        broken = false;
        await act(async () => { host.querySelector("button")?.click(); });
        expect(host.querySelector("[data-recovered]")).not.toBeNull();
        sibling.querySelector("button")?.click();
        expect(sibling.dataset.clicked).toBe("yes");
    });

    it("contains a later child failure after a fragment widget is inserted into its real parent", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});
        const host = document.createElement("div");
        containers.push(host);
        document.body.append(host);
        let crash = () => {};
        function Widget() {
            const [broken, setBroken] = useState(false);
            crash = () => setBroken(true);
            if (broken) throw new Error("later failure");
            return <span data-initial />;
        }
        await act(async () => { $(host).append(renderReactWidget(null, <Widget />)); });
        expect(host.querySelector("[data-initial]")).not.toBeNull();
        await act(async () => { crash(); });
        expect(host.querySelector('[role="alert"]')).not.toBeNull();
    });
});
