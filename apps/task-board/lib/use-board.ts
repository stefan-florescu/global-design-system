"use client";

import { useSyncExternalStore } from "react";

import { boardReducer, parseTasks, sampleTasks, type BoardAction, type Task } from "./board";

const storageKey = "task-board:tasks";

/*
 * The board is saved in this browser's localStorage: the app is a static site with no server.
 * Other tabs pick up changes through the `storage` event.
 */
let tasks: Task[] | null = null;
const listeners = new Set<() => void>();

function read() {
  if (tasks === null) {
    try {
      tasks = parseTasks(window.localStorage.getItem(storageKey)) ?? sampleTasks;
    } catch {
      // Storage can be blocked (private mode, site settings): the board still works for the visit.
      tasks = sampleTasks;
    }
  }
  return tasks;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== storageKey) return;
  tasks = parseTasks(event.newValue) ?? sampleTasks;
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

function dispatch(action: BoardAction) {
  tasks = boardReducer(read(), action);
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch {
    // Not saved, but the change still shows.
  }
  emit();
}

/** The board's tasks (`null` while the page loads them) and the function that changes them. */
export function useBoard() {
  const current = useSyncExternalStore(subscribe, read, () => null);
  return { tasks: current, dispatch };
}
