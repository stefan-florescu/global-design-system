import { FileText, GitBranch, Info } from "@stefan-florescu/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@stefan-florescu/ui";

export default function AccordionIcon() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-2xl">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Info aria-hidden />
            What is the Stefan Design System?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          A token-driven, accessible React design system. Components, themes and documentation all
          read from one set of design tokens.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <FileText aria-hidden />
            Is there a Figma file available?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          The tokens are published as DTCG JSON, so they can be synced to Figma variables with any
          DTCG-compatible plugin.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <GitBranch aria-hidden />
            How is it different from other component libraries?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Every colour, size and radius comes from semantic tokens, and every pairing is checked for
          WCAG 2.2 AA contrast in light and dark themes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
