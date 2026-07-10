/**
 * Environment helpers. The site is designed to RUN without Supabase keys —
 * these helpers let the rest of the app degrade gracefully instead of
 * hard-crashing when placeholders are in place.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function looksReal(value: string | undefined): value is string {
  return (
    !!value &&
    value.length > 8 &&
    !value.startsWith("your-") &&
    !value.includes("your-project-ref")
  );
}

/** True only when browser-usable Supabase config is present. */
export const isSupabaseConfigured =
  looksReal(supabaseUrl) && looksReal(supabaseAnonKey);

/** True only when the server can write with the service role key. */
export const isSupabaseServerConfigured =
  isSupabaseConfigured && looksReal(supabaseServiceRoleKey);
