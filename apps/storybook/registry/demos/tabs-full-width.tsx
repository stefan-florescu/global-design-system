"use client";

import { useId, useState } from "react";

import { Label, Select, Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

const tabs = ["Profile", "Dashboard", "Settings", "Invoice"];

export default function TabsFullWidth() {
  const id = useId();
  const [value, setValue] = useState("Profile");

  return (
    <Tabs variant="full-width" value={value} onValueChange={setValue} className="w-full">
      {/* Below `sm` a select replaces the tabs. */}
      <div className="mb-4 sm:hidden">
        <Label htmlFor={`${id}-tab`} className="sr-only">
          Select a tab
        </Label>
        <Select id={`${id}-tab`} value={value} onChange={(event) => setValue(event.target.value)}>
          {tabs.map((tab) => (
            <option key={tab}>{tab}</option>
          ))}
        </Select>
      </div>
      <TabsList aria-label="Account" className="mb-4 hidden sm:flex">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
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
            . Selecting another tab shows its panel instead.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
