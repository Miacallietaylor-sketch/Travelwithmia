import "server-only";
import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Lightweight admin gate for Mia's back office.
 *
 * Access is granted by an access code (env `ADMIN_ACCESS_CODE`). On success we
 * set a signed, http-only session cookie so the code is never re-sent. The
 * cookie is HMAC-signed with `ADMIN_SESSION_SECRET` to prevent forgery.
 *
 * This is intentionally simple so the admin area works the moment the site is
 * deployed. For a hardened setup, upgrade to Supabase Auth + a role check
 * (see docs/ADMIN-GUIDE.md).
 */

const COOKIE = "twm_admin";
const DAY = 60 * 60 * 24;

// Sensible demo defaults so the panel is reachable out of the box.
// ⚠️ CHANGE BOTH in production via environment variables.
const ACCESS_CODE = process.env.ADMIN_ACCESS_CODE ?? "mia-admin";
const SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "change-me-dev-only-secret-please";

function sign(payload: string): string {
  const mac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${mac}`;
}

function verify(token: string | undefined): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 0) return false;
  const payload = token.slice(0, idx);
  const mac = token.slice(idx + 1);
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  if (
    mac.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
  ) {
    return false;
  }
  const exp = Number(payload.split("|")[1]);
  return Number.isFinite(exp) && exp > Date.now();
}

export function checkAccessCode(code: string): boolean {
  const a = Buffer.from(code);
  const b = Buffer.from(ACCESS_CODE);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function createAdminSession() {
  const payload = `admin|${Date.now() + DAY * 1000 * 7}`; // 7 days
  cookies().set(COOKIE, sign(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DAY * 7,
  });
}

export function clearAdminSession() {
  cookies().delete(COOKIE);
}

export function isAdmin(): boolean {
  return verify(cookies().get(COOKIE)?.value);
}

/** True when the deployer is still using the insecure demo defaults. */
export const usingDefaultAdminSecret =
  !process.env.ADMIN_ACCESS_CODE || !process.env.ADMIN_SESSION_SECRET;
