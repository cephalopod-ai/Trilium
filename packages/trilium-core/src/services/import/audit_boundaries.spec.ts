import { strToU8, zipSync } from "fflate";
import { describe, expect, it, vi } from "vitest";

import becca from "../../becca/becca";
import { init } from "../context";
import notes from "../notes";
import { getSql } from "../sql";
import TaskContext from "../task_context";
import single from "./single";
import zip from "./zip";

describe("audit import boundaries", () => {
    it("applies safe-import validation to YAML labels in single files and archives", async () => init(async () => {
        const body = "---\nrun: backendStartup\nshareRaw: true\nordinary: fine\n---\nHello";
        const parent = becca.getNoteOrThrow("root");
        const task = new TaskContext("audit-import-safe", "importNotes", { safeImport: true, textImportedAsText: true });
        const note = await single.importSingleFile(task, { originalname: "audit.md", mimetype: "text/markdown", buffer: strToU8(body) }, parent);
        expect(note.hasLabel("run")).toBe(false);
        expect(note.hasLabel("disabled:run")).toBe(true);
        expect(note.hasLabel("ordinary")).toBe(true);
        const archived = await zip.importZip(task, zipSync({ "archive.md": strToU8(body) }), parent);
        expect(archived.hasLabel("run")).toBe(false);
        expect(archived.hasLabel("disabled:run")).toBe(true);
        expect(archived.getLabelValue("ordinary")).toBe("fine");
    }));

    it("compensates committed import batches when post-processing fails", async () => init(async () => {
        const sql = getSql();
        const before = sql.getValue<number>("SELECT COUNT(*) FROM notes WHERE isDeleted = 0");
        const fail = vi.spyOn(notes, "asyncPostProcessContent").mockRejectedValueOnce(new Error("injected import failure"));
        try {
            await expect(zip.importZip(new TaskContext("audit-import-fail", "importNotes", { textImportedAsText: true }),
                zipSync({ "one.html": strToU8("one"), "two.html": strToU8("two") }), becca.getNoteOrThrow("root")))
                .rejects.toThrow("injected import failure");
            expect(sql.getValue("SELECT COUNT(*) FROM notes WHERE isDeleted = 0")).toBe(before);
            expect(Object.keys(becca.notes).length).toBe(before);
        } finally {
            fail.mockRestore();
        }
    }));
});


it("preserves external relation targets and remaps forward targets inside the archive", async () => init(async () => {
    const parent = becca.getNoteOrThrow("root");
    const external = notes.createNewNote({ parentNoteId: "root", title: "existing-target", content: "", type: "text" }).note;
    const metadata = { files: [
        { noteId: "archiveHost", title: "relation-host", type: "text", mime: "text/html", format: "html", dataFileName: "host.html",
            attributes: [{ type: "relation", name: "external", value: external.noteId }, { type: "relation", name: "forward", value: "archiveTarget" }] },
        { noteId: "archiveTarget", title: "relation-target", type: "text", mime: "text/html", format: "html", dataFileName: "target.html", attributes: [] }
    ] };
    const imported = await zip.importZip(new TaskContext("audit-relations", "importNotes", {}), zipSync({
        "!!!meta.json": strToU8(JSON.stringify(metadata)), "host.html": strToU8("host"), "target.html": strToU8("target")
    }), parent);
    expect(imported.getRelationValue("external")).toBe(external.noteId);
    const targetId = imported.getRelationValue("forward");
    expect(targetId).not.toBe("archiveTarget");
    expect(becca.getNoteOrThrow(targetId ?? "missing").title).toBe("relation-target");
}));
