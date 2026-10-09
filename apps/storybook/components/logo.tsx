import Link from "next/link";

import { siteConfig } from "@/lib/site";

/** Placeholder brand mark — replace the SVG once the logo is designed. */
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/"
        className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md focus-visible:ring-[3px] focus-visible:outline-none"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-6">
          <rect width="24" height="24" rx="6" className="fill-heading" />
          <path
            d="M15.5 8.2c-.6-.9-1.8-1.5-3.3-1.5-2 0-3.4 1-3.4 2.6 0 3.4 6.9 2 6.9 5.4 0 1.6-1.5 2.7-3.6 2.7-1.6 0-3-.7-3.7-1.8"
            className="stroke-neutral-primary fill-none"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-semibold tracking-tight">{siteConfig.shortName}</span>
      </Link>
      <span className="text-body rounded-full border px-1.5 py-px font-mono text-[11px] leading-4">
        v{siteConfig.version}
      </span>
    </div>
  );
}
