import { Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

const tabs = ["Profile", "Dashboard", "Settings", "Contacts"];

// Restyle a state with `data-[state=…]:` classes; they win over the variant's own classes.
const trigger = [
  "data-[state=active]:border-fg-purple data-[state=active]:text-fg-purple",
  "data-[state=inactive]:border-default data-[state=inactive]:hover:border-brand",
  "dark:data-[state=inactive]:border-transparent",
].join(" ");

export default function TabsActiveStyle() {
  return (
    <Tabs variant="underline" defaultValue="Profile" className="w-full">
      <TabsList aria-label="Account" className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab} className={trigger}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab} className="rounded-base bg-neutral-secondary-soft p-4">
          <p className="text-body text-sm">
            This is some placeholder content the{" "}
            <strong className="text-heading font-medium">
              {tab} tab&apos;s associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for the next. The tabs
            swap the panels and the active styles for you.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
