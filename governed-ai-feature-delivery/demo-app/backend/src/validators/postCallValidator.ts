import type { ExtractedDocument, PostValidationResult } from "../types";

const ALLOWED_TYPES = new Set(["invoice", "contract", "email", "other"]);

export function validatePostCall(candidate: unknown): PostValidationResult {
  if (!candidate || typeof candidate !== "object") {
    return { ok: false, reason: "validation_failed" };
  }

  const data = candidate as Partial<ExtractedDocument>;

  if (typeof data.documentType !== "string" || !ALLOWED_TYPES.has(data.documentType)) {
    return { ok: false, reason: "validation_failed" };
  }

  if (typeof data.confidence !== "number" || data.confidence < 0 || data.confidence > 1) {
    return { ok: false, reason: "validation_failed" };
  }

  if (!Array.isArray(data.entities) || data.entities.some((x) => typeof x !== "string")) {
    return { ok: false, reason: "validation_failed" };
  }

  return {
    ok: true,
    data: {
      documentType: data.documentType,
      confidence: data.confidence,
      entities: data.entities,
      summary: typeof data.summary === "string" ? data.summary : undefined,
    },
  };
}
