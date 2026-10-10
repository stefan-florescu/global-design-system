import { Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

const tabs = ["Profile", "Dashboard", "Settings", "Contacts"];

export default function TabsDemo() {
  return (
    <Tabs defaultValue="Profile" className="w-full">
      <TabsList aria-label="Account" className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
        <TabsTrigger value="Disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab} className="rounded-base bg-neutral-secondary-soft p-4">
          <p className="text-body text-sm">
            This is some placeholder content the{" "}
            <strong className="text-heading font-medium">
              {tab} tab&apos;s associated content
            </strong>
            . Selecting another tab shows its panel instead.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
