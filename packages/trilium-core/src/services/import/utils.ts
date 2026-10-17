import { demoteHeadings } from "@triliumnext/commons/src/lib/markdown_renderer.js";

import attributeService from "../attributes";
import { sanitizeHtml } from "../sanitizer";

import { unescapeHtml } from "../utils";

function handleH1(content: string, title: string) {
    // Reserve <h1> for the note title and shift the content hierarchy to fit the
    // editor's <h2>–<h6> range (see #8383). Pass our own `unescapeHtml`, which —
    // unlike the markdown renderer's — only decodes the five basic HTML entities.
    return demoteHeadings(content, title, unescapeHtml);
}

function extractHtmlTitle(content: string): string | null {
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
    return titleMatch ? titleMatch[1].trim() : null;
}

export default {
    handleH1,
    extractHtmlTitle
};

/** Applies the safe-import boundary to attributes regardless of their source format. */
export function sanitizeImportedAttribute<T extends { type?: string; name: string; value: string }>(attribute: T, safeImport?: boolean): T {
    if (!safeImport) return attribute;
    const name = attributeService.isAttributeDangerous(attribute.type ?? "label", attribute.name)
        ? `disabled:${attribute.name}` : attribute.name;
    return { ...attribute, name: sanitizeHtml(name), value: sanitizeHtml(attribute.value) };
}
