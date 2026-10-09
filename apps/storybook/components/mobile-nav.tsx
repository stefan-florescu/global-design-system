"use client";

import { Menu } from "@stefan-florescu/icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { activeMainNav, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import { DocsSidebar } from "./docs-sidebar";

/** Below `lg`, the top menu and sidebar collapse into a left-hand drawer. */
export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = activeMainNav(pathname);

  const close = () => setOpen(false);

  // Close the drawer whenever the route changes (adjusting state while rendering, not in an effect).
  const [shownPath, setShownPath] = useState(pathname);
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setOpen(false);
  }

  return (
    <div className={className}>
      <Drawer open={open} onOpenChange={setOpen} placement="left">
        <DrawerTrigger variant="ghost" size="sm" iconOnly className="-ml-2 focus:ring-0">
          <Menu aria-hidden />
          <span className="sr-only">Open menu</span>
        </DrawerTrigger>
        {/* The header stays in place; only the links below it scroll. */}
        <DrawerContent className="h-dvh w-[85vw] max-w-xs overflow-hidden p-0">
          <div className="flex h-full flex-col">
            <DrawerHeader className="mb-0 h-14 shrink-0 px-4 pb-0">
              <DrawerTitle className="text-heading text-base font-semibold tracking-tight">
                Menu
              </DrawerTitle>
              <DrawerClose label="Close menu" />
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-2 py-4">
              <nav aria-label="Main" className="mb-6 flex flex-col gap-0.5">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={active === item.href ? "page" : undefined}
                    className={cn(
                      "focus-visible:ring-ring/50 flex h-9 items-center rounded-md px-2 text-base font-medium focus-visible:ring-[3px] focus-visible:outline-none",
                      active === item.href ? "text-heading" : "text-body",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <DocsSidebar onNavigate={close} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
