"use client";

import { Navbar, NavbarActions, NavbarCollapse, NavbarLink } from "@stefan-florescu/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { activeMainNav, mainNav } from "@/lib/navigation";

import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { SearchCommand } from "./search-command";
import { ThemeToggle } from "./theme-toggle";

/**
 * The site's banner: a sticky, translucent `Navbar` (the "Main" navigation landmark). From `lg`
 * the main links show in a row; below it they move into the menu drawer that the hamburger
 * (`MobileNav`) opens.
 */
export function SiteHeader() {
  const active = activeMainNav(usePathname());

  return (
    // The header is the sticky element so the banner landmark wraps the navigation bar.
    <header className="z-sticky sticky top-0 w-full">
      <Navbar
        expand="lg"
        fluid
        // The bar keeps the site's translucent, blurred look; its row (`*:`) matches the
        // page container's width and gutters and the header height.
        className="bg-neutral-primary/85 supports-[backdrop-filter]:bg-neutral-primary/70 backdrop-blur *:h-14 *:max-w-(--container-max) *:flex-nowrap *:gap-2 *:px-(--gutter) *:py-0 md:*:gap-4"
      >
        <div className="flex items-center gap-2">
          <MobileNav className="lg:hidden" />
          <Logo />
        </div>
        <NavbarCollapse className="lg:ms-4 lg:me-auto" listClassName="text-sm lg:gap-6">
          {mainNav.map((item) => (
            <NavbarLink key={item.href} asChild active={active === item.href}>
              <Link href={item.href}>{item.title}</Link>
            </NavbarLink>
          ))}
        </NavbarCollapse>
        <NavbarActions className="gap-1 md:gap-2">
          <SearchCommand />
          <ThemeToggle />
        </NavbarActions>
      </Navbar>
    </header>
  );
}
