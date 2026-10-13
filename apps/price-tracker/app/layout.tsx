import "@fontsource-variable/inter/wght.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Scheduler } from "@/components/scheduler";
import { SessionGate } from "@/components/session-gate";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Price Tracker", template: "%s · Price Tracker" },
  description: "Track a product's price across stores and get alerted when it drops.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh">
        <ThemeProvider>
          <a
            href="#main-content"
            className="rounded-base border-default bg-neutral-primary-medium text-heading focus-visible:z-skip-link sr-only border text-sm font-medium shadow-lg focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:px-3.5 focus-visible:py-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <Scheduler />
          <SessionGate>{children}</SessionGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
