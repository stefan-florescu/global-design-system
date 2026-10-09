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
        description: "The 4px spacing scale, layout grid, breakpoints, containers and layers.",
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
      {
        title: "Button Group",
        description: "Joins related buttons or links into a single control.",
        href: "/components/button-group",
      },
      {
        title: "Card",
        description: "A surface that groups content and actions about one subject.",
        href: "/components/card",
      },
      {
        title: "Carousel",
        description: "Cycles through slides of images or featured content.",
        href: "/components/carousel",
      },
      {
        title: "Chat Bubble",
        description: "One message in a conversation, with sender, time and status.",
        href: "/components/chat-bubble",
      },
      {
        title: "Clipboard",
        description: "A button that copies a value and confirms it.",
        href: "/components/clipboard",
      },
      {
        title: "Datepicker",
        description: "Pick a day or a range from a calendar, inline or in a popover.",
        href: "/components/datepicker",
      },
      {
        title: "Drawer",
        description: "A panel that slides in from an edge of the screen over the page.",
        href: "/components/drawer",
      },
      {
        title: "Dropdown",
        description: "A menu of actions or options that opens from a button.",
        href: "/components/dropdown",
      },
      {
        title: "Footer",
        description: "The closing section of a page: links, copyright and social icons.",
        href: "/components/footer",
      },
      {
        title: "Indicators",
        description: "Small dots and counters that show status or new activity on another element.",
        href: "/components/indicators",
      },
      {
        title: "KBD",
        description: "A key or keyboard shortcut, shown the way it looks on a keyboard.",
        href: "/components/kbd",
      },
      {
        title: "Mega Menu",
        description: "A wide navigation panel with grouped links, opened from a navbar item.",
        href: "/components/mega-menu",
      },
      {
        title: "Modal",
        description: "A dialog over the page that asks for a decision or shows focused content.",
        href: "/components/modal",
      },
    ],
  },
  {
    title: "Forms",
    items: [
      {
        title: "Input Field",
        description: "Single-line text fields with icons, addons and validation.",
        href: "/forms/input-field",
      },
      {
        title: "File Input",
        description: "File fields and a drag-and-drop dropzone.",
        href: "/forms/file-input",
      },
      {
        title: "Search Input",
        description: "Search fields with an icon and a submit button.",
        href: "/forms/search-input",
      },
      {
        title: "Number Input",
        description: "Number fields with optional stepper buttons.",
        href: "/forms/number-input",
      },
      {
        title: "Phone Input",
        description: "A country code joined to a phone number field.",
        href: "/forms/phone-input",
      },
      {
        title: "Select",
        description: "Native selects with list and underline styles.",
        href: "/forms/select",
      },
      {
        title: "Textarea",
        description: "Multi-line fields for comments and messages.",
        href: "/forms/textarea",
      },
      {
        title: "Timepicker",
        description: "Time fields with limits, ranges and time slots.",
        href: "/forms/timepicker",
      },
      {
        title: "Checkbox",
        description: "Checkboxes with labels, descriptions and cards.",
        href: "/forms/checkbox",
      },
      {
        title: "Radio",
        description: "Radio groups with labels, descriptions and cards.",
        href: "/forms/radio",
      },
      {
        title: "Toggle",
        description: "On/off switches for settings that apply at once.",
        href: "/forms/toggle",
      },
      {
        title: "Range",
        description: "Sliders for picking a value from a range.",
        href: "/forms/range",
      },
    ],
  },
];

/** Flat, ordered list of every documentation page (used by search & pager). */
export const docsPages: NavItem[] = sidebarNav.flatMap((section) => section.items);

/** Which top-level menu item is active for a given path. */
export function activeMainNav(pathname: string): string | undefined {
  if (pathname.startsWith("/changelog")) return "/changelog";
  if (["/components", "/foundation", "/forms"].some((prefix) => pathname.startsWith(prefix))) {
    return "/components";
  }
  return undefined;
}
