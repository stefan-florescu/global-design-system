"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { supabaseConfig } from "./supabase-config";

let client: SupabaseClient | null = null;

// Searching every store can take a while; anything slower means the network is down.
const timeoutMs = 60_000;

const fetchWithTimeout: typeof fetch = (input, init) => {
  const timeout = AbortSignal.timeout(timeoutMs);
  return fetch(input, {
    ...init,
    signal: init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout,
  });
};

/** The browser's Supabase client, created on first use. */
export function getSupabase() {
  client ??= createClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    global: { fetch: fetchWithTimeout },
  });
  return client;
}

/** An auth error as a sentence for the user. */
export function authErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/fetch|network|timeout|aborted/i.test(message)) {
    return "We couldn't reach the server. Check your connection and try again.";
  }
  if (/invalid login/i.test(message)) return "That email and password don't match an account.";
  if (/not confirmed/i.test(message)) return "Confirm your email first: open the link we sent you.";
  return message;
}

/** Calls the price-tracker Edge Function and returns its JSON, or throws its error message. */
export async function callFunction<T>(
  action: string,
  body: Record<string, unknown> = {},
): Promise<T> {
  const { data, error } = await getSupabase().functions.invoke(supabaseConfig.functionName, {
    body: { action, ...body },
  });
  if (error) {
    // The function answers errors as { error: "…" }: show that message rather than the status.
    let message = "Something went wrong. Try again in a minute.";
    const context = (error as { context?: unknown }).context;
    if (context instanceof Response) {
      try {
        const payload = (await context.json()) as { error?: string };
        if (payload.error) message = payload.error;
      } catch {
        // Not JSON: keep the generic message.
      }
    }
    throw new Error(message);
  }
  return data as T;
}
