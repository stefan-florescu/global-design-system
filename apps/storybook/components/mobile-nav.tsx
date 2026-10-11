"use client";

import { Menu } from "@stefan-florescu/icons";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger, Sidebar } from "@stefan-florescu/ui";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { SiteNavItems } from "./site-nav";

/**
 * Below `lg`, the header's hamburger opens the site navigation in a left-hand `Drawer`: the main
 * links above the docs sections, as `Sidebar` items in an off-canvas sidebar.
 */
export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes (adjusting state while rendering, not in an effect).
  const [shownPath, setShownPath] = useState(pathname);
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setOpen(false);
  }

  // Close it when the window grows past `lg`, where the header and sidebar show the links.
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen} placement="left">
      <DrawerTrigger variant="ghost" iconOnly className={cn("-ms-2 p-2 [&_svg]:size-6", className)}>
        <Menu aria-hidden />
        <span className="sr-only">Open menu</span>
      </DrawerTrigger>
      <DrawerContent aria-label="Menu" className="w-64 border-0 p-0">
        <DrawerClose label="Close menu" className="z-raised" />
        <Sidebar
          label="Site navigation"
          breakpoint="none"
          position="static"
          className="h-full [&>[data-slot=sidebar-panel]]:pt-14"
        >
          <SiteNavItems withMain onNavigate={() => setOpen(false)} />
        </Sidebar>
      </DrawerContent>
    </Drawer>
  );
}
