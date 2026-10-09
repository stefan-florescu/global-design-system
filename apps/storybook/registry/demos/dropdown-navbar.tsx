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

export default function DropdownNavbar() {
  return (
    <Navbar border={false} size="sm">
      <NavbarBrand href="#dropdown-navbar" name="Company" />
      <NavbarToggle />
      <NavbarCollapse listClassName="gap-1 md:text-sm">
        <NavbarLink href="#dropdown-navbar" active>
          Home
        </NavbarLink>
        <li>
          {/* Site navigation: a disclosure of links, not an ARIA menu. */}
          <Dropdown placement="bottom">
            <NavbarDropdownTrigger className="text-body">Dropdown</NavbarDropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#dropdown-navbar">Dashboard</DropdownItem>
              <DropdownItem href="#dropdown-navbar">Settings</DropdownItem>
              <DropdownItem href="#dropdown-navbar">Earnings</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </li>
        <NavbarLink href="#dropdown-navbar" className="text-body">
          Services
        </NavbarLink>
        <NavbarLink href="#dropdown-navbar" className="text-body">
          Pricing
        </NavbarLink>
        <NavbarLink href="#dropdown-navbar" className="text-body">
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
