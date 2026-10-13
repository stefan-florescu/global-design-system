/*
 * The Supabase project behind the price tracker (ADR 0011). The URL and publishable key are
 * public by design: row-level security decides what each signed-in user can read and write.
 * Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to use another project.
 */
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ssizcmwaarxqwxoopksw.supabase.co",
  publishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_zOK2zO_-7HjuKJvS_YTGGQ_yCAzcRmK",
  /** The Edge Function that identifies, searches and checks prices. */
  functionName: "price-tracker",
  /** Show "Continue with Google" once the Google provider is enabled in Supabase Auth. */
  googleSignIn: false,
};
