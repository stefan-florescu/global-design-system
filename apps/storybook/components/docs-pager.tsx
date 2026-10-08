"use client";

import { ChevronLeft, ChevronRight } from "@stefan-florescu/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsPages } from "@/lib/navigation";

export function DocsPager() {
  const pathname = usePathname();
  const index = docsPages.findIndex((page) => page.href === pathname);
  if (index === -1) return null;

  const prev = docsPages[index - 1];
  const next = docsPages[index + 1];

  return (
    <nav className="pager" aria-label="Pagination">
      {prev ? (
        <Link className="pager__link" href={prev.href}>
          <span className="pager__dir">
            <ChevronLeft aria-hidden size={14} /> Previous
          </span>
          <span className="pager__title">{prev.title}</span>
        </Link>
      ) : null}
      {next ? (
        <Link className="pager__link pager__link--next" href={next.href}>
          <span className="pager__dir">
            Next <ChevronRight aria-hidden size={14} />
          </span>
          <span className="pager__title">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
