"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey, isSupabaseConfigured } from "@/lib/env";

/**
 * Browser Supabase client. Returns null when Supabase isn't configured so
 * account UI can show a friendly "coming soon" state instead of crashing.
 */
export function getBrowserSupabase() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

export { isSupabaseConfigured };
