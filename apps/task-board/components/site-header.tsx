import { Columns3, LayoutGrid } from "@stefan-florescu/icons";
import { Navbar, NavbarActions, NavbarBrand, buttonVariants } from "@stefan-florescu/ui";

import { basePath } from "@/lib/base-path";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <Navbar position="sticky">
      {/* A plain <a>, so the base path is written out (see lib/base-path.ts). */}
      <NavbarBrand href={basePath} name="Task Board" logo={<Columns3 aria-hidden />} />
      <NavbarActions>
        {/* The launcher lives at the site root, outside this app's base path, so next/link (which
            adds the base path) can't link to it. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <LayoutGrid aria-hidden />
          All apps
        </a>
        <ThemeToggle />
      </NavbarActions>
    </Navbar>
  );
}
