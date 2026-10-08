/**
 * Single source of truth for site navigation. Drives the sidebar, the mobile
 * menu, the search palette and the previous/next pager.
 */
export type NavItem = {
  title: string;
  href: string;
  /** Optional status label shown next to the item. */
  label?: "New" | "Soon";
  /** One line shown on overview cards. */
  description?: string;
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
      {
        title: "Color",
        description: "Primitive scales and the semantic colour layer for light and dark.",
        href: "/foundation/color",
      },
      {
        title: "Typography",
        description: "Families, the type scale and the size–leading–tracking pairs.",
        href: "/foundation/typography",
      },
      {
        title: "Spacing & layout",
        description: "The 4px spacing scale, layout grid, breakpoints and containers.",
        href: "/foundation/spacing-and-layout",
      },
      {
        title: "Border & radius",
        description: "Border widths, styles and the radius scale.",
        href: "/foundation/border-and-radius",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Accordion",
        description: "Stacked headings that each reveal a section of content.",
        href: "/components/accordion",
      },
      {
        title: "Alert",
        description: "Short, important messages: information, success, warnings and errors.",
        href: "/components/alert",
      },
      {
        title: "Avatar",
        description:
          "Images, initials or placeholders that represent people, with presence status.",
        href: "/components/avatar",
      },
      {
        title: "Badge",
        description: "Small labels for statuses, counts and categories, including removable chips.",
        href: "/components/badge",
      },
      {
        title: "Banner",
        description: "Site-wide announcements pinned to the top or bottom of the page.",
        href: "/components/banner",
      },
      {
        title: "Bottom Navigation",
        description: "A bar of top-level destinations at the bottom of mobile screens.",
        href: "/components/bottom-navigation",
      },
      {
        title: "Breadcrumb",
        description: "Shows where the current page sits in the site hierarchy.",
        href: "/components/breadcrumb",
      },
      {
        title: "Button",
        description: "Displays a button or a component that looks like a button.",
        href: "/components/button",
      },
    ],
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
