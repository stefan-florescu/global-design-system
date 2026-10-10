"use client";

import { SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "@stefan-florescu/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { activeMainNav, mainNav, sidebarNav } from "@/lib/navigation";

/**
 * The site's navigation as `Sidebar` items: the docs sections (one `SidebarCollapse` each), and
 * with `withMain` the main links above them, for the mobile menu where the header hides them.
 */
export function SiteNavItems({
  withMain = false,
  onNavigate,
}: {
  withMain?: boolean;
  /** Called when a link is followed, e.g. to close the menu drawer. */
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const activeMain = activeMainNav(pathname);

  return (
    <>
      {withMain ? (
        <SidebarItems aria-label="Main pages" className="border-default mb-4 border-b pb-4">
          <SidebarItemGroup>
            {mainNav.map((item) => (
              <SidebarItem key={item.href} asChild active={activeMain === item.href}>
                <Link href={item.href} onClick={onNavigate}>
                  {item.title}
                </Link>
              </SidebarItem>
            ))}
          </SidebarItemGroup>
        </SidebarItems>
      ) : null}
      <SidebarItems aria-label="Documentation">
        <SidebarItemGroup>
          {sidebarNav.map((section) => (
            <SidebarCollapse key={section.title} label={section.title} defaultOpen>
              {section.items.map((item) => (
                <SidebarItem
                  key={item.href}
                  asChild
                  active={pathname === item.href}
                  label={item.label}
                  labelVariant={item.label === "New" ? "brand" : "warning"}
                >
                  <Link href={item.href} onClick={onNavigate}>
                    {item.title}
                  </Link>
                </SidebarItem>
              ))}
            </SidebarCollapse>
          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </>
  );
}
