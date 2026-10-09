import {
  ChartPie,
  Columns3,
  Inbox,
  Layers,
  LogIn,
  Plus,
  ShoppingBag,
  Users,
} from "@stefan-florescu/icons";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarActions,
  NavbarBrand,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarProvider,
  SidebarToggle,
} from "@stefan-florescu/ui";

export default function SidebarNavbar() {
  return (
    // The frame stands in for the browser window, so the fixed bars stay inside it.
    <div className="bg-neutral-primary relative h-160 w-full transform-gpu overflow-hidden">
      <div className="h-full overflow-y-auto">
        {/* The provider lets the hamburger in the navbar open the sidebar's drawer. */}
        <SidebarProvider>
          <Navbar
            position="fixed"
            fluid
            size="sm"
            aria-label="Top"
            className="bg-neutral-primary-soft"
          >
            <div className="flex items-center gap-2">
              <SidebarToggle />
              <NavbarBrand
                href="#sidebar-with-navbar"
                name="Stefan DS"
                logo={<Layers aria-hidden />}
                className="md:me-24"
              />
            </div>
            <NavbarActions>
              <Dropdown placement="bottom-end">
                <DropdownTrigger asChild>
                  <button
                    type="button"
                    aria-label="User menu"
                    className="focus-visible:outline-ring flex cursor-pointer rounded-full outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
                  >
                    <Avatar src="/avatars/5.svg" alt="" size="sm" />
                  </button>
                </DropdownTrigger>
                <DropdownMenu className="w-44 p-0">
                  <div className="border-default-medium border-b px-4 py-3 text-sm">
                    <div className="text-heading font-medium">Neil Sims</div>
                    <div className="text-body truncate">neil.sims@example.com</div>
                  </div>
                  <div className="p-2">
                    <DropdownItem className="rounded">Dashboard</DropdownItem>
                    <DropdownItem className="rounded">Settings</DropdownItem>
                    <DropdownItem className="rounded">Earnings</DropdownItem>
                    <DropdownItem className="rounded">Sign out</DropdownItem>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </NavbarActions>
          </Navbar>
          {/* `pt-12` starts the items under the navbar, which covers the top of the sidebar. */}
          <Sidebar className="pt-12">
            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem href="#sidebar-with-navbar" icon={<ChartPie aria-hidden />}>
                  Dashboard
                </SidebarItem>
                <SidebarItem
                  href="#sidebar-with-navbar"
                  icon={<Columns3 aria-hidden />}
                  label="Pro"
                >
                  Kanban
                </SidebarItem>
                <SidebarItem href="#sidebar-with-navbar" icon={<Inbox aria-hidden />} count={2}>
                  Inbox
                </SidebarItem>
                <SidebarItem href="#sidebar-with-navbar" icon={<Users aria-hidden />}>
                  Users
                </SidebarItem>
                <SidebarItem href="#sidebar-with-navbar" icon={<ShoppingBag aria-hidden />}>
                  Products
                </SidebarItem>
                <SidebarItem href="#sidebar-with-navbar" icon={<LogIn aria-hidden />}>
                  Sign In
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
          <main className="mt-14 p-4 sm:ms-64">
            <PagePlaceholder />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}

/** Flowbite's dashed page area with empty cards. */
function PagePlaceholder() {
  const card = (height: "h-24" | "h-48", key?: number) => (
    <div
      key={key}
      className={`rounded-base bg-neutral-secondary-soft flex items-center justify-center ${height}`}
    >
      <Plus aria-hidden className="text-fg-disabled size-5" />
    </div>
  );
  return (
    <div className="border-default rounded-base space-y-4 border border-dashed p-4">
      <div className="grid grid-cols-3 gap-4">{[1, 2, 3].map((i) => card("h-24", i))}</div>
      {card("h-48")}
      <div className="grid grid-cols-2 gap-4">{[1, 2, 3, 4].map((i) => card("h-24", i))}</div>
      {card("h-48")}
      <div className="grid grid-cols-2 gap-4">{[1, 2, 3, 4].map((i) => card("h-24", i))}</div>
    </div>
  );
}
