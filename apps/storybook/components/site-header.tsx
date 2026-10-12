"use client";

import { LayoutGrid } from "@stefan-florescu/icons";
import {
  buttonVariants,
  Navbar,
  NavbarActions,
  NavbarCollapse,
  NavbarLink,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { activeMainNav, mainNav } from "@/lib/navigation";

import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { SearchCommand } from "./search-command";
import { ThemeToggle } from "./theme-toggle";

/**
 * The site's banner: a sticky `Navbar` (the "Main" navigation landmark) with the app's brand, in
 * the same style as the other apps' headers. From `lg` the main links show in a row; below it they
 * move into the menu drawer that the hamburger (`MobileNav`) opens.
 */
export function SiteHeader() {
  const active = activeMainNav(usePathname());

  return (
    // The header is the sticky element so the banner landmark wraps the navigation bar.
    <header className="z-sticky sticky top-0 w-full">
      <Navbar
        expand="lg"
        fluid
        // The row (`*:`) lines up with the page container's width and gutters.
        className="*:max-w-(--container-max) *:flex-nowrap *:gap-2 *:px-(--gutter) md:*:gap-4"
      >
        <div className="flex items-center gap-2">
          <MobileNav className="lg:hidden" />
          <Logo />
        </div>
        <NavbarCollapse className="lg:ms-8 lg:me-auto">
          {mainNav.map((item) => (
            <NavbarLink key={item.href} asChild active={active === item.href}>
              <Link href={item.href}>{item.title}</Link>
            </NavbarLink>
          ))}
        </NavbarCollapse>
        <NavbarActions className="gap-1 md:gap-2">
          {/* The launcher lives at the site root, outside this app's base path, so next/link (which
              adds the base path) can't link to it. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <LayoutGrid aria-hidden />
            <span className="max-md:sr-only">All apps</span>
          </a>
          <SearchCommand />
          <ThemeToggle />
        </NavbarActions>
      </Navbar>
    </header>
  );
}
