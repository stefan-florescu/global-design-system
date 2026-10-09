import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4's navbar (https://flowbite.com/docs/components/navbar/), class for class:
 * - the bar is `neutral-primary` (or `neutral-secondary-soft`, "Solid background") with a
 *   `default` bottom border, and a centred `max-w-screen-xl` row with `p-4`;
 * - the brand is a 28px logo and the name in `text-xl font-semibold heading`;
 * - the hamburger is a 40px `body` icon button with a `neutral-tertiary` focus ring;
 * - below `md` the links stack in a `neutral-secondary-soft` card with a `default` border and the
 *   current page filled with `brand`; from `md` up they sit in a row, 32px apart, in `heading`
 *   text that turns `fg-brand` on hover, with the current page in `fg-brand`.
 *
 * `expand` is the width from which the links show in a row (`md`), or `never` for Flowbite's
 * "Hamburger menu" that collapses them at every width. Tailwind needs whole class names, so every
 * `md:` class is written out for the `md` case.
 *
 * Accessibility additions (Flowbite shows none): links, buttons, the brand and the hamburger draw
 * the solid `ring` outline on keyboard focus (lib/focus); disabled links use `fg-disabled`.
 * Spacing uses `gap` instead of Flowbite's `space-x-*` so it also works right to left.
 */

export const navbarVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-neutral-primary",
      solid: "bg-neutral-secondary-soft",
    },
    border: {
      true: "border-b border-default",
      false: "",
    },
    position: {
      static: "",
      /* Sticks to the top of its scrolling container (or the page) once scrolled to. */
      sticky: "sticky start-0 top-0 z-sticky",
      /* Fixed to the top of the viewport, as in every Flowbite example (`z-20`). */
      fixed: "fixed start-0 top-0 z-fixed",
    },
  },
  defaultVariants: { variant: "default", border: true, position: "static" },
});

/** The row inside the bar: centred and capped at `max-w-screen-xl` unless `fluid`. */
export const navbarContainerVariants = cva("mx-auto flex flex-wrap items-center justify-between", {
  variants: {
    fluid: {
      true: "",
      false: "max-w-screen-xl",
    },
    /* `md` is Flowbite's navbar (`p-4`); `sm` its secondary bar under a navbar (`px-4 py-3`). */
    size: {
      sm: "px-4 py-3",
      md: "p-4",
    },
  },
  defaultVariants: { fluid: false, size: "md" },
});

/** Logo link: the mark, then the name, 12px apart. */
export const navbarBrandClassName = ["flex items-center gap-3 rounded-xs", focusOutline].join(" ");
/** A logo image (`src`), 28px tall. */
export const navbarBrandImageClassName = "h-7 w-auto shrink-0";
/** A logo mark element (`logo`), 28px, in `fg-brand`. */
export const navbarBrandMarkClassName = "flex shrink-0 text-fg-brand [&_svg]:size-7";
export const navbarBrandNameClassName =
  "self-center text-xl font-semibold whitespace-nowrap text-heading";

/** Flowbite's hamburger: a 40px icon button that hides once the links show in a row. */
export const navbarToggleVariants = cva(
  [
    "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-base p-2 text-sm text-body hover:text-heading",
    "focus:ring-2 focus:ring-neutral-tertiary [&_svg]:size-6 [&_svg]:shrink-0",
    focusOutline,
  ],
  {
    variants: {
      expand: {
        md: "md:hidden",
        never: "",
      },
      /* On the solid bar the hover fill is one step darker, as in Flowbite's "Hamburger menu". */
      variant: {
        default: "hover:bg-neutral-secondary-soft",
        solid: "hover:bg-neutral-tertiary",
      },
    },
    defaultVariants: { expand: "md", variant: "default" },
  },
);

/** The group of buttons at the end of the bar (call to action, user menu, hamburger). */
export const navbarActionsVariants = cva("flex items-center gap-3", {
  variants: {
    expand: {
      md: "md:order-2",
      never: "",
    },
  },
  defaultVariants: { expand: "md" },
});

