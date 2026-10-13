"use client";

import { useSyncExternalStore } from "react";

import { applyRemote, loadRemote } from "./remote";
import { getSession, useSession } from "./session";
import { getSupabase } from "./supabase";
import {
  emptyState,
  parseState,
  serialize,
  trackerReducer,
  type TrackerAction,
  type TrackerState,
} from "./tracker";

const storageKey = "price-tracker:v1";

/*
 * The tracker's state. Signed in, it is the user's data in Supabase: changes show at once, are
 * saved, and the state is reloaded from the database. In the demo it lives in this browser's
 * localStorage, and other tabs pick up changes through the `storage` event.
 */

let demoState: TrackerState | null = null;
let accountState: TrackerState | null = null;
let accountUser: string | null = null;
let loadError: string | null = null;
let saveFailed = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readDemo() {
  if (demoState === null) {
    try {
      demoState = parseState(window.localStorage.getItem(storageKey)) ?? emptyState;
    } catch {
      // Storage can be blocked (private mode, site settings): the demo still works for the visit.
      demoState = emptyState;
    }
  }
  return demoState;
}

let loading: Promise<void> | null = null;

/** Reloads the signed-in user's tracker from Supabase. */
export function refresh() {
  const session = getSession();
  if (session.mode !== "account") return Promise.resolve();
  const userId = session.user.id;
  loading ??= loadRemote(getSupabase())
    .then((state) => {
      if (getSession().user?.id !== userId) return;
      accountUser = userId;
      accountState = state;
      loadError = null;
    })
    .catch((error: unknown) => {
      loadError = error instanceof Error ? error.message : "Your watchlist couldn't be loaded.";
      accountState ??= emptyState;
    })
    .finally(() => {
      loading = null;
      emit();
    });
  return loading;
}

function read(): TrackerState | null {
  const session = getSession();
  if (session.mode === "demo") return readDemo();
  if (session.mode !== "account") return null;
  if (accountUser !== session.user.id) {
    accountUser = session.user.id;
    accountState = null;
    void refresh();
  }
  return accountState;
}

function onStorage(event: StorageEvent) {
  if (event.key !== storageKey) return;
  demoState = parseState(event.newValue) ?? emptyState;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function dispatch(action: TrackerAction) {
  const session = getSession();
  if (session.mode === "account") {
    const next = trackerReducer(accountState ?? emptyState, action);
    accountState = next;
    emit();
    void applyRemote(getSupabase(), session.user.id, action, next)
      .then(() => {
        saveFailed = false;
      })
      .catch(() => {
        saveFailed = true;
      })
      // The database is the truth: reload so the screen matches what was saved.
      .finally(() => void refresh());
    return;
  }

  demoState = trackerReducer(readDemo(), action);
  try {
    window.localStorage.setItem(storageKey, serialize(demoState));
    saveFailed = false;
  } catch {
    // Full or blocked storage: the change still shows for this visit.
    saveFailed = true;
  }
  emit();
}

/** The current state, outside React (for async flows). */
export function getState() {
  return read() ?? emptyState;
}

/** Whether the last change couldn't be saved. */
export function lastSaveFailed() {
  return saveFailed;
}

/** Why the signed-in user's data couldn't be loaded, if it couldn't. */
export function lastLoadError() {
  return loadError;
}

/**
 * The tracker's state (`null` while it loads, or when nobody is signed in and the demo isn't
 * open) and the function that changes it.
 */
export function useTracker() {
  // Re-read when the user signs in or out.
  useSession();
  const current = useSyncExternalStore(subscribe, read, () => null);
  return { state: current, dispatch };
}
