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

export default function DrawerNoBackdrop() {
  return (
    <Drawer backdrop={false}>
      <DrawerTrigger>Show drawer without backdrop</DrawerTrigger>
      <DrawerContent className="w-80">
        <DrawerHeader className="mb-0">
          <DrawerTitle className="text-heading font-semibold">Menu</DrawerTitle>
          <DrawerClose label="Close menu" />
        </DrawerHeader>
        <SidebarItems aria-label="Main" className="py-5">
          <SidebarItemGroup>
            <SidebarItem href="/dashboard" icon={<ChartPie aria-hidden />}>
              Dashboard
            </SidebarItem>
            <SidebarCollapse label="E-commerce" icon={<ShoppingCart aria-hidden />}>
              <SidebarItem href="/products">Products</SidebarItem>
              <SidebarItem href="/billing">Billing</SidebarItem>
              <SidebarItem href="/invoices">Invoice</SidebarItem>
            </SidebarCollapse>
            <SidebarItem href="/kanban" icon={<Columns3 aria-hidden />} label="Pro">
              Kanban
            </SidebarItem>
            <SidebarItem
              href="/inbox"
              icon={<Inbox aria-hidden />}
              count={
                <>
                  2<span className="sr-only"> unread messages</span>
                </>
              }
            >
              Inbox
            </SidebarItem>
            <SidebarItem href="/users" icon={<Users aria-hidden />}>
              Users
            </SidebarItem>
            <SidebarItem href="/products" icon={<ShoppingBag aria-hidden />}>
              Products
            </SidebarItem>
            <SidebarItem href="/sign-in" icon={<LogIn aria-hidden />}>
              Sign In
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </DrawerContent>
    </Drawer>
  );
}
