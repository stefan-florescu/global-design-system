import type { ReactNode } from "react";

import { DocsPager } from "@/components/docs-pager";
import { DocsSidebar } from "@/components/docs-sidebar";
import { TableOfContents } from "@/components/table-of-contents";

/**
 * Three-column docs layout: navigation · page content · "On this page".
 * Markup and classes follow the documentation template (see app/docs.css).
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-container">
      <div className="layout">
        <aside className="sidebar" aria-label="Documentation navigation">
          <DocsSidebar />
        </aside>

        <main className="main" id="main-content" tabIndex={-1}>
          <article className="content prose" data-docs-content>
            {children}
          </article>
          <DocsPager />
        </main>

        <aside className="toc" aria-label="On this page">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
}
