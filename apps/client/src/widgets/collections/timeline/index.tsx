import "fullcalendar/skeleton.css";
import "fullcalendar/themes/forma/theme.css";
import "../calendar/palette.css";
import "../calendar/index.css";
import "./index.css";

import { Calendar as FullCalendar, DateSelectInfo, EventChangeInfo, EventClickInfo, EventDisplayInfo, EventInput, MountInfo, PluginInput } from "fullcalendar";
import type { ColSpec, ResourceCellInfo } from "fullcalendar-scheduler";
import { createPortal, RefObject } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "preact/hooks";

import FNote from "../../../entities/fnote";
import attributes from "../../../services/attributes";
import froca from "../../../services/froca";
import { t } from "../../../services/i18n";
import link from "../../../services/link";
import note_create from "../../../services/note_create";
import { type NoteTypeOption } from "../../../services/note_types";
import note_tooltip from "../../../services/note_tooltip";
import toast from "../../../services/toast";
import { getErrorMessage, isShare } from "../../../services/utils";
import CollectionProperties from "../../note_bars/CollectionProperties";
import ActionButton from "../../react/ActionButton";
import Button, { ButtonGroup } from "../../react/Button";
import { useEffectiveReadOnly, useNoteContext, useNoteLabel, useNoteTypeOptions, useSpacedUpdate, useTriliumEvent, useTriliumOptionInt } from "../../react/hooks";
import { ParentComponent } from "../../react/react_utils";
import { offeredTemplateIds, useTemplateChoice } from "../../react/TemplateDropdown";
import { useLocale, useOnDatesSet } from "../calendar";
import { type CalendarViewData, changeEvent, DEFAULT_EVENT_TEMPLATES, newEvent } from "../calendar/api";
import Calendar from "../calendar/calendar";
import { buildEvents } from "../calendar/event_builder";
import EventPopover from "../calendar/EventPopover";
import GhostPopover from "../calendar/GhostPopover";
import { CalendarSelection, EventDraft } from "../calendar/selection";
import { isAttributeChangeAffecting, parseStartEndDateFromEvent, parseStartEndTimeFromEvent } from "../calendar/utils";
import { ViewModeProps } from "../interface";
import getAttributeDefinitionInformation from "../table/rows";
import AttributeCell from "./attribute_cell";
import { buildResources, columnKey, getColumnValues, newRowIdFor } from "./resources";

const TIMELINE_VIEWS = [
    { type: "resourceTimelineWeek", name: t("calendar.week") },
    { type: "resourceTimelineMonth", name: t("calendar.month") },
    { type: "resourceTimelineYear", name: t("calendar.year") }
];

const DEFAULT_VIEW = "resourceTimelineMonth";

const VIEW_OPTIONS = {
    resourceTimelineWeek: { slotDuration: { days: 1 } },
    resourceTimelineMonth: { slotDuration: { days: 1 } },
    // A snap must divide the slot evenly, which days do not do to a month, so the year is laid out
    // in weeks to keep dragging to the day.
    resourceTimelineYear: { slotDuration: { weeks: 1 }, snapDuration: { days: 1 } }
};

/** FullCalendar Premium is used under its AGPLv3 license, the same as Trilium's. */
const SCHEDULER_LICENSE_KEY = "AGPL-My-Frontend-And-Backend-Are-Open-Source";

const CalendarProperties = lazy(() => import("../calendar/CalendarProperties"));

