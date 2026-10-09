import { Layers } from "@stefan-florescu/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarDropdownTrigger,
  NavbarLink,
  NavbarToggle,
} from "@stefan-florescu/ui";

export default function NavbarDropdown() {
  return (
    <div className="min-h-80 w-full">
      <Navbar border={false}>
        <NavbarBrand href="#navbar-with-dropdown" name="Stefan DS" logo={<Layers aria-hidden />} />
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="#navbar-with-dropdown" active>
            Home
          </NavbarLink>
          <li>
            {/* Site navigation: a disclosure of links, not an ARIA menu. */}
            <Dropdown>
              <NavbarDropdownTrigger>Dropdown</NavbarDropdownTrigger>
              <DropdownContent>
                <DropdownItem href="#navbar-with-dropdown">Dashboard</DropdownItem>
                <DropdownItem href="#navbar-with-dropdown">Settings</DropdownItem>
                <DropdownItem href="#navbar-with-dropdown">Earnings</DropdownItem>
                <DropdownItem href="#navbar-with-dropdown">Sign out</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </li>
          <NavbarLink href="#navbar-with-dropdown">Services</NavbarLink>
          <NavbarLink href="#navbar-with-dropdown">Pricing</NavbarLink>
          <NavbarLink href="#navbar-with-dropdown">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
