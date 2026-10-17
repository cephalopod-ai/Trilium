import { getSql } from "../services/sql";

/** Repairs schemas that advanced past a partially applied optional-column migration. */
export default function repairMetadataColumns() {
    ensureBlobTextRepresentation();
    ensureRevisionMetadataColumns();
}

export function ensureRevisionMetadataColumns() {
    ensureColumn("revisions", "description", "TEXT DEFAULT '' NOT NULL");
    ensureColumn("revisions", "source", "TEXT DEFAULT 'auto' NOT NULL");
}

export function ensureBlobTextRepresentation() {
    ensureColumn("blobs", "textRepresentation", "TEXT DEFAULT NULL");
}

function ensureColumn(table: string, name: string, definition: string) {
    const sql = getSql();
    if (!sql.getRows<{ name: string }>(`PRAGMA table_info(${table})`).some((column) => column.name === name)) {
        sql.executeScript(`ALTER TABLE ${table} ADD COLUMN ${name} ${definition}`);
    }
}
