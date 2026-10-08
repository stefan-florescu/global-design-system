"use client";

import { Menu, X } from "@stefan-florescu/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { activeMainNav, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import { DocsSidebar } from "./docs-sidebar";

/** Below `md`, the top menu and sidebar collapse into a left-hand drawer. */
export function MobileNav({ className }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const active = activeMainNav(pathname);

  const close = () => dialogRef.current?.close();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="hover:bg-accent focus-visible:ring-ring/50 -ml-2 inline-flex size-9 items-center justify-center rounded-md focus-visible:ring-[3px] focus-visible:outline-none"
      >
        <Menu aria-hidden className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>

      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events -- backdrop click; Esc is handled natively by <dialog> */}
      <dialog
        ref={dialogRef}
        aria-label="Site navigation"
        onClick={(event) => event.target === dialogRef.current && close()}
        className="bg-background text-foreground fixed inset-y-0 left-0 m-0 h-dvh max-h-dvh w-[85vw] max-w-xs border-r p-0 shadow-xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <span className="font-semibold tracking-tight">Menu</span>
            <button
              type="button"
              onClick={close}
              className="hover:bg-accent focus-visible:ring-ring/50 inline-flex size-9 items-center justify-center rounded-md focus-visible:ring-[3px] focus-visible:outline-none"
            >
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
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
                    active === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <DocsSidebar onNavigate={close} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
