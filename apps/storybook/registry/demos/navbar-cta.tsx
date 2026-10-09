import { Layers } from "@stefan-florescu/icons";
import {
  Button,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@stefan-florescu/ui";

export default function NavbarCta() {
  return (
    <Navbar>
      <NavbarBrand href="#navbar-with-cta-button" name="Stefan DS" logo={<Layers aria-hidden />} />
      <NavbarActions>
        <Button size="sm">Get started</Button>
        <NavbarToggle />
      </NavbarActions>
      <NavbarCollapse>
        <NavbarLink href="#navbar-with-cta-button" active>
          Home
        </NavbarLink>
        <NavbarLink href="#navbar-with-cta-button">About</NavbarLink>
        <NavbarLink href="#navbar-with-cta-button">Services</NavbarLink>
        <NavbarLink href="#navbar-with-cta-button">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
