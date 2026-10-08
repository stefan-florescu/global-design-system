"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TabItem = { value: string; label: string; content: ReactNode };

/** WAI-ARIA tabs with automatic activation and roving focus (←/→/Home/End). */
export function Tabs({
  items,
  label,
  variant = "underline",
  className,
}: {
  items: TabItem[];
  label: string;
  variant?: "underline" | "pill";
  className?: string;
}) {
  const id = useId();
  const [active, setActive] = useState(items[0]?.value);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % items.length
        : event.key === "ArrowLeft"
          ? (index - 1 + items.length) % items.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : undefined;
    if (nextIndex === undefined) return;
    event.preventDefault();
    setActive(items[nextIndex]?.value);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cn("flex items-center", variant === "underline" ? "gap-4 border-b" : "gap-1")}
      >
        {items.map((item, index) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "focus-visible:ring-ring/50 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none",
                variant === "underline"
                  ? cn(
                      "-mb-px border-b-2 px-1 pt-1 pb-2.5",
                      selected
                        ? "border-foreground text-foreground"
                        : "text-muted-foreground hover:text-foreground border-transparent",
                    )
                  : cn(
                      "rounded-md px-2.5 py-1 font-mono text-xs",
                      selected
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ),
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.value}
          role="tabpanel"
          id={`${id}-panel-${item.value}`}
          aria-labelledby={`${id}-tab-${item.value}`}
          hidden={item.value !== active}
          className="focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- APG: panels are focusable when they have no focusable content
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
