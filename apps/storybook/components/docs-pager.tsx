"use client";

import { ChevronLeft, ChevronRight } from "@stefan-florescu/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsPages } from "@/lib/navigation";

const linkClass =
  "inline-flex h-9 items-center gap-1.5 rounded-md border bg-surface px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none";

export function DocsPager() {
  const pathname = usePathname();
  const index = docsPages.findIndex((page) => page.href === pathname);
  if (index === -1) return null;

  const prev = docsPages[index - 1];
  const next = docsPages[index + 1];

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-between border-t pt-6">
      {prev ? (
        <Link href={prev.href} className={linkClass}>
          <ChevronLeft aria-hidden className="size-4" />
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className={linkClass}>
          {next.title}
          <ChevronRight aria-hidden className="size-4" />
        </Link>
      ) : null}
    </nav>
  );
}
