import { Badge } from "@stefan-florescu/ui";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

import { LogoMark } from "./logo-mark";

/** The site's brand: the mark and short name, linked home, with the current version. */
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md focus-visible:ring-[3px] focus-visible:outline-none"
      >
        <LogoMark />
        <span className="font-semibold tracking-tight">{siteConfig.shortName}</span>
      </Link>
      <Badge variant="brand" bordered>
        v{siteConfig.version}
      </Badge>
    </div>
  );
}
