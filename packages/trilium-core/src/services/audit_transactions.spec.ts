import type { EntityChange, NoteRow } from "@triliumnext/commons";
import { describe, expect, it, vi } from "vitest";

import becca from "../becca/becca";
import { CoreApiTester } from "../test/api_tester";
import { init } from "./context";
import zipExport from "./export/zip";
import notes from "./notes";
import { getSql } from "./sql";
import syncUpdate from "./sync_update";
import TaskContext from "./task_context";
import ws from "./ws";
import { getZipProvider } from "./zip_provider";

describe("audit transaction and conflict boundaries", () => {
    it("emits task success only after the outer commit and discards it on rollback", () => init(() => {
        const sql = getSql();
        const send = vi.spyOn(ws, "sendMessageToAllClients").mockImplementation(() => {});
        try {
            const task = new TaskContext("audit-task", "empty", null);
            send.mockClear();
            sql.transactional(() => {
                sql.transactional(() => task.taskSucceeded(null));
                expect(send).not.toHaveBeenCalled();
            });
            expect(send).toHaveBeenCalledTimes(1);
            send.mockClear();
            expect(() => sql.transactional(() => {
                task.taskSucceeded(null);
                throw new Error("rollback");
            })).toThrow("rollback");
            expect(send).not.toHaveBeenCalled();
        } finally {
            send.mockRestore();
        }
    }));

    it("resolves equal-time conflicts deterministically and preserves the losing note in a revision", () => init(() => {
        const sql = getSql();
        const { note } = notes.createNewNote({ parentNoteId: "root", title: "local", type: "text", content: "local content" });
        const row = sql.getRow<NoteRow>("SELECT * FROM notes WHERE noteId = ?", [note.noteId]);
        const ec = sql.getRow<EntityChange>("SELECT * FROM entity_changes WHERE entityName = 'notes' AND entityId = ?", [note.noteId]);
        sql.execute("UPDATE entity_changes SET hash = ? WHERE entityName = 'notes' AND entityId = ?", ["a-local", note.noteId]);
        const apply = (hash: string, title: string, changeId: string) => sql.transactional(() => syncUpdate.updateEntities([{
            entityChange: { ...ec, hash, changeId }, entity: { ...row, title } as NoteRow
        }], "peer"));
        apply("z-remote", "remote", "tie-one");
        expect(becca.getNoteOrThrow(note.noteId).title).toBe("remote");
        const revisions = sql.getRows<{ title: string; blobId: string }>("SELECT title, blobId FROM revisions WHERE noteId = ?", [note.noteId]);
        expect(revisions).toEqual(expect.arrayContaining([expect.objectContaining({ title: "local", blobId: row.blobId })]));
        apply("a-local", "local", "tie-two");
        expect(sql.getValue("SELECT title FROM notes WHERE noteId = ?", [note.noteId])).toBe("remote");
    }));
});

it("rejects reordered sync pages and tolerates an identical in-flight retry", async () => {
    const api = CoreApiTester.build();
    const headers = { pageCount: "3", pageIndex: "0", requestId: "audit-paging" };
    expect((await api.put("/api/sync/update", { headers, body: '{"instanceId":"peer",' })).status).toBe(204);
    expect((await api.put("/api/sync/update", { headers, body: '{"instanceId":"peer",' })).status).toBe(204);
    expect((await api.put("/api/sync/update", { headers: { ...headers, pageIndex: "2" }, body: "[]}" })).status).toBe(400);
    expect((await api.put("/api/sync/update", { headers: { ...headers, pageIndex: "1" }, body: '"entities":' })).status).toBe(204);
    expect((await api.put("/api/sync/update", { headers: { ...headers, pageIndex: "2" }, body: "[]}" })).status).toBe(204);
});

it("destroys a failed archive stream and never reports success", async () => init(async () => {
    const provider = getZipProvider();
    const archive = { append: vi.fn(), pipe: vi.fn(), finalize: vi.fn().mockRejectedValue(new Error("injected export failure")) };
    const createArchive = vi.spyOn(provider, "createZipArchive").mockReturnValue(archive);
    const destination = { write: () => true, end: vi.fn(), destroy: vi.fn() };
    const task = new TaskContext("audit-export", "export", null);
    const succeeded = vi.spyOn(task, "taskSucceeded");
    try {
        const { branch } = notes.createNewNote({ parentNoteId: "root", title: "export", content: "export", type: "text" });
        await expect(zipExport.exportToZip(task, branch, "html", destination, false)).rejects.toThrow("injected export failure");
        expect(destination.destroy).toHaveBeenCalledWith(expect.any(Error));
        expect(succeeded).not.toHaveBeenCalled();
    } finally {
        createArchive.mockRestore();
    }
}));
