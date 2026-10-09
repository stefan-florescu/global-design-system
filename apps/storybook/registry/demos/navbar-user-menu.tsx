import { Layers } from "@stefan-florescu/icons";
import {
  Avatar,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@stefan-florescu/ui";

export default function NavbarUserMenu() {
  return (
    <div className="min-h-96 w-full">
      <Navbar>
        <NavbarBrand href="#user-menu-dropdown" name="Stefan DS" logo={<Layers aria-hidden />} />
        <NavbarActions>
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="bg-neutral-primary focus:ring-neutral-tertiary focus-visible:outline-ring flex cursor-pointer rounded-full text-sm outline-hidden focus:ring-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
              >
                <span className="sr-only">Open user menu</span>
                <Avatar src="/avatars/5.svg" alt="" size="sm" />
              </button>
            </DropdownTrigger>
            <DropdownMenu className="p-0">
              <DropdownHeader className="border-default mb-0 block rounded-none border-b bg-transparent px-4 py-3">
                <span className="text-heading block font-medium">Joseph McFall</span>
                <span className="text-body block truncate font-normal">name@company.com</span>
              </DropdownHeader>
              <div className="p-2">
                <DropdownItem href="#user-menu-dropdown">Dashboard</DropdownItem>
                <DropdownItem href="#user-menu-dropdown">Settings</DropdownItem>
                <DropdownItem href="#user-menu-dropdown">Earnings</DropdownItem>
                <DropdownItem href="#user-menu-dropdown">Sign out</DropdownItem>
              </div>
            </DropdownMenu>
          </Dropdown>
          <NavbarToggle />
        </NavbarActions>
        <NavbarCollapse>
          <NavbarLink href="#user-menu-dropdown" active>
            Home
          </NavbarLink>
          <NavbarLink href="#user-menu-dropdown">About</NavbarLink>
          <NavbarLink href="#user-menu-dropdown">Services</NavbarLink>
          <NavbarLink href="#user-menu-dropdown">Pricing</NavbarLink>
          <NavbarLink href="#user-menu-dropdown">Contact</NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
