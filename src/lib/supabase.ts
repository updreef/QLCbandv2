import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Eén gedeelde Supabase-client, of null wanneer de env vars ontbreken.
 * De hele site (content + formulier + admin) checkt op null en valt
 * dan terug op src/data.ts, zodat de boel ook zonder Supabase draait.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const supabaseConfigured = supabase !== null;
