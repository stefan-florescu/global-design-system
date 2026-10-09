import { Layers } from "@stefan-florescu/icons";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink } from "@stefan-florescu/ui";

export default function NavbarSubmenu() {
  return (
    <header className="w-full">
      <Navbar aria-label="Contact" border={false}>
        <NavbarBrand href="#navbar-with-submenu" name="Stefan DS" logo={<Layers aria-hidden />} />
        <NavbarCollapse variant="inline" listClassName="gap-x-6">
          <NavbarLink href="tel:5541251234" className="text-body font-normal">
            (555) 412-1234
          </NavbarLink>
          <NavbarLink href="#navbar-with-submenu" className="text-fg-brand">
            Login
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <Navbar variant="solid" size="sm" className="border-y">
        <NavbarCollapse variant="inline">
          <NavbarLink href="#navbar-with-submenu" active>
            Home
          </NavbarLink>
          <NavbarLink href="#navbar-with-submenu">Company</NavbarLink>
          <NavbarLink href="#navbar-with-submenu">Team</NavbarLink>
          <NavbarLink href="#navbar-with-submenu">Features</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </header>
  );
}
