"use client";

import { ChevronDown } from "@stefan-florescu/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { sidebarNav, type NavSection } from "@/lib/navigation";

function SidebarSection({ section, onNavigate }: { section: NavSection; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="sidebar__section">
      <button
        className="sidebar__heading"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        <span>{section.title}</span>
        <ChevronDown aria-hidden className="sidebar__heading-chevron" size={14} />
      </button>
      <ul className="sidebar__list">
        {section.items.map((item) => (
          <li key={item.href}>
            <Link
              className="sidebar__link"
              href={item.href}
              onClick={onNavigate}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span>{item.title}</span>
              {item.label ? (
                <span
                  className={`sidebar__tag sidebar__tag--${item.label === "New" ? "new" : "wip"}`}
                >
                  {item.label}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Collapsible navigation sections with a guide rail and active indicator. */
export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Documentation">
      {sidebarNav.map((section) => (
        <SidebarSection key={section.title} section={section} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}
