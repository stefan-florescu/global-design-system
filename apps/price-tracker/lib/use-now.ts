"use client";

import { useSyncExternalStore } from "react";

/*
 * The current time for "checked 5 minutes ago" labels and chart ranges, updated every minute.
 * Reading the clock through a store keeps render pure (React Compiler).
 */

const minute = 60_000;
let now = 0;
const listeners = new Set<() => void>();
let timer: number | undefined;

function tick() {
  now = Date.now();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) timer = window.setInterval(tick, minute);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.clearInterval(timer);
  };
}

function read() {
  // Fresh on first read and after a minute without subscribers.
  if (Date.now() - now >= minute) now = Date.now();
  return now;
}

/** Milliseconds since the epoch, refreshed every minute; 0 while rendering on the server. */
export function useNow() {
  return useSyncExternalStore(subscribe, read, () => 0);
}
