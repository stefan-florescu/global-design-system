/**
 * Single source of truth for site navigation. Drives the sidebar, the mobile
 * menu, the search palette and the previous/next pager.
 */
export type NavItem = {
  title: string;
  href: string;
  /** Optional status label shown next to the item. */
  label?: "New" | "Soon";
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const mainNav: NavItem[] = [
  { title: "Components", href: "/components" },
  { title: "Changelog", href: "/changelog" },
];

export const sidebarNav: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { title: "Color", href: "/foundation/color" },
      { title: "Typography", href: "/foundation/typography" },
      { title: "Spacing & Layout", href: "/foundation/spacing-and-layout" },
      { title: "Border & Radius", href: "/foundation/border-and-radius" },
    ],
  },
  {
    title: "Components",
    items: [{ title: "Button", href: "/components/button" }],
  },
];

/** Flat, ordered list of every documentation page (used by search & pager). */
export const docsPages: NavItem[] = sidebarNav.flatMap((section) => section.items);

/** Which top-level menu item is active for a given path. */
export function activeMainNav(pathname: string): string | undefined {
  if (pathname.startsWith("/changelog")) return "/changelog";
  if (pathname.startsWith("/components") || pathname.startsWith("/foundation")) {
    return "/components";
  }
  return undefined;
}
