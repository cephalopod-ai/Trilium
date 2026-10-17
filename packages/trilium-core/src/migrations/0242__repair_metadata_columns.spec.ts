import { describe, expect, it } from "vitest";

import { init } from "../services/context";
import { getSql } from "../services/sql";
import repairMetadataColumns from "./0242__repair_metadata_columns";
import { MIGRATIONS } from "./migrations";

describe("metadata column recovery", () => {
    it("repairs a partial revision migration and tolerates replays of the historical migrations", async () => {
        const sql = getSql();
        init(() => {
            sql.executeScript("ALTER TABLE revisions DROP COLUMN source");
            expect(() => sql.executeScript("ALTER TABLE revisions ADD COLUMN description TEXT DEFAULT '' NOT NULL; ALTER TABLE revisions ADD COLUMN source TEXT DEFAULT 'auto' NOT NULL;"))
                .toThrow();
            sql.transactional(repairMetadataColumns);
            sql.transactional(repairMetadataColumns);
            expect(sql.getRows<{ name: string }>("PRAGMA table_info(revisions)").map((column) => column.name)).toEqual(expect.arrayContaining(["description", "source"]));
        });
        for (const version of [236, 238]) {
            const migration = MIGRATIONS.find((entry) => entry.version === version);
            if (!migration || !("module" in migration)) throw new Error("Expected guarded migration");
            const { default: run } = await migration.module();
            init(() => sql.transactional(run));
        }
    });
});
