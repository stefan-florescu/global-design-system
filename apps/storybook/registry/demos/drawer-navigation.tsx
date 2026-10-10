import {
  ChartPie,
  Columns3,
  Inbox,
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
  DrawerTitle,
  DrawerTrigger,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "@stefan-florescu/ui";

export default function DrawerNavigation() {
  return (
    <Drawer>
      <DrawerTrigger>Show navigation</DrawerTrigger>
      <DrawerContent className="w-80">
        <DrawerHeader className="mb-0">
          <DrawerTitle className="text-heading font-semibold">Menu</DrawerTitle>
          <DrawerClose label="Close menu" />
        </DrawerHeader>
        {/* The Sidebar component's items: links, a multi-level group, a tag and a count. */}
        <SidebarItems aria-label="Main" className="py-5">
          <SidebarItemGroup>
            <SidebarItem href="#drawer-navigation" icon={<ChartPie aria-hidden />}>
              Dashboard
            </SidebarItem>
            <SidebarCollapse label="E-commerce" icon={<ShoppingCart aria-hidden />}>
              <SidebarItem href="#drawer-navigation">Products</SidebarItem>
              <SidebarItem href="#drawer-navigation">Billing</SidebarItem>
              <SidebarItem href="#drawer-navigation">Invoice</SidebarItem>
            </SidebarCollapse>
            <SidebarItem href="#drawer-navigation" icon={<Columns3 aria-hidden />} label="Pro">
              Kanban
            </SidebarItem>
            <SidebarItem
              href="#drawer-navigation"
              icon={<Inbox aria-hidden />}
              count={
                <>
                  2<span className="sr-only"> unread messages</span>
                </>
              }
            >
              Inbox
            </SidebarItem>
            <SidebarItem href="#drawer-navigation" icon={<Users aria-hidden />}>
              Users
            </SidebarItem>
            <SidebarItem href="#drawer-navigation" icon={<ShoppingBag aria-hidden />}>
              Products
            </SidebarItem>
            <SidebarItem href="#drawer-navigation" icon={<LogIn aria-hidden />}>
              Sign In
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </DrawerContent>
    </Drawer>
  );
}
