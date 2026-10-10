import { ArrowRight, CircleCheck } from "@stefan-florescu/icons";
import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@stefan-florescu/ui";

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

const trigger = "rounded-none first:rounded-ss-base hover:bg-neutral-tertiary";

export default function CardTabs() {
  return (
    // `*:p-0` drops the card body's padding: the tabs sit flush with the card's edges.
    <Card className="bg-neutral-primary w-full *:p-0">
      <Tabs defaultValue="about">
        <TabsList aria-label="Company" className="rounded-t-base bg-neutral-secondary-soft">
          <TabsTrigger value="about" className={trigger}>
            About
          </TabsTrigger>
          <TabsTrigger value="services" className={trigger}>
            Services
          </TabsTrigger>
          <TabsTrigger value="facts" className={trigger}>
            Facts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="rounded-b-base p-4 md:p-8">
          <h3 className="text-heading mb-2 text-2xl font-semibold tracking-tight">
            Powering innovation at <span className="font-extrabold">200,000+</span> companies
            worldwide
          </h3>
          <p className="text-body mb-4">
            Empower Developers, IT Ops, and business teams to collaborate at high velocity. Respond
            to changes and deliver great customer and employee service experiences fast.
          </p>
          <a
            href="/components/card"
            className="text-fg-brand inline-flex items-center font-medium hover:underline"
          >
            Learn more
            <ArrowRight aria-hidden className="ms-1 size-5 rtl:rotate-180" />
          </a>
        </TabsContent>
        <TabsContent value="services" className="rounded-b-base p-4 md:p-8">
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
        <TabsContent value="facts" className="rounded-b-base p-4 md:p-8">
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
      </Tabs>
    </Card>
  );
}
