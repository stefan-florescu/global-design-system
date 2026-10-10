import { Sidebar } from "@stefan-florescu/ui";

import { SiteNavItems } from "./site-nav";

/**
 * The docs navigation column: a sticky `Sidebar` under the header from `lg` up. Below `lg` it is
 * hidden and the header's menu drawer (`MobileNav`) shows the same items.
 */
export function DocsSidebar() {
  return (
    <Sidebar
      label="Site navigation"
      breakpoint="none"
      position="sticky"
      className="top-(--header-height) hidden h-[calc(100vh-var(--header-height))] w-auto lg:block"
    >
      <SiteNavItems />
    </Sidebar>
  );
}
