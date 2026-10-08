"use client";

import { ArrowUp, SquarePen } from "@stefan-florescu/icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site";

type Heading = { id: string; text: string; level: 2 | 3 };
type Group = Heading & { children: Heading[] };

/** Source file of the current page, for the "Edit this page" link. */
function editUrl(pathname: string) {
  const page = pathname === "/components" ? "components/page.tsx" : `${pathname.slice(1)}/page.tsx`;
  return `${siteConfig.links.github}/edit/main/apps/storybook/app/(docs)/${page}`;
}

/**
 * "On this page" — built from the page's h2/h3 headings, with the heading nearest the top
 * of the viewport marked active (scroll spy).
 */
export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    let elements: HTMLElement[] = [];

    const update = () => {
      const offset = 120; // sticky header + breathing room
      let current = elements[0];
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= offset) current = el;
        else break;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (atBottom) current = elements[elements.length - 1];
      setActiveId(current?.id);
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        update();
        queued = false;
      });
    };

    const frame = requestAnimationFrame(() => {
      elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-docs-content] :is(h2, h3)[id]:not([data-toc-skip])",
        ),
      );
      setHeadings(
        elements.map((el) => ({
          id: el.id,
          text: el.dataset.tocLabel ?? el.textContent?.trim() ?? "",
          level: el.tagName === "H3" ? 3 : 2,
        })),
      );
      update();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  if (headings.length === 0) return null;

  // Nest h3s under the preceding h2.
  const groups: Group[] = [];
  for (const heading of headings) {
    const parent = groups[groups.length - 1];
    if (heading.level === 3 && parent) parent.children.push(heading);
    else groups.push({ ...heading, children: [] });
  }

  const link = (heading: Heading) => (
    <a
      className="toc__link"
      href={`#${heading.id}`}
      data-active={activeId === heading.id}
      aria-current={activeId === heading.id ? "location" : undefined}
    >
      {heading.text}
    </a>
  );

  return (
    <>
      <p className="toc__title">On this page</p>
      <ul className="toc__list">
        {groups.map((group) => (
          <li key={group.id}>
            {link(group)}
            {group.children.length ? (
              <ul className="toc__list">
                {group.children.map((child) => (
                  <li key={child.id}>{link(child)}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="toc__footer">
        <a href={editUrl(pathname)}>
          <SquarePen aria-hidden size={14} /> Edit this page
        </a>
        <a href="#main-content">
          <ArrowUp aria-hidden size={14} /> Back to top
        </a>
      </div>
    </>
  );
}
