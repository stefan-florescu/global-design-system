import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@stefan-florescu/ui";

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is the Stefan Design System?</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">
            The Stefan Design System is an open-source library of accessible React components built
            on design tokens and Tailwind CSS, including buttons, alerts, forms and more.
          </p>
          <p>
            Check out this guide to learn how to{" "}
            <a href="/components/button" className="text-fg-brand hover:underline">
              get started
            </a>{" "}
            and start building interfaces even faster with components on top of Tailwind CSS.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is there a Figma file available?</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">
            The tokens are published as DTCG JSON, so every colour, size and radius in the library
            can be synced to Figma variables.
          </p>
          <p>
            Check out the{" "}
            <a href="/foundation/color" className="text-fg-brand hover:underline">
              colour foundations
            </a>{" "}
            based on the semantic tokens and the components of the design system.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How is it different from other component libraries?</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">
            Every component reads semantic tokens only, and every text and fill pairing is checked
            for WCAG 2.2 AA contrast in light and dark themes.
          </p>
          <p className="mb-2">
            It follows Flowbite&apos;s anatomy and examples, so the two work well side by side.
          </p>
          <p className="mb-2">Learn more about these technologies:</p>
          <ul className="list-disc ps-5">
            <li>
              <a href="https://flowbite.com/" className="text-fg-brand hover:underline">
                Flowbite
              </a>
            </li>
            <li>
              <a href="https://tailwindcss.com/" className="text-fg-brand hover:underline">
                Tailwind CSS
              </a>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