/**
 * The collapsible region: hidden until the hamburger opens it, then a full-width row under the
 * bar. From `md` up it always shows, between the brand and the actions.
 */
export const navbarCollapseVariants = cva("w-full items-center justify-between", {
  variants: {
    expand: {
      md: "md:order-1 md:flex md:w-auto",
      never: "",
    },
    open: {
      true: "block",
      false: "hidden",
    },
    variant: {
      default: "",
      flush: "",
      /* Never collapses: a row of small links, Flowbite's submenu bar. */
      inline: "flex w-auto",
    },
  },
  defaultVariants: { expand: "md", open: false, variant: "default" },
});

export const navbarListVariants = cva("m-0 flex list-none font-medium", {
  variants: {
    expand: { md: "", never: "" },
    variant: { default: "", flush: "", inline: "" },
  },
  compoundVariants: [
    {
      variant: "default",
      expand: "md",
      className:
        "mt-4 flex-col rounded-base border border-default bg-neutral-secondary-soft p-4 md:mt-0 md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0",
    },
    /* Flowbite's "Hamburger menu": a ruled-off column with 8px between links. */
    {
      variant: "default",
      expand: "never",
      className: "mt-4 flex-col gap-2 border-t border-default pt-4",
    },
    /* Flowbite's mega menu navbar: no card, the rows divided by `light` lines. */
    { variant: "flush", expand: "md", className: "mt-4 flex-col md:mt-0 md:flex-row md:gap-8" },
    { variant: "flush", expand: "never", className: "mt-4 flex-col" },
    { variant: "inline", className: "flex-row flex-wrap gap-x-8 gap-y-2 text-sm" },
  ],
  defaultVariants: { expand: "md", variant: "default" },
});

const disabled =
  "aria-disabled:cursor-not-allowed aria-disabled:text-fg-disabled aria-disabled:hover:bg-transparent aria-disabled:hover:text-fg-disabled aria-disabled:hover:no-underline";

/**
 * A link in the navbar, or a button styled as one (`kind: "button"`, for a dropdown or mega menu
 * trigger: it fills the row below `md` and carries a chevron).
 */
export const navbarItemVariants = cva(focusOutline, {
  variants: {
    variant: { default: "", flush: "", inline: "" },
    expand: { md: "", never: "" },
    kind: {
      link: ["block", disabled].join(" "),
      button: "flex w-full cursor-pointer items-center justify-between font-medium",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      className: "rounded px-3 py-2 text-heading hover:bg-neutral-tertiary",
    },
    {
      variant: "default",
      expand: "md",
      className: "md:p-0 md:hover:bg-transparent md:hover:text-fg-brand",
    },
    { variant: "default", expand: "md", kind: "button", className: "md:w-auto" },
    /* The current page: filled with `brand` in the collapsed card, `fg-brand` text in the row. */
    {
      variant: "default",
      kind: "link",
      className:
        "aria-[current=page]:bg-brand aria-[current=page]:text-brand-foreground aria-[current=page]:hover:bg-brand",
    },
    {
      variant: "default",
      expand: "md",
      kind: "link",
      className:
        "md:aria-[current=page]:bg-transparent md:aria-[current=page]:text-fg-brand md:aria-[current=page]:hover:bg-transparent",
    },
    {
      variant: "flush",
      className:
        "rounded-xs border-b border-light px-3 py-2 text-heading hover:bg-neutral-secondary-soft",
    },
    {
      variant: "flush",
      expand: "md",
      className: "md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-fg-brand",
    },
    { variant: "flush", kind: "link", className: "aria-[current=page]:text-fg-brand" },
    { variant: "inline", className: "w-auto rounded-xs text-heading hover:underline" },
  ],
  defaultVariants: { variant: "default", expand: "md", kind: "link" },
});

/** Flowbite's `w-4 h-4 ms-1.5` chevron after a dropdown trigger's label. */
export const navbarChevronClassName = "ms-1.5 size-4 shrink-0";

export type NavbarVariantProps = VariantProps<typeof navbarVariants>;
export type NavbarCollapseVariantProps = Pick<
  VariantProps<typeof navbarCollapseVariants>,
  "variant"
>;
