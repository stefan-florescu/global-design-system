import { Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

const tabs = ["Tab 1", "Tab 2", "Tab 3", "Tab 4"];

export default function TabsPills() {
  return (
    <Tabs variant="pills" defaultValue="Tab 1" className="w-full">
      <TabsList aria-label="Pills" className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
        <TabsTrigger value="Tab 5" disabled>
          Tab 5
        </TabsTrigger>
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab} className="rounded-base bg-neutral-secondary-soft p-4">
          <p className="text-body text-sm">
            This is some placeholder content the{" "}
            <strong className="text-heading font-medium">{tab}&apos;s associated content</strong>.
            Selecting another tab shows its panel instead.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
