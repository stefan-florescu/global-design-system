import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Copy-to-clipboard triggers:
 * - brand: the blue "Copy" button next to a field, or the icon button closing an input group;
 * - secondary: the gray icon button closing an input group (URL shortener);
 * - ghost: the icon button inside a field, a card or an address block;
 * - tertiary: the small bordered "Copy" chip inside a field or a code block.
 * Accessibility: keyboard focus adds the solid `ring` outline; in dark mode the tertiary chip's
 * label is `heading` and its copied icon `fg-brand-strong` (`body` and `fg-brand` on
 * `neutral-primary-strong` are under 4.5:1).
 */
export const clipboardVariants = cva(
  [
    "relative box-border inline-flex shrink-0 cursor-pointer items-center justify-center font-medium whitespace-nowrap select-none",
    focusOutline,
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "disabled:pointer-events-none disabled:text-fg-disabled",
  ],
  {
    variants: {
      variant: {
        brand:
          "rounded-base border border-transparent bg-brand text-sm leading-5 text-brand-foreground shadow-xs hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium",
        secondary:
          "rounded-base border border-default-medium bg-neutral-secondary-medium text-sm leading-5 text-body shadow-xs hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary",
        ghost: "rounded text-body hover:bg-neutral-quaternary hover:text-heading",
        tertiary:
          "rounded border border-default-strong bg-neutral-primary-strong px-3 py-1.5 text-xs leading-5 text-body hover:bg-neutral-secondary-strong/70 hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft dark:text-heading",
      },
      size: {
        sm: "",
        md: "",
      },
      iconOnly: {
        true: "[&_svg]:size-4",
        false: "",
      },
    },
    compoundVariants: [
      { variant: ["brand", "secondary"], size: "sm", className: "px-3 py-2" },
      { variant: ["brand", "secondary"], size: "md", className: "px-4 py-2.5" },
      { variant: "ghost", size: "sm", className: "p-1.5" },
      { variant: "ghost", size: "md", className: "p-2" },
    ],
    defaultVariants: { variant: "brand", size: "md", iconOnly: false },
  },
);

/** The check icon in front of "Copied!" on a brand or secondary text button. */
export const clipboardCheckClassName = "me-1 size-3";

/** The clipboard icon in front of the tertiary chip's label. */
export const clipboardChipIconClassName = "me-1.5 size-4";

export const clipboardChipLabelClassName = "text-xs font-semibold";

/** The copied state's icon (and the chip's label) is `fg-brand`. */
export const clipboardCopiedIconClassName = "text-fg-brand dark:text-fg-brand-strong";

export const clipboardCopiedLabelClassName = "text-fg-brand dark:text-heading";

export type ClipboardVariantProps = VariantProps<typeof clipboardVariants>;
