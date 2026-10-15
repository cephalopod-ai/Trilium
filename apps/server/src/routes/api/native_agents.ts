import type { Request } from "express";
import { ValidationError } from "@triliumnext/core";

export async function inventory(req: Request) {
    const { nativeAcpProvider } = await import("../../services/llm/providers/native_acp.js");
    return nativeAcpProvider.inventory(req.body?.refresh === true);
}

export async function revoke(req: Request) {
    if (typeof req.body?.chatNoteId !== "string") throw new ValidationError("chatNoteId is required");
    const { nativeAcpProvider } = await import("../../services/llm/providers/native_acp.js");
    nativeAcpProvider.revoke(req.body.chatNoteId);
}
