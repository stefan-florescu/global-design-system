import { Layers } from "@stefan-florescu/icons";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "@stefan-florescu/ui";

export default function NavbarHamburger() {
  return (
    <Navbar variant="solid" expand="never">
      <NavbarBrand href="#hamburger-menu" name="Stefan DS" logo={<Layers aria-hidden />} />
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#hamburger-menu" active>
          Home
        </NavbarLink>
        <NavbarLink href="#hamburger-menu">Services</NavbarLink>
        <NavbarLink href="#hamburger-menu">Pricing</NavbarLink>
        <NavbarLink href="#hamburger-menu">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
