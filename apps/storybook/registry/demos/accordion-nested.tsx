import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@stefan-florescu/ui";

export default function AccordionNested() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-2xl">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is the Stefan Design System?</AccordionTrigger>
        <AccordionContent>
          <p className="mb-4">
            A token-driven, accessible React design system. It is organised in layers:
          </p>
          <Accordion defaultValue={["tokens"]}>
            <AccordionItem value="tokens">
              <AccordionTrigger headingLevel={4}>Tokens</AccordionTrigger>
              <AccordionContent>
                Primitive and semantic design decisions, published as CSS variables, JS and JSON.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="themes">
              <AccordionTrigger headingLevel={4}>Themes</AccordionTrigger>
              <AccordionContent>
                Light and dark re-assign the semantic tokens through a data-theme attribute.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="components">
              <AccordionTrigger headingLevel={4}>Components</AccordionTrigger>
              <AccordionContent>
                Accessible React components that only read semantic tokens.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is there a Figma file available?</AccordionTrigger>
        <AccordionContent>
          The tokens are published as DTCG JSON, so they can be synced to Figma variables with any
          DTCG-compatible plugin.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