export default function TimelineView({ note, noteIds, viewConfig, saveConfig, onOpenNote }: ViewModeProps<CalendarViewData>) {
    const parentComponent = useContext(ParentComponent);
    const componentId = parentComponent?.componentId;
    const { noteContext } = useNoteContext();
    const isReadOnly = useEffectiveReadOnly(note, noteContext) || isShare;
    const newRowId = useMemo(() => newRowIdFor(noteIds), [ noteIds ]);
    const containerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<FullCalendar>(null);
    const refreshTimers = useRef(new Set<ReturnType<typeof setTimeout>>());
    useEffect(() => () => {
        for (const timer of refreshTimers.current) clearTimeout(timer);
        refreshTimers.current.clear();
    }, [ note ]);
    const deferRefresh = (callback: () => void) => {
        const timer = setTimeout(() => {
            refreshTimers.current.delete(timer);
            callback();
        }, 0);
        refreshTimers.current.add(timer);
    };
    const [ selection, setSelection ] = useState<CalendarSelection | null>(null);
    const [ isEditingProperties, setIsEditingProperties ] = useState(false);

    const [ firstDayOfWeek ] = useTriliumOptionInt("firstDayOfWeek");
    const [ timelineView, setTimelineView ] = useNoteLabel(note, "timeline:view");
    const initialView = useRef(timelineView);
    const viewSpacedUpdate = useSpacedUpdate(() => {
        if (!isReadOnly) return setTimelineView(initialView.current);
    });

    const { plugins, error: pluginError, retry: retryPlugins } = usePlugins();
    const locale = useLocale();

    // The collection's promoted attribute definitions, the same columns the table view shows.
    const [ columns, setColumns ] = useState(() => getAttributeDefinitionInformation(note));
    useEffect(() => setColumns(getAttributeDefinitionInformation(note)), [ note ]);

    const resources = useMemo(() => async () => {
        await froca.getNotes([ note.noteId, ...noteIds ]);
        const rows = buildResources(note.noteId, noteIds, (noteId) => froca.getNoteFromCache(noteId));

        const relationColumns = columns.filter(column => column.type === "relation");
        const rowNotes = rows.map(row => froca.getNoteFromCache(row.id));
        await froca.getNotes(rowNotes.flatMap(rowNote => relationColumns.flatMap(column =>
            rowNote?.getRelations(column.name).map(relation => relation.value) ?? [])), true);

        for (const [ index, row ] of rows.entries()) {
            const rowNote = rowNotes[index];
            row.values = Object.fromEntries(columns.map(column => [ columnKey(column), rowNote
                ? getColumnValues(rowNote, column, (noteId) => froca.getNoteFromCache(noteId)?.title)
                : [] ]));
        }

        return isReadOnly ? rows : [ ...rows, {
            id: newRowId, title: t("timeline.new_row"), order: Number.MAX_SAFE_INTEGER
        } ];
    }, [ note, noteIds, columns, isReadOnly, newRowId ]);

    const events = useMemo(() => async () => {
        const events = await buildEvents(noteIds) as EventInput[];
        return events.map(event => ({
            ...event,
            resourceId: String(event.noteId),
            editable: !isReadOnly && !froca.getNoteFromCache(String(event.noteId))?.isLabelTruthy("readOnly")
        }));
    }, [ noteIds, isReadOnly ]);

    const openDetails = useCallback((noteId: string, event: MouseEvent) => {
        if (onOpenNote) {
            onOpenNote(noteId);
        } else if (isReadOnly || froca.getNoteFromCache(noteId)?.isLabelTruthy("readOnly")) {
            // Read-only views navigate without mounting the calendar's editing surface.
            link.goToLinkExt(event, `#root/${noteId}`);
        } else {
            setSelection({ noteId, anchor: { x: event.clientX, y: event.clientY } });
        }
    }, [ onOpenNote, isReadOnly ]);

    const onEventClick = useCallback((e: EventClickInfo) => {
        // The bar is a link to the note's popup, which the document-level link handler would open.
        e.jsEvent.preventDefault();
        e.jsEvent.stopPropagation();
        note_tooltip.dismissAllTooltips();

        const noteId = e.event.extendedProps.noteId;
        if (noteId) {
            openDetails(noteId, e.jsEvent);
        }
    }, [ openDetails ]);

    const onEventChange = useCallback(async (e: EventChangeInfo) => {
        const eventNote = await froca.getNote(e.event.extendedProps.noteId);
        const { startDate, endDate } = parseStartEndDateFromEvent(e.event);
        if (isReadOnly || !eventNote || eventNote.isLabelTruthy("readOnly") || !startDate) {
            e.revert();
            return;
        }

        const { startTime, endTime } = parseStartEndTimeFromEvent(e.event);
        try {
            await changeEvent(eventNote, { startDate, endDate, startTime, endTime, componentId });
            calendarRef.current?.refetchResources();
        } catch (error) {
            e.revert();
            toast.showError(getErrorMessage(error));
        }
    }, [ componentId, isReadOnly ]);

    // Range selection needs an entity reload to draw its new bar, so it uses no echo-suppression ID.
    const onSelect = useCallback(async (e: DateSelectInfo) => {
        if (isReadOnly) return;
        const { startDate, endDate } = parseStartEndDateFromEvent(e);
        if (!startDate) return;

        // On the new-note row the range stays selected, since the ghost is anchored to it.
        if (e.resource?.id === newRowId) {
            setSelection({
                draft: { startDate, endDate },
                anchor: e.jsEvent ? { x: e.jsEvent.clientX, y: e.jsEvent.clientY } : null
            });
            return;
        }

        calendarRef.current?.unselect();
        const rowNote = e.resource && await froca.getNote(e.resource.id);
        if (!rowNote || rowNote.isLabelTruthy("readOnly")) return;

        try {
            await changeEvent(rowNote, { startDate, endDate, startTime: null, endTime: null });
        } catch (error) {
            toast.showError(getErrorMessage(error));
        }
    }, [ isReadOnly, newRowId ]);

    const commitDraft = useCallback(async (
        title: string, draft: EventDraft, template: NoteTypeOption | undefined
    ) => {
        if (isReadOnly || !selection || !("draft" in selection)) return;

        await newEvent(note, { title: title.trim() || undefined, ...draft, template });
        calendarRef.current?.unselect();
        setSelection(null);
    }, [ selection, note, isReadOnly ]);

    const cancelDraft = useCallback(() => {
        calendarRef.current?.unselect();
        setSelection(null);
    }, []);

    const availableTemplates = useNoteTypeOptions(!isReadOnly);
    const selectTemplate = useCallback((template: NoteTypeOption) => {
        if (template.id !== viewConfig?.template) {
            saveConfig({ ...viewConfig, template: template.id });
        }
    }, [ viewConfig, saveConfig ]);
    const editTemplates = useCallback(() => setIsEditingProperties(true), []);
    const templates = useTemplateChoice({
        ids: offeredTemplateIds(viewConfig, DEFAULT_EVENT_TEMPLATES),
        lastUsedId: viewConfig?.template,
        available: availableTemplates,
        onSelect: selectTemplate,
        onMore: editTemplates
    });

    const addNote = useCallback(async (parentNoteId: string, e: MouseEvent) => {
        e.stopPropagation();
        if (isReadOnly) return;
        const anchor = { x: e.clientX, y: e.clientY };
        const parentNote = await froca.getNote(parentNoteId);
        if (!parentNote || (parentNote.noteId !== note.noteId && parentNote.isLabelTruthy("readOnly"))) return;
        const { note: createdNote } = await note_create.createNote(parentNoteId, {
            content: "",
            type: "text",
            isProtected: parentNote?.isProtected,
            activate: false
        });
        if (createdNote) {
            setSelection({ noteId: createdNote.noteId, anchor });
        }
    }, [ isReadOnly, note.noteId ]);

    useTriliumEvent("entitiesReloaded", ({ loadResults }) => {
        const api = calendarRef.current;
        if (!api) return;

        const isDefinitionChanged = loadResults.getAttributeRows().some(attr => attr.type === "label"
            && (attr.name?.startsWith("label:") || attr.name?.startsWith("relation:"))
            && attributes.isAffecting(attr, note));
        if (isDefinitionChanged) {
            deferRefresh(() => setColumns(getAttributeDefinitionInformation(note)));
        }

        if (selection && "noteId" in selection
                && froca.getNoteFromCache(selection.noteId)?.isLabelTruthy("readOnly")) {
            setSelection(null);
        }
        const isTitleChanged = loadResults.getNoteIds().some(noteId => noteIds.includes(noteId));
        if (isTitleChanged || isAttributeChangeAffecting(loadResults.getAttributeRows(componentId), noteIds)) {
            // Deferred so that froca holds the new data when the builders run.
            deferRefresh(() => {
                api.refetchResources();
                api.refetchEvents();
            });
        }
    });

    const titleColumn: ColSpec = {
        headerContent: () => (
            <div className="timeline-row">
                <span className="timeline-row-title">{t("timeline.title_column")}</span>
                {!isReadOnly && <ActionButton icon="bx bx-plus" text={t("timeline.add_note")} onClick={(e) => addNote(note.noteId, e)} />}
            </div>
        ),
        cellContent: ({ resource }: ResourceCellInfo) => resource?.id === newRowId ? (
            <div className="timeline-row timeline-new-row">
                <Button className="timeline-row-title" kind="lowProfile"
                    text={resource.title} icon="bx-plus"
                    onClick={(e) => addNote(note.noteId, e)} />
            </div>
        ) : resource && (
            <div className="timeline-row">
                <Button
                    className="timeline-row-title"
                    kind="lowProfile"
                    text={resource.title}
                    icon={resource.extendedProps.iconClass}
                    onClick={(e) => openDetails(resource.id, e)}
                />
                {!isReadOnly && !froca.getNoteFromCache(resource.id)?.isLabelTruthy("readOnly") && <ActionButton
                    className="timeline-row-add"
                    icon="bx bx-plus"
                    text={t("timeline.add_child_note")}
                    onClick={(e) => addNote(resource.id, e)}
                />}
            </div>
        )
    };

    if (pluginError) {
        return <div className="timeline-load-error" role="alert">
            <p>{t("timeline.load_failed")}</p>
            <Button text={t("note_detail.content_load_retry")} onClick={retryPlugins} />
        </div>;
    }

    return (plugins &&
        <div className="calendar-view timeline-view" ref={containerRef}>
            <TimelineCollectionProperties note={note} calendarRef={calendarRef} />
            <Calendar
                calendarRef={calendarRef}
                plugins={plugins}
                schedulerLicenseKey={SCHEDULER_LICENSE_KEY}
                initialView={TIMELINE_VIEWS.some(v => v.type === initialView.current) ? initialView.current ?? DEFAULT_VIEW : DEFAULT_VIEW}
                views={VIEW_OPTIONS}
                headerToolbar={false}
                height="100%"
                borderless
                nowIndicator
                locale={locale}
                firstDay={firstDayOfWeek ?? 0}
                resources={resources}
                resourceOrder="order"
                resourcesInitiallyExpanded
                resourceColumns={[ titleColumn, ...columns.map((column): ColSpec => ({
                    headerContent: column.title ?? column.name,
                    width: 120,
                    cellContent: ({ resource }: ResourceCellInfo) => resource && resource.id !== newRowId && (
                        <AttributeCell key={`${resource.id}:${columnKey(column)}`} noteId={resource.id} column={column}
                            readOnly={isReadOnly || froca.getNoteFromCache(resource.id)?.isLabelTruthy("readOnly")}
                            values={resource.extendedProps.values?.[columnKey(column)] ?? []} />
                    )
                })) ]}
                events={events}
                editable={!isReadOnly}
                eventResourceEditable={false}
                selectable={!isReadOnly}
                select={onSelect}
                highlightClass="calendar-highlight"
                unselectCancel=".calendar-ghost-popover, .calendar-ghost-sheet"
                eventChange={onEventChange}
                eventClick={onEventClick}
                eventClass={(arg: EventDisplayInfo) => (selection && "noteId" in selection
                    && selection.noteId === arg.event.extendedProps.noteId
                    ? "calendar-event calendar-event-selected no-tooltip-preview"
                    : "calendar-event")}
                eventContent={(e: EventDisplayInfo) => (
                    <div className={e.titleClass}>
                        {e.event.extendedProps.iconClass && <span className={`calendar-event-icon ${e.event.extendedProps.iconClass}`} />}
                        {e.event.title}
                    </div>
                )}
                eventDidMount={(e: MountInfo<EventDisplayInfo>) => {
                    // EventPopover locates the event bar through this attribute.
                    e.el.dataset.eventNoteId = String(e.event.extendedProps.noteId);
                }}
                viewDidMount={({ view }) => {
                    if (initialView.current !== view.type) {
                        initialView.current = view.type;
                        viewSpacedUpdate.scheduleUpdate();
                    }
                }}
            />
            {!isReadOnly && selection && "noteId" in selection
                && !froca.getNoteFromCache(selection.noteId)?.isLabelTruthy("readOnly") && (
                <EventPopover
                    noteId={selection.noteId}
                    anchor={selection.anchor}
                    container={containerRef.current}
                    parentNote={note}
                    isEditable={!isReadOnly && !froca.getNoteFromCache(selection.noteId)?.isLabelTruthy("readOnly")}
                    onClose={() => setSelection(null)}
                    onFollowLink={() => false}
                />
            )}
            {!isReadOnly && selection && "draft" in selection && (
                <GhostPopover
                    draft={selection.draft}
                    anchor={selection.anchor}
                    container={containerRef.current}
                    templates={templates}
                    onCommit={commitDraft}
                    onCancel={cancelDraft}
                    onDismiss={() => setSelection(null)}
                />
            )}
            {!isReadOnly && isEditingProperties && createPortal(
                <Suspense fallback={null}>
                    <CalendarProperties
                        note={note}
                        viewConfig={viewConfig}
                        eventNoteIds={noteIds}
                        saveConfig={saveConfig}
                        onClose={() => setIsEditingProperties(false)}
                    />
                </Suspense>,
                document.body
            )}
        </div>
    );
}

