"use client";

import { useSyncExternalStore } from "react";

import { basePath } from "./base-path";
import { getSupabase } from "./supabase";

/*
 * Who is using the app: a signed-in account (data in Supabase), the demo (simulated prices kept
 * in this browser), or nobody yet (the landing page).
 */

export type Session =
  | { mode: "loading"; user: null }
  | { mode: "signed-out"; user: null }
  | { mode: "demo"; user: null }
  | { mode: "account"; user: { id: string; email: string } };

const demoKey = "price-tracker:demo";

let session: Session = { mode: "loading", user: null };
let started = false;
const listeners = new Set<() => void>();

function set(next: Session) {
  if (
    next.mode === session.mode &&
    (next.user?.id ?? null) === (session.user?.id ?? null) &&
    (next.user?.email ?? null) === (session.user?.email ?? null)
  ) {
    return;
  }
  session = next;
  listeners.forEach((listener) => listener());
}

function demoChosen() {
  try {
    return window.localStorage.getItem(demoKey) === "1";
  } catch {
    return false;
  }
}

function fromUser(user: { id: string; email?: string } | null | undefined): Session {
  if (user) return { mode: "account", user: { id: user.id, email: user.email ?? "" } };
  return demoChosen() ? { mode: "demo", user: null } : { mode: "signed-out", user: null };
}

function start() {
  if (started) return;
  started = true;
  const auth = getSupabase().auth;
  void auth.getSession().then(({ data }) => set(fromUser(data.session?.user)));
  auth.onAuthStateChange((_event, current) => set(fromUser(current?.user)));
}

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSession() {
  return session;
}

/** The current session; `loading` until Supabase has restored any saved sign-in. */
export function useSession() {
  return useSyncExternalStore(subscribe, getSession, () => session);
}

/** Uses the app without an account: simulated prices, saved in this browser. */
export function startDemo() {
  try {
    window.localStorage.setItem(demoKey, "1");
  } catch {
    // Storage blocked: the demo lasts for this visit.
  }
  set({ mode: "demo", user: null });
}

export function leaveDemo() {
  try {
    window.localStorage.removeItem(demoKey);
  } catch {
    // Nothing saved.
  }
  if (session.mode === "demo") set({ mode: "signed-out", user: null });
}

export async function signOut() {
  const auth = getSupabase().auth;
  // Offline, the server can't end the session: forget it in this browser anyway.
  const { error } = await auth.signOut().catch((failure: unknown) => ({ error: failure }));
  if (error) await auth.signOut({ scope: "local" });
  leaveDemo();
  set({ mode: "signed-out", user: null });
}

/** Where auth emails send people back to: this app's pages on the current site. */
export function appUrl(path = "/") {
  return `${window.location.origin}${basePath}${path}`;
}
