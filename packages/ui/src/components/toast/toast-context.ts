"use client";

import { createContext } from "react";

/** Set by `ToastProvider` around each toast it shows, so the toast can remove itself. */
export const ToastEntryContext = createContext<{ dismiss: () => void } | null>(null);
