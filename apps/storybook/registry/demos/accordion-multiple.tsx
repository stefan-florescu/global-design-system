import { CircleQuestionMark } from "@stefan-florescu/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@stefan-florescu/ui";

export default function AccordionMultiple() {
  return (
    <Accordion defaultValue={["item-1"]} multiple className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center">
            <CircleQuestionMark aria-hidden className="me-2" />
            What is the Stefan Design System?
          </span>
        </AccordionTrigger>
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
        <AccordionTrigger>
          <span className="flex items-center">
            <CircleQuestionMark aria-hidden className="me-2" />
            Is there a Figma file available?
          </span>
        </AccordionTrigger>
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
        <AccordionTrigger>
          <span className="flex items-center">
            <CircleQuestionMark aria-hidden className="me-2" />
            How is it different from other component libraries?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">
            Every component reads semantic tokens only, and every text and fill pairing is checked
            for WCAG 2.2 AA contrast in light and dark themes.
          </p>
          <p className="mb-2">
            Components are plain React 19 with no runtime styling, so they fit into any React app.
          </p>
          <p className="mb-2">Learn more about these technologies:</p>
          <ul className="list-disc ps-5">
            <li>
              <a href="https://react.dev/" className="text-fg-brand hover:underline">
                React
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
