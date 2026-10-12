import { SwatchBook } from "@stefan-florescu/icons";
import { Badge, NavbarBrand } from "@stefan-florescu/ui";

import { siteConfig } from "@/lib/site";

/**
 * The site's brand, in the style of the other apps' headers: the design-system mark in `fg-brand`
 * and the app name (`NavbarBrand`), linked home, followed by the current version.
 */
export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <NavbarBrand href="/" name={siteConfig.shortName} logo={<SwatchBook aria-hidden />} />
      <Badge variant="brand" bordered>
        v{siteConfig.version}
      </Badge>
    </div>
  );
}