function TimelineCollectionProperties({ note, calendarRef }: {
    note: FNote;
    calendarRef: RefObject<FullCalendar | null>;
}) {
    const { title, viewType } = useOnDatesSet(calendarRef);

    return (
        <CollectionProperties
            note={note}
            centerChildren={<>
                <ActionButton icon="bx bx-chevron-left" text={t("timeline.previous")} onClick={() => calendarRef.current?.prev()} />
                <span className="title">{title}</span>
                <ActionButton icon="bx bx-chevron-right" text={t("timeline.next")} onClick={() => calendarRef.current?.next()} />
                <Button text={t("calendar.today")} onClick={() => calendarRef.current?.today()} />
            </>}
            rightChildren={
                <ButtonGroup>
                    {TIMELINE_VIEWS.map(view => (
                        <Button
                            key={view.type}
                            text={view.name}
                            className={viewType === view.type ? "active" : undefined}
                            onClick={() => calendarRef.current?.changeView(view.type)}
                        />
                    ))}
                </ButtonGroup>
            }
        />
    );
}

function usePlugins() {
    const [ plugins, setPlugins ] = useState<PluginInput[]>();
    const [ error, setError ] = useState(false);
    const [ attempt, setAttempt ] = useState(0);

    useEffect(() => {
        let cancelled = false;
        setError(false);
        Promise.all([
            import("fullcalendar/themes/forma"),
            import("fullcalendar-scheduler/resource-timeline"),
            import("fullcalendar/interaction"),
            import("@fullcalendar/rrule")
        ]).then(modules => {
            if (!cancelled) setPlugins(modules.map(m => m.default));
        }).catch(() => {
            if (!cancelled) setError(true);
        });
        return () => { cancelled = true; };
    }, [ attempt ]);

    return { plugins, error, retry: () => setAttempt(value => value + 1) };
}
