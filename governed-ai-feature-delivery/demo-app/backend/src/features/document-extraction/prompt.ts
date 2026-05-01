export const DOCUMENT_EXTRACTION_PROMPT_VERSION = "extract-v1";

export function buildDocumentExtractionPrompt(inputText: string): string {
  return [
    "You are an extraction assistant for regulated document workflows.",
    "Return JSON only with keys: documentType, confidence, entities, summary.",
    "Do not include any extra keys.",
    "Document text:",
    inputText,
  ].join("\n");
}
