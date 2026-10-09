import {
  Book,
  ChartPie,
  Columns3,
  Inbox,
  LifeBuoy,
  LogIn,
  Plus,
  Rocket,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "@stefan-florescu/icons";
import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "@stefan-florescu/ui";

export default function SidebarSeparator() {
  return (
    // The frame stands in for the browser window, so the fixed sidebar stays inside it.
    <div className="bg-neutral-primary relative h-160 w-full transform-gpu overflow-hidden">
      <div className="h-full overflow-y-auto">
        <Sidebar>
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem href="#content-separator" icon={<ChartPie aria-hidden />}>
                Dashboard
              </SidebarItem>
              <SidebarCollapse label="E-commerce" icon={<ShoppingCart aria-hidden />}>
                <SidebarItem href="#content-separator">Products</SidebarItem>
                <SidebarItem href="#content-separator">Billing</SidebarItem>
                <SidebarItem href="#content-separator">Invoice</SidebarItem>
              </SidebarCollapse>
              <SidebarItem href="#content-separator" icon={<Columns3 aria-hidden />} label="Pro">
                Kanban
              </SidebarItem>
              <SidebarItem href="#content-separator" icon={<Inbox aria-hidden />} count={2}>
                Inbox
              </SidebarItem>
              <SidebarItem href="#content-separator" icon={<Users aria-hidden />}>
                Users
              </SidebarItem>
              <SidebarItem href="#content-separator" icon={<ShoppingBag aria-hidden />}>
                Products
              </SidebarItem>
              <SidebarItem href="#content-separator" icon={<LogIn aria-hidden />}>
                Sign In
              </SidebarItem>
            </SidebarItemGroup>
            <SidebarItemGroup>
              <SidebarItem href="#content-separator" icon={<Book aria-hidden />}>
                Documentation
              </SidebarItem>
              <SidebarItem href="#content-separator" icon={<LifeBuoy aria-hidden />}>
                Support
              </SidebarItem>
              <SidebarItem href="#content-separator" icon={<Rocket aria-hidden />}>
                PRO version
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
        <main className="p-4 sm:ms-64">
          <PagePlaceholder />
        </main>
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
