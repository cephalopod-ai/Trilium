import type { BranchRow, EntityChange, NoteRow } from "@triliumnext/commons";
import { describe, expect, it, vi } from "vitest";

import becca from "../becca/becca";
import BNote from "../becca/entities/bnote";
import { getContext } from "./context";
import erase from "./erase";
import notes from "./notes";
import { getSql } from "./sql";
import TaskContext from "./task_context";
import syncUpdate from "./sync_update";

const create = (noteId: string, parentNoteId = "root") => notes.createNewNote({
    noteId, parentNoteId, title: noteId, content: "original", type: "text"
});

describe("audit identity and lifecycle invariants", () => {
    it("rejects branch identity collisions locally and over sync without overwriting the existing placement", () => getContext().init(() => {
        create("auditParent");
        create("auditParent_child");
        const first = create("leaf", "auditParent_child");
        expect(() => create("child_leaf", "auditParent")).toThrow(/collision/i);
        expect(becca.getNote("child_leaf")).toBeFalsy();
        expect(getSql().getValue("SELECT noteId FROM branches WHERE branchId = ?", [first.branch.branchId])).toBe("leaf");
        const ec = getSql().getRow<EntityChange>("SELECT * FROM entity_changes WHERE entityName = 'branches' AND entityId = ?", [first.branch.branchId]);
        const row = getSql().getRow<BranchRow>("SELECT * FROM branches WHERE branchId = ?", [first.branch.branchId]);
        expect(() => syncUpdate.updateEntities([{
            entityChange: { ...ec, changeId: "collision-sync", utcDateChanged: "9999-01-01 00:00:00Z" },
            entity: { ...row, parentNoteId: "auditParent", noteId: "child_leaf" } as BranchRow
        }], "peer")).toThrow(/collision/i);
        expect(getSql().getValue("SELECT noteId FROM branches WHERE branchId = ?", [first.branch.branchId])).toBe("leaf");
    }));

    it("rejects duplicate forced note IDs, including tombstones, and preserves normal edits", () => getContext().init(() => {
        const { note, branch } = create("auditForced");
        expect(() => create("auditForced")).toThrow(/already exists/i);
        expect(becca.getNoteOrThrow(note.noteId)).toBe(note);
        note.title = "edited";
        note.save();
        expect(getSql().getValue("SELECT title FROM notes WHERE noteId = ?", [note.noteId])).toBe("edited");
        branch.deleteBranch("audit-delete");
        expect(() => create("auditForced")).toThrow(/already exists/i);
    }));

    it("rejects stale saves after deletion while explicit undelete still works", () => getContext().init(() => {
        const { note, branch } = create("auditStale");
        const row = getSql().getRow<NoteRow>("SELECT * FROM notes WHERE noteId = ?", [note.noteId]);
        const stale = new BNote(row);
        branch.deleteBranch("audit-stale-delete");
        expect(() => stale.save()).toThrow(/deleted/i);
        expect(getSql().getValue("SELECT isDeleted FROM notes WHERE noteId = ?", [note.noteId])).toBe(1);
        notes.undeleteNote(note.noteId, new TaskContext("audit-restore", "undeleteNotes", null));
        expect(getSql().getValue("SELECT isDeleted FROM notes WHERE noteId = ?", [note.noteId])).toBe(0);
    }));

    it("rolls back the entire erase when a later table write fails", () => getContext().init(() => {
        const { note, branch } = create("auditErase");
        branch.deleteBranch("audit-erase-delete");
        const sql = getSql();
        const execute = sql.executeMany.bind(sql);
        const spy = vi.spyOn(sql, "executeMany").mockImplementation((query, params) => {
            if (/DELETE FROM branches/.test(query)) throw new Error("injected erase failure");
            return execute(query, params);
        });
        try {
            expect(() => erase.eraseNotesWithDeleteIds(["audit-erase-delete"])).toThrow("injected erase failure");
            expect(sql.getValue("SELECT isDeleted FROM notes WHERE noteId = ?", [note.noteId])).toBe(1);
        } finally {
            spy.mockRestore();
        }
    }));
});

it("restores becca and the change cursor after a rolled-back batch", async () => {
    const { default: loader } = await import("../becca/becca_loader");
    const { default: changes } = await import("./entity_changes");
    getContext().init(() => {
        const sql = getSql();
        expect(() => sql.transactional(() => {
            create("auditRolledBack");
            throw new Error("injected batch failure");
        })).toThrow("injected batch failure");
        loader.recoverTransactionRollback();
        expect(becca.getNote("auditRolledBack")).toBeFalsy();
        expect(sql.getValue("SELECT 1 FROM notes WHERE noteId = 'auditRolledBack'")).toBeUndefined();
        expect(changes.getMaxEntityChangeId()).toBe(sql.getValue("SELECT MAX(id) FROM entity_changes"));
    });
});


it("deduplicates identical attributes while preserving distinct values and inheritance", () => getContext().init(() => {
    const { note } = create("auditAttributes");
    const first = note.addLabel("auditLabel", "one");
    expect(note.addLabel("auditLabel", "one").attributeId).toBe(first.attributeId);
    note.addLabel("auditLabel", "two");
    note.addLabel("auditLabel", "one", true);
    expect(note.getOwnedAttributes().filter((attribute) => attribute.name === "auditLabel")).toHaveLength(3);
    const relation = note.addRelation("auditRelation", "root");
    expect(note.addRelation("auditRelation", "root").attributeId).toBe(relation.attributeId);
}));
