/**
 * Plain-text sanitisation for anything stored or echoed back. React escapes
 * on render, but we also strip HTML/control characters at the boundary so
 * nothing dangerous is ever persisted or emailed.
 */
export function sanitizeText(input: unknown, maxLength = 2000): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // strip tags
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, "") // control chars
    .trim()
    .slice(0, maxLength);
}

/** Escape a value for safe inclusion inside an HTML email template. */
export function escapeHtml(input: unknown): string {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
