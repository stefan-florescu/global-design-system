import {
  ChartPie,
  Columns3,
  Inbox,
  Layers,
  LogIn,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "@stefan-florescu/icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "@stefan-florescu/ui";

export default function SidebarOffCanvas() {
  return (
    <div className="text-center">
      <Drawer>
        <DrawerTrigger>Show navigation</DrawerTrigger>
        {/* The sidebar's items inside a Drawer: a modal dialog that slides in from the start edge. */}
        <DrawerContent aria-label="Navigation" className="w-64 text-start">
          <DrawerHeader className="mb-0">
            <SidebarLogo
              href="#off-canvas-sidebar"
              name="Stefan DS"
              logo={<Layers aria-hidden />}
              className="mb-0 ps-0"
            />
            <DrawerClose label="Close menu" />
          </DrawerHeader>
          <SidebarItems className="py-5">
            <SidebarItemGroup>
              <SidebarItem href="#off-canvas-sidebar" icon={<ChartPie aria-hidden />}>
                Dashboard
              </SidebarItem>
              <SidebarCollapse label="E-commerce" icon={<ShoppingCart aria-hidden />}>
                <SidebarItem href="#off-canvas-sidebar">Products</SidebarItem>
                <SidebarItem href="#off-canvas-sidebar">Billing</SidebarItem>
                <SidebarItem href="#off-canvas-sidebar">Invoice</SidebarItem>
              </SidebarCollapse>
              <SidebarItem href="#off-canvas-sidebar" icon={<Columns3 aria-hidden />} label="Pro">
                Kanban
              </SidebarItem>
              <SidebarItem href="#off-canvas-sidebar" icon={<Inbox aria-hidden />} count={2}>
                Inbox
              </SidebarItem>
              <SidebarItem href="#off-canvas-sidebar" icon={<Users aria-hidden />}>
                Users
              </SidebarItem>
              <SidebarItem href="#off-canvas-sidebar" icon={<ShoppingBag aria-hidden />}>
                Products
              </SidebarItem>
              <SidebarItem href="#off-canvas-sidebar" icon={<LogIn aria-hidden />}>
                Sign In
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
