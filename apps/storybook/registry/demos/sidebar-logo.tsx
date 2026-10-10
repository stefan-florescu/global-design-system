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
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "@stefan-florescu/ui";

export default function SidebarLogoBranding() {
  return (
    // The frame stands in for the browser window, so the fixed sidebar stays inside it.
    <div className="bg-neutral-primary relative h-160 w-full transform-gpu overflow-hidden">
      <div className="h-full overflow-y-auto">
        <Sidebar>
          <SidebarLogo href="#logo-branding" name="Stefan DS" logo={<Layers aria-hidden />} />
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem href="#logo-branding" icon={<ChartPie aria-hidden />}>
                Dashboard
              </SidebarItem>
              <SidebarItem href="#logo-branding" icon={<Columns3 aria-hidden />} label="Pro">
                Kanban
              </SidebarItem>
              <SidebarItem href="#logo-branding" icon={<Inbox aria-hidden />} count={2}>
                Inbox
              </SidebarItem>
              <SidebarItem href="#logo-branding" icon={<Users aria-hidden />}>
                Users
              </SidebarItem>
              <SidebarItem href="#logo-branding" icon={<ShoppingBag aria-hidden />}>
                Products
              </SidebarItem>
              <SidebarItem href="#logo-branding" icon={<LogIn aria-hidden />}>
                Sign In
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
