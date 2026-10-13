"use client";

import { useSyncExternalStore } from "react";

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
 * The tracker is saved in this browser's localStorage until accounts and the database land
 * (plan Phases 1–2). Other tabs pick up changes through the `storage` event.
 */
let state: TrackerState | null = null;
let saveFailed = false;
const listeners = new Set<() => void>();

function read() {
  if (state === null) {
    try {
      state = parseState(window.localStorage.getItem(storageKey)) ?? emptyState;
    } catch {
      // Storage can be blocked (private mode, site settings): the tracker still works for the visit.
      state = emptyState;
    }
  }
  return state;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== storageKey) return;
  state = parseState(event.newValue) ?? emptyState;
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
  state = trackerReducer(read(), action);
  try {
    window.localStorage.setItem(storageKey, serialize(state));
    saveFailed = false;
  } catch {
    // Full or blocked storage: the change still shows for this visit.
    saveFailed = true;
  }
  emit();
}

/** The current state, outside React (for async flows). */
export function getState() {
  return read();
}

/** Whether the last change couldn't be saved, e.g. because storage is full. */
export function lastSaveFailed() {
  return saveFailed;
}

/** The tracker's state (`null` while the page loads it) and the function that changes it. */
export function useTracker() {
  const current = useSyncExternalStore(subscribe, read, () => null);
  return { state: current, dispatch };
}
