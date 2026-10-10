"use client";

import { CircleUser, LayoutGrid, ReceiptText, SlidersHorizontal } from "@stefan-florescu/icons";
import { useId, useState } from "react";

import { Label, Select, Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

const tabs = [
  { label: "Profile", icon: CircleUser },
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Settings", icon: SlidersHorizontal },
  { label: "Invoice", icon: ReceiptText },
];

export default function TabsFullWidthIcons() {
  const id = useId();
  const [value, setValue] = useState("Profile");

  return (
    <Tabs variant="full-width" value={value} onValueChange={setValue} className="w-full">
      <div className="mb-4 sm:hidden">
        <Label htmlFor={`${id}-tab`} className="sr-only">
          Select a tab
        </Label>
        <Select id={`${id}-tab`} value={value} onChange={(event) => setValue(event.target.value)}>
          {tabs.map(({ label }) => (
            <option key={label}>{label}</option>
          ))}
        </Select>
      </div>
      <TabsList aria-label="Account" className="mb-4 hidden sm:flex">
        {tabs.map(({ label, icon: Icon }) => (
          <TabsTrigger key={label} value={label}>
            <Icon aria-hidden />
            {label}
          </TabsTrigger>
        ))}
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
