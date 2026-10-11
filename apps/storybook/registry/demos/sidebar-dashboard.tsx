import {
  ChartPie,
  Book,
  Columns3,
  Inbox,
  Layers,
  LifeBuoy,
  Plus,
  ShoppingCart,
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
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarProvider,
  SidebarToggle,
} from "@stefan-florescu/ui";

export default function SidebarDashboard() {
  return (
    // An app shell: a fixed navbar, the sidebar under it (a drawer below `md`) and the page.
    <div className="bg-neutral-primary relative h-160 w-full transform-gpu overflow-hidden">
      <div className="h-full overflow-y-auto">
        {/* The provider lets the hamburger in the navbar open the sidebar's drawer. */}
        <SidebarProvider breakpoint="md">
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
                href="#dashboard-layout"
                name="Stefan DS"
                logo={<Layers aria-hidden />}
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
          {/* `pt-14` starts the panel under the fixed navbar. */}
          <Sidebar className="pt-14">
            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem href="#dashboard-layout" icon={<ChartPie aria-hidden />}>
                  Overview
                </SidebarItem>
                <SidebarCollapse label="E-commerce" icon={<ShoppingCart aria-hidden />} defaultOpen>
                  <SidebarItem href="#dashboard-layout" active>
                    Products
                  </SidebarItem>
                  <SidebarItem href="#dashboard-layout">Billing</SidebarItem>
                  <SidebarItem href="#dashboard-layout">Invoice</SidebarItem>
                </SidebarCollapse>
                <SidebarItem href="#dashboard-layout" icon={<Inbox aria-hidden />} count={2}>
                  Inbox
                </SidebarItem>
                <SidebarItem href="#dashboard-layout" icon={<Users aria-hidden />}>
                  Users
                </SidebarItem>
                <SidebarItem href="#dashboard-layout" icon={<Columns3 aria-hidden />} label="Pro">
                  Kanban
                </SidebarItem>
              </SidebarItemGroup>
              <SidebarItemGroup>
                <SidebarItem href="#dashboard-layout" icon={<Book aria-hidden />}>
                  Documentation
                </SidebarItem>
                <SidebarItem href="#dashboard-layout" icon={<LifeBuoy aria-hidden />}>
                  Support
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
          <main className="mt-14 p-4 md:ms-64">
            <h1 className="text-heading mb-4 text-xl font-semibold">Products</h1>
            <PagePlaceholder />
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}

/** A dashed page area with empty cards. */
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
