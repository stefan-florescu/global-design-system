import type { Metadata } from "next";
import Link from "next/link";

import { H2 } from "@/components/heading";
import { PageHeader } from "@/components/page-header";
import { sidebarNav } from "@/lib/navigation";

const DESCRIPTION =
  "Foundations and accessible, token-driven React components. Pick a page to see guidance, live examples and API.";

export const metadata: Metadata = { title: "Components", description: DESCRIPTION };

export default function ComponentsPage() {
  return (
    <>
      <PageHeader title="Components" description={DESCRIPTION} />
      {sidebarNav.map((section) => (
        <section key={section.title}>
          <H2 id={section.title.toLowerCase()}>{section.title}</H2>
          <div className="card-grid">
            {section.items.map((item) => (
              <Link key={item.href} className="doc-card" href={item.href}>
                <span className="doc-card__title">{item.title}</span>
                {item.description ? (
                  <span className="doc-card__text">{item.description}</span>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
