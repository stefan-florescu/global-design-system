import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4's checkbox and radio (https://flowbite.com/docs/forms/checkbox/), class for class.
 * Flowbite draws them with its Tailwind plugin; the same look is rebuilt here from utilities:
 *
 * - a 16px native input with `appearance-none`: `bg-neutral-secondary-medium`, a 1px border and
 *   `rounded-xs` (checkbox) or `rounded-full` (radio). The border is `input` instead of Flowbite's
 *   `default-medium`, so the box reaches 3:1 against the page (WCAG 1.4.11).
 * - checked: a `brand` fill with a `brand-foreground` check mark (checkbox) or centre dot (radio),
 *   drawn by a sibling element so it follows the theme tokens.
 * - focus: Flowbite's soft `ring-2` halo, plus the solid `ring` outline on keyboard focus.
 * - forced-colors mode hands the input back to the browser, so it stays visible there.
 */
export const choiceControlVariants = cva(
  [
    "peer m-0 block size-4 shrink-0 appearance-none border border-input bg-neutral-secondary-medium align-middle",
    "checked:border-brand checked:bg-brand",
    "aria-invalid:not-checked:border-danger",
    "focus:ring-2",
    "forced-colors:appearance-auto",
    focusOutline,
  ],
  {
    variants: {
      type: {
        checkbox: "rounded-xs focus:ring-brand-soft disabled:not-checked:border-light",
        radio: "rounded-full focus:ring-brand-subtle disabled:not-checked:border-light-medium",
      },
      /* The selectable card hides the box; the whole card shows the state. */
      variant: {
        default: "",
        bordered: "",
        list: "",
        card: "sr-only",
      },
    },
    defaultVariants: { type: "checkbox", variant: "default" },
  },
);

/* Wraps the input and its check mark / dot. Margins place it like Flowbite's input. */
export const choiceControlWrapperVariants = cva("relative inline-flex shrink-0 items-center", {
  variants: {
    layout: {
      plain: "",
      helper: "h-5",
      bordered: "",
      list: "",
      borderedDescription: "ms-4 mt-5 self-start",
      borderedIcon: "me-4 mt-4 self-start",
    },
  },
  defaultVariants: { layout: "plain" },
});

/* The check mark (checkbox) or the white centre dot (radio), shown when checked. */
export const choiceIndicatorVariants = cva(
  "pointer-events-none absolute inset-0 m-auto hidden peer-checked:block forced-colors:hidden",
  {
    variants: {
      type: {
        checkbox: "size-3.5 text-brand-foreground",
        radio: "size-1.5 rounded-full bg-brand-foreground",
      },
    },
    defaultVariants: { type: "checkbox" },
  },
);

/*
 * The element around control and text. `bordered` is Flowbite's "Bordered" card and `list` a row
 * of its list group: the label fills them, so the whole box is clickable. A bordered card with a
 * description or an icon is itself the label.
 */
export const choiceVariants = cva("", {
  variants: {
    layout: {
      plain: "flex items-center",
      helper: "flex",
      bordered: "flex items-center rounded-base border border-default bg-neutral-primary-soft ps-4",
      list: "flex items-center ps-3",
      borderedDescription:
        "flex space-x-2.5 rounded-base border border-default bg-neutral-primary-soft",
      borderedIcon:
        "flex justify-between space-x-2.5 rounded-base border border-default bg-neutral-primary-soft",
      card: "",
    },
    type: {
      checkbox: "",
      radio: "",
    },
  },
  compoundVariants: [
    // Flowbite's bordered checkboxes cast a shadow; its bordered radios don't.
    { type: "checkbox", layout: "bordered", className: "shadow-xs" },
    { type: "checkbox", layout: "borderedDescription", className: "shadow-xs" },
    { type: "checkbox", layout: "borderedIcon", className: "shadow-xs" },
    { type: "radio", layout: "borderedDescription", className: "shadow-xs" },
    { type: "radio", layout: "borderedIcon", className: "shadow-xs" },
  ],
  defaultVariants: { layout: "plain", type: "checkbox" },
});

/* The visible label next to the control (plain, helper and bordered layouts). */
export const choiceLabelVariants = cva("select-none text-sm font-medium", {
  variants: {
    layout: {
      plain: "ms-2",
      helper: "",
      bordered: "ms-2 w-full py-4",
      list: "ms-2 w-full py-3",
    },
    disabled: {
      true: "text-fg-disabled",
      false: "text-heading",
    },
  },
  defaultVariants: { layout: "plain", disabled: false },
});

/* The text block of the helper-text and bordered-with-description/icon layouts. */
export const choiceTextVariants = cva("select-none", {
  variants: {
    layout: {
      helper: "ms-2 text-sm",
      borderedDescription: "py-4 pe-4",
      borderedIcon: "p-4",
    },
  },
  defaultVariants: { layout: "helper" },
});

/* Title inside a bordered card with a description or icon. */
export const choiceTitleVariants = cva("block w-full text-sm font-medium", {
  variants: {
    disabled: {
      true: "text-fg-disabled",
      false: "text-heading",
    },
  },
  defaultVariants: { disabled: false },
});

export const choiceDescriptionVariants = cva("block", {
  variants: {
    layout: {
      helper: "text-xs font-normal text-body",
      bordered: "text-sm text-body",
    },
  },
  defaultVariants: { layout: "helper" },
});

export const choiceIconClassName = "mb-1.5 block text-body [&_svg]:size-7";

/*
 * Flowbite's "Advanced layout": the input is visually hidden and the whole card is its label.
 * Checked cards turn `brand-softer` with `fg-brand-strong` text like Flowbite, and their border
 * is `brand` instead of Flowbite's `brand-subtle`, so the selected state reaches 3:1.
 */
export const choiceCardVariants = cva([
  "inline-flex w-full cursor-pointer items-center justify-between rounded-base border border-default bg-neutral-primary-soft p-5 text-body",
  "hover:bg-neutral-secondary-medium",
  "peer-checked:border-brand peer-checked:bg-brand-softer peer-checked:text-fg-brand-strong peer-checked:hover:bg-brand-softer",
  "peer-focus-visible:outline-2 peer-focus-visible:outline-solid peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
  "peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled",
]);

export const choiceCardTitleVariants = cva("block w-full", {
  variants: {
    withIcon: {
      true: "mb-1 font-medium",
      false: "font-semibold",
    },
  },
  defaultVariants: { withIcon: false },
});

export const choiceCardDescriptionVariants = cva("block w-full", {
  variants: {
    withIcon: {
      true: "text-sm",
      false: "",
    },
  },
  defaultVariants: { withIcon: false },
});

export const choiceCardIconClassName = "mb-2 block [&_svg]:size-7";
export const choiceCardEndIconClassName = "ms-3 shrink-0 rtl:rotate-180 [&_svg]:size-5";

/**
 * `variant`: Flowbite's plain control, its "Bordered" card, an item of its "list group" (the
 * label fills the row) or its "Advanced layout" card.
 */
export const choiceVariantOptions = ["default", "bordered", "list", "card"] as const;
export type ChoiceVariant = (typeof choiceVariantOptions)[number];

export type ChoiceVariantProps = Pick<VariantProps<typeof choiceControlVariants>, "variant">;
