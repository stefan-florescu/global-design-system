import { Tabs as TabsRoot, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";
import type { ReactNode } from "react";

export type TabItem = { value: string; label: string; content: ReactNode };

/*
 * The site's Preview / Code and package-manager switchers: the design system's `Tabs` (WAI-ARIA
 * tabs, roving focus, ←/→/Home/End), restyled as the docs' compact segmented control.
 */
const listClassName =
  "mb-3 inline-flex h-9 flex-nowrap items-center gap-0.5 rounded-md border-0 bg-neutral-secondary-medium p-0.75";

const triggerClassName = [
  "h-full rounded-xs px-3 py-0 text-[0.8125rem] transition-colors motion-reduce:transition-none",
  "hover:bg-transparent",
  "data-[state=active]:bg-neutral-primary data-[state=active]:text-heading data-[state=active]:shadow-sm",
].join(" ");

export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  return (
    <TabsRoot defaultValue={items[0]?.value} className="tabs">
      <TabsList aria-label={label} className={listClassName}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value} className={triggerClassName}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
