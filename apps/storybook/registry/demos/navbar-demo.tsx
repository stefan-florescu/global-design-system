import { Layers } from "@stefan-florescu/icons";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "@stefan-florescu/ui";

export default function NavbarDemo() {
  return (
    <Navbar>
      <NavbarBrand href="#default-navbar" name="Stefan DS" logo={<Layers aria-hidden />} />
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#default-navbar" active>
          Home
        </NavbarLink>
        <NavbarLink href="#default-navbar">About</NavbarLink>
        <NavbarLink href="#default-navbar">Services</NavbarLink>
        <NavbarLink href="#default-navbar">Pricing</NavbarLink>
        <NavbarLink href="#default-navbar">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
