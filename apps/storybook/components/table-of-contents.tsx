"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * "On this page" — built from the h2/h3 headings of the current page so authors never
 * maintain it by hand. Highlights the section currently in view.
 */
export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    // Read headings after the new page has painted.
    const frame = requestAnimationFrame(() => {
      const elements = Array.from(
        document.querySelectorAll<HTMLHeadingElement>(
          "[data-docs-content] :is(h2, h3)[id]:not([data-toc-ignore])",
        ),
      );
      setHeadings(
        elements.map((el) => ({
          id: el.id,
          text: el.textContent ?? "",
          level: el.tagName === "H2" ? 2 : 3,
        })),
      );
      setActiveId(elements[0]?.id);

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((entry) => entry.isIntersecting);
          if (visible) setActiveId(visible.target.id);
        },
        { rootMargin: "-80px 0px -70% 0px" },
      );
      elements.forEach((el) => observer?.observe(el));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="flex flex-col gap-2">
      <p className="text-sm font-medium">On This Page</p>
      <ul className="flex flex-col gap-0.5 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={activeId === heading.id ? "location" : undefined}
              className={cn(
                "hover:text-foreground focus-visible:ring-ring/50 block rounded py-1 transition-colors focus-visible:ring-[3px] focus-visible:outline-none",
                heading.level === 3 && "pl-4",
                activeId === heading.id ? "text-foreground font-medium" : "text-muted-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
