"use client";

/**
 * Minimal, consent-aware analytics. Only fires when the visitor has accepted
 * analytics cookies. NEVER receives personal data, enquiry answers or chat
 * content — event names only, with non-identifying labels.
 */
export type MahdiEvent =
  | "mahdi_opened"
  | "mahdi_closed"
  | "quick_action_selected"
  | "enquiry_started"
  | "enquiry_step_completed"
  | "enquiry_abandoned"
  | "enquiry_submitted"
  | "human_handover_clicked"
  | "mahdi_error";

const STORAGE_KEY = "twm-cookie-consent";

function analyticsAllowed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return JSON.parse(raw)?.analytics === true;
  } catch {
    return false;
  }
}

export function track(event: MahdiEvent, label?: string) {
  if (typeof window === "undefined") return;
  if (!analyticsAllowed()) return;
  // Whitelist labels to non-PII tokens only (e.g. a quick-action id or step no).
  const safeLabel =
    label && /^[a-z0-9_-]{1,40}$/i.test(label) ? label : undefined;
  const w = window as unknown as Record<string, (...args: unknown[]) => void>;
  try {
    if (typeof w.va === "function") w.va("event", { name: event, label: safeLabel });
    else if (typeof w.gtag === "function") w.gtag("event", event, { label: safeLabel });
    // else: no analytics provider wired — silently no-op.
  } catch {
    /* never let analytics break the app */
  }
}
