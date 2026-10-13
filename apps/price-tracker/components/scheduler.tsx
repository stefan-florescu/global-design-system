"use client";

import { useEffect } from "react";

import { checkDueProducts } from "@/lib/actions";

const everyTenMinutes = 10 * 60_000;

/**
 * Runs due price checks while the app is open (plan T3.9). The scraper worker takes this over
 * once it is deployed, so prices stay fresh with the app closed too.
 */
export function Scheduler() {
  useEffect(() => {
    void checkDueProducts();
    const timer = window.setInterval(() => void checkDueProducts(), everyTenMinutes);
    return () => window.clearInterval(timer);
  }, []);
  return null;
}
