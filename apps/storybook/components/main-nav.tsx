"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { activeMainNav, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const active = activeMainNav(pathname);

  return (
    <nav aria-label="Main" className={cn("items-center gap-1", className)}>
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active === item.href ? "page" : undefined}
          className={cn(
            "hover:text-foreground focus-visible:ring-ring/50 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none",
            active === item.href ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
