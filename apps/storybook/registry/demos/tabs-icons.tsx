import { CircleUser, Headset, LayoutGrid, SlidersVertical } from "@stefan-florescu/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

const tabs = [
  { label: "Profile", icon: CircleUser },
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Settings", icon: SlidersVertical },
  { label: "Contacts", icon: Headset },
];

export default function TabsIcons() {
  return (
    <Tabs variant="underline" defaultValue="Dashboard" className="w-full">
      <TabsList aria-label="Account" className="mb-4">
        {tabs.map(({ label, icon: Icon }) => (
          <TabsTrigger key={label} value={label}>
            <Icon aria-hidden />
            {label}
          </TabsTrigger>
        ))}
        <TabsTrigger value="Disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      {tabs.map(({ label }) => (
        <TabsContent
          key={label}
          value={label}
          className="rounded-base bg-neutral-secondary-soft p-4"
        >
          <p className="text-body text-sm">
            This is some placeholder content the{" "}
            <strong className="text-heading font-medium">
              {label} tab&apos;s associated content
            </strong>
            . Selecting another tab shows its panel instead.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
