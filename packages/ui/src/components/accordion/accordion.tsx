"use client";

import { ChevronDown } from "@stefan-florescu/icons";
import {
  createContext,
  use,
  useId,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

import {
  accordionContentVariants,
  accordionIconClassName,
  accordionItemClassName,
  accordionTriggerVariants,
  accordionVariants,
} from "./accordion.variants";

type AccordionContextValue = {
  openValues: string[];
  toggle: (value: string) => void;
  variant: "neutral" | "brand";
  flush: boolean;
  separated: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

type AccordionItemContextValue = {
  open: boolean;
  disabled: boolean;
  value: string;
  triggerId: string;
  contentId: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordion(component: string) {
  const context = use(AccordionContext);
  if (!context) throw new Error(`<${component}> must be used inside <Accordion>.`);
  return context;
}

function useAccordionItem(component: string) {
  const context = use(AccordionItemContext);
  if (!context) throw new Error(`<${component}> must be used inside <AccordionItem>.`);
  return context;
}

export type AccordionProps = Omit<ComponentProps<"div">, "defaultValue"> & {
  /** Let several items stay open at once. By default, opening an item closes the others. */
  multiple?: boolean;
  /** Values of the items open on first render (uncontrolled). */
  defaultValue?: string[];
  /** Values of the open items (controlled). Use with `onValueChange`. */
  value?: string[];
  /** Called with the values of the open items whenever an item opens or closes. */
  onValueChange?: (value: string[]) => void;
  /** Hover colour of the titles: `neutral` (gray) or `brand` (Flowbite's "Color options"). */
  variant?: "neutral" | "brand";
  /** Remove the outer box, background and side padding, leaving only dividers. */
  flush?: boolean;
  /** Show every item as its own card, 1rem apart (Flowbite's "Separated cards"). */
  separated?: boolean;
};

/**
 * A vertically stacked set of headings that each reveal a section of content.
 * Follows the WAI-ARIA Accordion pattern.
 */
export function Accordion({
  multiple = false,
  defaultValue = [],
  value,
  onValueChange,
  variant = "neutral",
  flush = false,
  separated = false,
  className,
  children,
  ...props
}: AccordionProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const openValues = value ?? uncontrolled;

  const toggle = (itemValue: string) => {
    const isOpen = openValues.includes(itemValue);
    const next = isOpen
      ? openValues.filter((v) => v !== itemValue)
      : multiple
        ? [...openValues, itemValue]
        : [itemValue];
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  return (
    <AccordionContext value={{ openValues, toggle, variant, flush, separated }}>
      <div
        data-slot="accordion"
        className={cn(accordionVariants({ flush, separated }), className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext>
  );
}

export type AccordionItemProps = ComponentProps<"div"> & {
  /** Unique value that identifies the item in `value` and `defaultValue`. */
  value: string;
  /** Prevent the item from being opened or closed. */
  disabled?: boolean;
};

export function AccordionItem({
  value,
  disabled = false,
  className,
  ...props
}: AccordionItemProps) {
  const { openValues } = useAccordion("AccordionItem");
  const id = useId();
  const open = openValues.includes(value);

  return (
    <AccordionItemContext
      value={{ open, disabled, value, triggerId: `${id}-trigger`, contentId: `${id}-content` }}
    >
      <div
        data-slot="accordion-item"
        data-state={open ? "open" : "closed"}
        className={cn(accordionItemClassName, className)}
        {...props}
      />
    </AccordionItemContext>
  );
}

/** Move focus between the triggers of the same accordion (WAI-ARIA optional keys). */
function focusSibling(event: KeyboardEvent<HTMLButtonElement>) {
  const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
  if (!keys.includes(event.key)) return;
  const root = event.currentTarget.closest('[data-slot="accordion"]');
  if (!root) return;
  const triggers = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-slot="accordion-trigger"]:not(:disabled)'),
  ).filter((trigger) => trigger.closest('[data-slot="accordion"]') === root);
  const index = triggers.indexOf(event.currentTarget);
  const last = triggers.length - 1;
  const next = {
    ArrowDown: index === last ? 0 : index + 1,
    ArrowUp: index === 0 ? last : index - 1,
    Home: 0,
    End: last,
  }[event.key];
  if (next === undefined) return;
  event.preventDefault();
  triggers[next]?.focus();
}

export type AccordionTriggerProps = ComponentProps<"button"> & {
  /** Level of the heading that wraps the button. Match the page outline. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /**
   * Icon at the end of the title. By default a chevron that turns while the item is open. Pass
   * another icon to show it without turning, or `null` for none.
   */
  icon?: ReactNode;
};

export function AccordionTrigger({
  headingLevel = 3,
  icon,
  className,
  children,
  onClick,
  onKeyDown,
  ...props
}: AccordionTriggerProps) {
  const { toggle, variant, flush, separated } = useAccordion("AccordionTrigger");
  const { open, disabled, value, triggerId, contentId } = useAccordionItem("AccordionTrigger");
  const Heading = `h${headingLevel}` as const;

  return (
    <Heading className="m-0">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={contentId}
        disabled={disabled}
        data-slot="accordion-trigger"
        data-state={open ? "open" : "closed"}
        className={cn(accordionTriggerVariants({ variant, flush, separated }), className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle(value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented) focusSibling(event);
        }}
        {...props}
      >
        {children}
        {icon === undefined ? <ChevronDown aria-hidden className={accordionIconClassName} /> : icon}
      </button>
    </Heading>
  );
}

export type AccordionContentProps = ComponentProps<"div">;

export function AccordionContent({ className, ...props }: AccordionContentProps) {
  const { flush, separated } = useAccordion("AccordionContent");
  const { open, triggerId, contentId } = useAccordionItem("AccordionContent");

  return (
    <div
      role="region"
      id={contentId}
      aria-labelledby={triggerId}
      hidden={!open}
      data-slot="accordion-content"
      data-state={open ? "open" : "closed"}
      className={cn(accordionContentVariants({ flush, separated }), className)}
      {...props}
    />
  );
}
