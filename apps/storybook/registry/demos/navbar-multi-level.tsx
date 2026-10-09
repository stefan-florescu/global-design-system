import { Layers } from "@stefan-florescu/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSub,
  DropdownSubMenu,
  DropdownSubTrigger,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarDropdownTrigger,
  NavbarLink,
  NavbarToggle,
} from "@stefan-florescu/ui";

export default function NavbarMultiLevel() {
  return (
    <div className="min-h-80 w-full">
      <Navbar>
        <NavbarBrand href="#multi-level-dropdown" name="Stefan DS" logo={<Layers aria-hidden />} />
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="#multi-level-dropdown" active>
            Home
          </NavbarLink>
          <li>
            {/* Nested levels need a menu: arrow keys move between items and into sub-menus. */}
            <Dropdown>
              <NavbarDropdownTrigger>Dropdown</NavbarDropdownTrigger>
              <DropdownMenu>
                <DropdownItem href="#multi-level-dropdown">Dashboard</DropdownItem>
                <DropdownSub>
                  <DropdownSubTrigger>Dropdown</DropdownSubTrigger>
                  <DropdownSubMenu>
                    <DropdownItem href="#multi-level-dropdown">Overview</DropdownItem>
                    <DropdownItem href="#multi-level-dropdown">My downloads</DropdownItem>
                    <DropdownItem href="#multi-level-dropdown">Billing</DropdownItem>
                    <DropdownItem href="#multi-level-dropdown">Rewards</DropdownItem>
                  </DropdownSubMenu>
                </DropdownSub>
                <DropdownItem href="#multi-level-dropdown">Earnings</DropdownItem>
                <DropdownItem href="#multi-level-dropdown">Sign out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <NavbarLink href="#multi-level-dropdown">Services</NavbarLink>
          <NavbarLink href="#multi-level-dropdown">Pricing</NavbarLink>
          <NavbarLink href="#multi-level-dropdown">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
