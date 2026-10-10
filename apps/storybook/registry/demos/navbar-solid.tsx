import { Layers } from "@stefan-florescu/icons";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "@stefan-florescu/ui";

export default function NavbarSolid() {
  return (
    <Navbar variant="solid">
      <NavbarBrand href="#solid-background" name="Stefan DS" logo={<Layers aria-hidden />} />
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#solid-background" active>
          Home
        </NavbarLink>
        <NavbarLink href="#solid-background">About</NavbarLink>
        <NavbarLink href="#solid-background">Services</NavbarLink>
        <NavbarLink href="#solid-background">Pricing</NavbarLink>
        <NavbarLink href="#solid-background">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
