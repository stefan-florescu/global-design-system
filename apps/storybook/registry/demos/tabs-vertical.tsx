import { CircleUser, CircleX, FileChartColumn, Headset, Settings } from "@stefan-florescu/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

const tabs = [
  { label: "Profile", icon: CircleUser },
  { label: "Dashboard", icon: FileChartColumn },
  { label: "Settings", icon: Settings },
  { label: "Contact", icon: Headset },
];

export default function TabsVertical() {
  return (
    <Tabs variant="pills" orientation="vertical" defaultValue="Profile" className="w-full">
      <TabsList aria-label="Account">
        {tabs.map(({ label, icon: Icon }) => (
          <TabsTrigger key={label} value={label}>
            <Icon aria-hidden />
            {label}
          </TabsTrigger>
        ))}
        <TabsTrigger value="Disabled" disabled>
          <CircleX aria-hidden />
          Disabled
        </TabsTrigger>
      </TabsList>
      {tabs.map(({ label }) => (
        <TabsContent
          key={label}
          value={label}
          className="rounded-base bg-neutral-secondary text-body w-full p-6"
        >
          <h3 className="text-heading mb-4 text-lg font-semibold">{label} Tab</h3>
          <p className="mb-2">
            This is some placeholder content the {label} tab&apos;s associated content, clicking
            another tab will toggle the visibility of this one for the next.
          </p>
          <p>The tabs swap the panels and the active styles for you.</p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
