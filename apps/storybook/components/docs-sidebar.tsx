"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      {sidebarNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <h2 className="text-muted-foreground px-2 pb-1 text-xs font-medium">{section.title}</h2>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "focus-visible:ring-ring/50 flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none",
                      isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground/80 hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    {item.title}
                    {item.label ? (
                      <span className="bg-muted text-muted-foreground ml-auto rounded-sm px-1.5 py-px text-[10px] font-medium">
                        {item.label}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
