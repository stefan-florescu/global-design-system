"use client";

import { LayoutGrid, Tag } from "@stefan-florescu/icons";
import {
  Indicator,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  buttonVariants,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { basePath } from "@/lib/base-path";
import { useSession } from "@/lib/session";
import { useTracker } from "@/lib/use-tracker";

import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", title: "Watchlist" },
  { href: "/add", title: "Add product" },
  { href: "/notifications", title: "Alerts" },
  { href: "/settings", title: "Settings" },
];

/** A product page belongs to the watchlist. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/product");
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { state } = useTracker();
  const session = useSession();
  const inApp = session.mode === "account" || session.mode === "demo";
  const [open, setOpen] = useState(false);
  const unread = state?.notifications.filter((n) => !n.read).length ?? 0;

  return (
    <header className="z-sticky sticky top-0 w-full">
      <Navbar open={open} onOpenChange={setOpen}>
        {/* A plain <a>, so the base path is written out (see lib/base-path.ts). */}
        <NavbarBrand href={basePath} name="Price Tracker" logo={<Tag aria-hidden />} />
        <NavbarActions className="gap-1 md:order-2 md:gap-2">
          {/* The launcher lives at the site root, outside this app's base path, so next/link (which
              adds the base path) can't link to it. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <LayoutGrid aria-hidden />
            <span className="max-md:sr-only">All apps</span>
          </a>
          <ThemeToggle />
          <AccountMenu />
          {inApp ? <NavbarToggle label="Open main menu" /> : null}
        </NavbarActions>
        {inApp ? (
          <NavbarCollapse className="md:order-1">
            {links.map((link) => (
              <NavbarLink key={link.href} asChild active={isActive(pathname, link.href)}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  <span className="inline-flex items-center gap-1.5">
                    {link.title}
                    {link.href === "/notifications" && unread > 0 ? (
                      <Indicator
                        variant="danger"
                        count={unread}
                        max={99}
                        label={`${unread} unread`}
                      />
                    ) : null}
                  </span>
                </Link>
              </NavbarLink>
            ))}
          </NavbarCollapse>
        ) : null}
      </Navbar>
    </header>
  );
}
