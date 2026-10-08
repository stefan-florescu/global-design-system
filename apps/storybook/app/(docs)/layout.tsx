import type { ReactNode } from "react";

import { DocsPager } from "@/components/docs-pager";
import { DocsSidebar } from "@/components/docs-sidebar";
import { TableOfContents } from "@/components/table-of-contents";

/**
 * Three-column docs layout:
 *   sidebar (md+)  ·  page content  ·  "On this page" anchors (xl+)
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[88rem] flex-1 px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 md:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto border-r py-6 pr-4 md:block">
        <DocsSidebar />
      </aside>

      <main
        id="main-content"
        tabIndex={-1}
        className="relative py-6 outline-none lg:py-8 xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-10"
      >
        <div data-docs-content className="mx-auto w-full max-w-3xl min-w-0">
          {children}
          <DocsPager />
        </div>
        <div className="hidden xl:block">
          <div className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto">
            <TableOfContents />
          </div>
        </div>
      </main>
    </div>
  );
}
