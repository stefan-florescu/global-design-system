"use client";

import { SkeletonBlock } from "@stefan-florescu/ui";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { useSession } from "@/lib/session";

import { Landing } from "./landing";
import { PageShell } from "./page-shell";

/** Pages anyone can open; the rest need an account or the demo (plan T2.4). */
const publicPaths = ["/sign-in", "/reset-password"];

/** Shows the landing page to visitors who haven't signed in or opened the demo. */
export function SessionGate({ children }: { children: ReactNode }) {
  const session = useSession();
  const pathname = usePathname();
  if (publicPaths.some((path) => pathname.startsWith(path))) return children;
  if (session.mode === "loading") {
    return (
      <PageShell>
        <SkeletonBlock className="h-40" aria-busy="true" aria-label="Loading" />
      </PageShell>
    );
  }
  if (session.mode === "signed-out") return <Landing />;
  return children;
}
