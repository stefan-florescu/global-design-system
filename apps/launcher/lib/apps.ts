import { SwatchBook, type LucideIcon } from "@stefan-florescu/icons";

export type LauncherApp = {
  /** Unique, kebab-case. */
  id: string;
  name: string;
  /** One sentence on what the app does. */
  description: string;
  /**
   * Where the app lives. Apps served under the launcher's domain use their path (see
   * `next.config.ts`); other websites use their full URL.
   */
  href: string;
  /** From @stefan-florescu/icons. */
  icon: LucideIcon;
  /** Shown as a badge while the app is not finished. */
  status?: "beta";
};

/** Every website the launcher lists, in display order. Add new apps here. */
export const apps: LauncherApp[] = [
  {
    id: "design-system",
    name: "Design System",
    description: "Tokens, themes and React components that every app is built with.",
    href: "/design-system",
    icon: SwatchBook,
  },
];
