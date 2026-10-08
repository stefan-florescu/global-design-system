import { ArrowRight } from "@stefan-florescu/icons";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { sidebarNav } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Components",
  description: "Foundations and accessible React components of the Stefan Design System.",
};

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Components"
        description="Foundations and accessible, token-driven React components. Pick a page to see guidance, live examples and API."
      />
      {sidebarNav.map((section) => (
        <section key={section.title} className="mt-10 first-of-type:mt-0">
          <h2
            id={section.title.toLowerCase()}
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
          >
            {section.title}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group bg-surface hover:bg-accent focus-visible:ring-ring/50 flex items-center justify-between rounded-lg border p-4 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                >
                  {item.title}
                  <ArrowRight
                    aria-hidden
                    className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
