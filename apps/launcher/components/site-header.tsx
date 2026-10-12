import { LayoutGrid } from "@stefan-florescu/icons";
import { Navbar, NavbarActions, NavbarBrand } from "@stefan-florescu/ui";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <Navbar position="sticky">
      <NavbarBrand href="/" name="Launcher" logo={<LayoutGrid aria-hidden />} />
      <NavbarActions>
        <ThemeToggle />
      </NavbarActions>
    </Navbar>
  );
}
