import "server-only";
import bcrypt from "bcryptjs";

/**
 * Password hashing helpers.
 *
 * Note: when using Supabase Auth (the default in this project), Supabase
 * securely hashes passwords with bcrypt for you — you do NOT need these.
 * They're provided for any custom credential storage you might add later
 * (e.g. an internal admin login), so raw passwords are never stored.
 */

const ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  if (plain.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }
  return bcrypt.hash(plain, ROUNDS);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
