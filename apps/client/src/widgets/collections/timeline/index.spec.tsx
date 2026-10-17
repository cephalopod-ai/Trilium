import type { DateSelectInfo, EventChangeInfo } from "fullcalendar";
import { render } from "preact";
import { act } from "preact/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { CalendarProps } from "../calendar/calendar";
import type { TimelineRow } from "./resources";

const harness = vi.hoisted(() => ({
    props: null as CalendarProps | null,
    changeEvent: vi.fn(),
    refetchResources: vi.fn(),
    refetchEvents: vi.fn(),
    unselect: vi.fn()
}));
vi.mock("../calendar/calendar", () => ({
    default: (props: CalendarProps) => {
        harness.props = props;
        if (props.calendarRef) {
            props.calendarRef.current = {
                refetchResources: harness.refetchResources,
                refetchEvents: harness.refetchEvents,
                unselect: harness.unselect
            } as unknown as import("fullcalendar").Calendar;
        }
        return <div className="calendar-test" />;
    }
}));
vi.mock("../calendar/index", () => ({
    useLocale: () => undefined,
    useOnDatesSet: () => ({ title: "date range", viewType: "resourceTimelineMonth" })
}));
vi.mock("../calendar/api", async (original) => ({
    ...await original<typeof import("../calendar/api")>(),
    changeEvent: harness.changeEvent
}));
vi.mock("../../react/hooks", async (original) => ({
    ...await original<typeof import("../../react/hooks")>(),
    useNoteTypeOptions: () => []
}));
vi.mock("fullcalendar/themes/forma", () => ({ default: {} }));
vi.mock("fullcalendar-scheduler/resource-timeline", () => ({ default: {} }));
vi.mock("fullcalendar/interaction", () => ({ default: {} }));
vi.mock("@fullcalendar/rrule", () => ({ default: {} }));

import Component from "../../../components/component";
import { ParentComponent } from "../../react/react_utils";
import { buildNote } from "../../../test/easy-froca";
import type { CalendarViewData } from "../calendar/api";
import type { ViewModeProps } from "../interface";
import TimelineView from "./index";

let container: HTMLDivElement;

function options() {
    if (!harness.props) throw new Error("Timeline did not mount the calendar");
    return harness.props;
}

function props(readOnly = false) {
    const note = buildNote({
        title: "Timeline",
        type: "book",
        ...(readOnly ? { "#readOnly": "" } : {}),
        children: [{ title: "Task", "#startDate": "2026-10-17" }]
    });
    return {
        note, noteIds: note.getChildNoteIds(), notePath: note.noteId,
        highlightedTokens: [], viewConfig: undefined,
        saveConfig: vi.fn(), media: "screen", onReady: vi.fn()
    } satisfies ViewModeProps<CalendarViewData>;
}

async function mount(value: ViewModeProps<CalendarViewData>) {
    await act(async () => {
        render(<ParentComponent.Provider value={new Component()}>
            <TimelineView {...value} />
        </ParentComponent.Provider>, container);
    });
    await act(async () => { await vi.dynamicImportSettled(); });
}

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    harness.props = null;
    vi.clearAllMocks();
    harness.changeEvent.mockResolvedValue(undefined);
});
afterEach(async () => {
    await act(async () => render(null, container));
    container.remove();
});

describe("TimelineView", () => {
    it("loads dated events onto their rows and includes a new-note row", async () => {
        const value = props();
        await mount(value);
        const calendar = options();
        expect(calendar.initialView).toBe("resourceTimelineMonth");
        expect(calendar.editable).toBe(true);
        expect(calendar.selectable).toBe(true);
        const resources = await (calendar.resources as () => Promise<TimelineRow[]>)();
        expect(resources.map(row => row.id)).toEqual([ ...value.noteIds, "_timeline_new" ]);
        const events = await (calendar.events as () => Promise<import("fullcalendar").EventInput[]>)();
        expect(events).toEqual([expect.objectContaining({
            noteId: value.noteIds[0], resourceId: value.noteIds[0], editable: true
        })]);
    });

    it("keeps a read-only timeline navigable and refuses date writes", async () => {
        const value = props(true);
        await mount(value);
        const calendar = options();
        expect(calendar.editable).toBe(false);
        expect(calendar.selectable).toBe(false);
        const resources = await (calendar.resources as () => Promise<TimelineRow[]>)();
        expect(resources.map(row => row.id)).toEqual(value.noteIds);
        await calendar.select?.({
            start: new Date(2026, 9, 17), end: new Date(2026, 9, 19),
            allDay: true, resource: { id: value.noteIds[0] }
        } as unknown as DateSelectInfo);
        const revert = vi.fn();
        await calendar.eventChange?.({
            event: { start: new Date(2026, 9, 17), allDay: true, extendedProps: { noteId: value.noteIds[0] } }, revert
        } as unknown as EventChangeInfo);
        expect(revert).toHaveBeenCalledOnce();
        expect(harness.changeEvent).not.toHaveBeenCalled();
    });

    it("honors an embedded host's navigation callback instead of opening an editor", async () => {
        const value = { ...props(true), onOpenNote: vi.fn() };
        await mount(value);
        const calendar = options();
        calendar.eventClick?.({
            event: { extendedProps: { noteId: value.noteIds[0] } },
            jsEvent: new MouseEvent("click")
        } as unknown as import("fullcalendar").EventClickInfo);
        expect(value.onOpenNote).toHaveBeenCalledWith(value.noteIds[0]);
        expect(container.querySelector(".calendar-event-popover")).toBeNull();
    });

    it("schedules an existing row and refreshes column values after moving its bar", async () => {
        const value = props();
        await mount(value);
        const calendar = options();
        await calendar.select?.({
            start: new Date(2026, 9, 17), end: new Date(2026, 9, 19),
            allDay: true, resource: { id: value.noteIds[0] }
        } as unknown as DateSelectInfo);
        expect(harness.changeEvent).toHaveBeenCalledWith(expect.objectContaining({ noteId: value.noteIds[0] }), {
            startDate: "2026-10-17", endDate: "2026-10-18", startTime: null, endTime: null
        });
        const revert = vi.fn();
        await calendar.eventChange?.({
            event: { start: new Date(2026, 9, 18), end: new Date(2026, 9, 20), allDay: true, extendedProps: { noteId: value.noteIds[0] } }, revert
        } as unknown as EventChangeInfo);
        expect(harness.refetchResources).toHaveBeenCalledOnce();
        expect(revert).not.toHaveBeenCalled();
    });

    it("reverts a failed date save and protects read-only rows inside an editable collection", async () => {
        const value = props();
        const locked = buildNote({ title: "Locked", "#readOnly": "", "#startDate": "2026-10-17" });
        value.noteIds.push(locked.noteId);
        await mount(value);
        const calendar = options();
        const events = await (calendar.events as () => Promise<import("fullcalendar").EventInput[]>)();
        expect(events.find(event => event.noteId === locked.noteId)?.editable).toBe(false);
        const revert = vi.fn();
        const change = (noteId: string) => ({ event: {
            start: new Date(2026, 9, 17), allDay: true, extendedProps: { noteId }
        }, revert }) as unknown as EventChangeInfo;
        await calendar.eventChange?.(change(locked.noteId));
        expect(harness.changeEvent).not.toHaveBeenCalled();
        harness.changeEvent.mockRejectedValueOnce(new Error("save failed"));
        await calendar.eventChange?.(change(value.noteIds[0]));
        expect(revert).toHaveBeenCalledTimes(2);
    });
});
