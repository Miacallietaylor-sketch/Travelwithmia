import { site } from "@/lib/site";

/**
 * Same-origin guard (lightweight CSRF protection for state-changing POSTs).
 * Accepts requests whose Origin/Referer matches the site URL or the request
 * host. Requests with no Origin (server-to-server, some native apps) are
 * allowed through the read of other protections (rate limit, validation).
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // no Origin header — not a browser CSRF vector
  try {
    const originHost = new URL(origin).host;
    const selfHost = new URL(site.url).host;
    const reqHost = request.headers.get("host") ?? "";
    return originHost === selfHost || originHost === reqHost;
  } catch {
    return false;
  }
}

/** Reject oversized bodies before parsing (request-size limit). */
export function tooLarge(request: Request, maxBytes: number): boolean {
  const len = Number(request.headers.get("content-length") ?? "0");
  return Number.isFinite(len) && len > maxBytes;
}
