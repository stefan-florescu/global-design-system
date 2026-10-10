"use client";

import { CircleCheck } from "@stefan-florescu/icons";
import { useId, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  Label,
  Select,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@stefan-florescu/ui";

const tabs = [
  { value: "statistics", label: "Statistics" },
  { value: "services", label: "Services" },
  { value: "faq", label: "FAQ" },
];

const services = [
  "Dynamic reports and dashboards",
  "Templates for everyone",
  "Development workflow",
  "Limitless business automation",
];

const facts = [
  { value: "73M+", label: "Developers" },
  { value: "100M+", label: "Public repositories" },
  { value: "1000s", label: "Open source projects" },
];

const trigger = [
  "w-full rounded-none bg-neutral-secondary-soft first:rounded-ss-base last:rounded-se-base",
  "hover:bg-neutral-tertiary focus:bg-neutral-tertiary",
].join(" ");

export default function CardFullWidthTabs() {
  const id = useId();
  const [value, setValue] = useState("statistics");

  return (
    <Card className="bg-neutral-primary w-full *:p-0">
      <Tabs value={value} onValueChange={setValue}>
        {/* Below `sm` a select replaces the tabs. */}
        <div className="sm:hidden">
          <Label htmlFor={`${id}-tab`} className="sr-only">
            Select tab
          </Label>
          <Select
            id={`${id}-tab`}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="rounded-t-base border-default bg-neutral-secondary-soft rounded-none border-0 border-b shadow-none"
          >
            {tabs.map((tab) => (
              <option key={tab.value} value={tab.value}>
                {tab.label}
              </option>
            ))}
          </Select>
        </div>
        <TabsList
          aria-label="Company"
          className="divide-default rounded-t-base hidden flex-nowrap gap-x-0 divide-x sm:flex rtl:divide-x-reverse"
        >
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className={trigger}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="statistics" className="rounded-base p-4 md:p-8">
          <dl className="text-heading mx-auto grid max-w-screen-xl grid-cols-2 gap-8 p-4 sm:grid-cols-3 sm:p-8">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="text-heading mb-2 text-2xl font-semibold tracking-tight">
                  {fact.value}
                </dt>
                <dd className="text-body">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent value="services" className="rounded-base p-4 md:p-8">
          <h3 className="text-heading mb-5 text-2xl font-semibold tracking-tight">
            We invest in the world&apos;s potential
          </h3>
          <ul className="text-body space-y-4">
            {services.map((service) => (
              <li key={service} className="flex items-center gap-2">
                <CircleCheck aria-hidden className="text-fg-brand size-4 shrink-0" />
                <span className="leading-tight">{service}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="faq" className="rounded-base p-4">
          <Accordion flush defaultValue={["what"]}>
            <AccordionItem value="what">
              <AccordionTrigger>What is the Stefan Design System?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  An open-source library of accessible React components built on design tokens and
                  Tailwind CSS, including buttons, dropdowns, modals, navbars, and more.
                </p>
                <p>
                  Check out this guide to learn how to{" "}
                  <a href="/components/button" className="text-fg-brand hover:underline">
                    get started
                  </a>{" "}
                  and start building interfaces even faster.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="figma">
              <AccordionTrigger>Is there a Figma file available?</AccordionTrigger>
              <AccordionContent>
                <p>
                  The tokens are published as DTCG JSON, so every colour, size and radius can be
                  synced to Figma variables.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="accessibility">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes. Every component follows the WAI-ARIA patterns, on semantic tokens that pass
                  WCAG 2.2 AA in both themes.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
