import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Footer.
 *
 * - `default`: the `neutral-primary-soft` band of "Social media icons".
 * - `card`: the "Default footer" card: border, `rounded-base` corners and `shadow-xs`.
 * - `sticky`: fixed to the bottom of the viewport with a top border and `shadow-sm`, as in
 *   "Sticky footer". It sits on the `z.fixed` layer, like Banner.
 *
 * Layout (the max-width container, grids, the flex row) stays in your markup, so every
 * arrangement is possible. Accessibility: links and icons draw the solid keyboard outline from
 * lib/focus.
 */
export const footerVariants = cva("bg-neutral-primary-soft", {
  variants: {
    variant: {
      default: "",
      card: "rounded-base border border-default shadow-xs",
      sticky:
        "fixed bottom-0 start-0 z-fixed w-full border-t border-default p-4 shadow-sm md:flex md:items-center md:justify-between md:p-6",
    },
  },
  defaultVariants: { variant: "default" },
});

const linkFocus = ["rounded-xs", focusOutline].join(" ");

/** Logo link: the mark, then the name in `text-2xl` semibold `heading`. */
export const footerBrandClassName = ["flex items-center gap-3", linkFocus].join(" ");
/** A logo image (`src`), 28px tall. */
export const footerBrandImageClassName = "h-7 w-auto shrink-0";
/** A logo mark element (`logo`), 28px, in `fg-brand`. */
export const footerBrandMarkClassName = "flex shrink-0 text-fg-brand [&_svg]:size-7";
export const footerBrandNameClassName =
  "self-center text-2xl font-semibold whitespace-nowrap text-heading";

/** Section heading over a column of links. */
export const footerTitleClassName = "mb-6 text-sm font-semibold text-heading uppercase";

/** The list of links: a wrapping row, or a column with 16px between links. */
export const footerLinkListVariants = cva("m-0 list-none p-0 font-medium text-body", {
  variants: {
    vertical: {
      false:
        "flex flex-wrap items-center text-sm [&>li:not(:last-child)]:me-4 md:[&>li:not(:last-child)]:me-6",
      true: "[&>li:not(:last-child)]:mb-4",
    },
  },
  defaultVariants: { vertical: false },
});

export const footerLinkClassName = ["hover:underline", linkFocus].join(" ");

/** `© year By. All Rights Reserved.` in `text-sm` `body`. */
export const footerCopyrightClassName = "m-0 text-sm text-body sm:text-center";

export const footerDividerClassName = "my-6 border-default sm:mx-auto lg:my-8";

/** Row of social icons, 20px apart. */
export const footerIconsClassName = "m-0 flex list-none items-center gap-5 p-0";

export const footerIconClassName = [
  "flex text-body hover:text-heading [&_svg]:size-5 [&_svg]:shrink-0",
  linkFocus,
].join(" ");

export type FooterVariantProps = VariantProps<typeof footerVariants>;
