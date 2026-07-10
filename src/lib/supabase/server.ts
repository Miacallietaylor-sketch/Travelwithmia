import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  supabaseUrl,
  supabaseAnonKey,
  supabaseServiceRoleKey,
  isSupabaseConfigured,
  isSupabaseServerConfigured,
} from "@/lib/env";

/**
 * Server-side Supabase client bound to the request cookies (for auth).
 * Returns null when Supabase isn't configured so callers can degrade.
 */
export function getServerSupabase() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = cookies();
  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }[]
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — safe to ignore; middleware refreshes.
        }
      },
    },
  });
}

/**
 * Privileged client for writing enquiries/quotes and admin tasks.
 * Uses the service role key and MUST only be used server-side.
 */
export function getServiceSupabase() {
  if (!isSupabaseServerConfigured) return null;
  return createServerClient(supabaseUrl!, supabaseServiceRoleKey!, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}
