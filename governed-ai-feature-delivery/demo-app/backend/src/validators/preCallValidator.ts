import type { ExtractRequest, PreValidationResult } from "../types";

export function validatePreCall(input: ExtractRequest): PreValidationResult {
  if (!input.text || typeof input.text !== "string") {
    return { ok: false, reason: "invalid_input" };
  }

  const trimmed = input.text.trim();
  if (trimmed.length < 20 || trimmed.length > 10000) {
    return { ok: false, reason: "invalid_input" };
  }

  return { ok: true };
}
