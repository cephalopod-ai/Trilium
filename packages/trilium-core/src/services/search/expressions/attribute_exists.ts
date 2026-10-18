"use strict";

import NoteSet from "../note_set.js";
import type SearchContext from "../search_context.js";

import becca from "../../../becca/becca.js";
import Expression from "./expression.js";

class AttributeExistsExp extends Expression {
    attributeType: string;
    attributeName: string;
    private prefixMatch: boolean;

    constructor(attributeType: string, attributeName: string, prefixMatch: boolean) {
        super();

        this.attributeType = attributeType;
        this.attributeName = attributeName;
        this.prefixMatch = prefixMatch;
    }

    execute(inputNoteSet: NoteSet, executionContext: {}, searchContext: SearchContext) {
        return getNotesWithAttribute(this.attributeType, this.attributeName, this.prefixMatch)
            .intersection(inputNoteSet);
    }
}

/**
 * Collects the notes an attribute of the given type and name applies to: the note it sits on, plus
 * the subtree and the templated notes of an inheritable attribute, or the notes using the note as a
 * template for one that is not inheritable. It reads the attribute index, so the cost follows the
 * number of matching attributes and not the number of notes.
 */
export function getNotesWithAttribute(
    attributeType: string,
    attributeName: string,
    prefixMatch: boolean
) {
    // template attr is used as a marker for templates, but it's not meant to be inherited
    const isTemplateLabel = attributeType === "label"
        && (attributeName === "template" || attributeName === "workspacetemplate");
    const attrs = prefixMatch
        ? becca.findAttributesWithPrefix(attributeType, attributeName)
        : becca.findAttributes(attributeType, attributeName);

    const resultNoteSet = new NoteSet();

    for (const attr of attrs) {
        const note = attr.note;

        if (attr.isInheritable && !isTemplateLabel) {
            resultNoteSet.addAll(note.getSubtreeNotesIncludingTemplated());
        } else if (note.isInherited() && !isTemplateLabel) {
            resultNoteSet.addAll(note.getInheritingNotes());
        } else {
            resultNoteSet.add(note);
        }
    }

    return resultNoteSet;
}

export default AttributeExistsExp;
