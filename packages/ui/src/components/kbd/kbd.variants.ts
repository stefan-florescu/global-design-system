import { cva, type VariantProps } from "class-variance-authority";

/*
 * KBD: a `text-xs` semibold key in `heading` on the `neutral-tertiary` surface, with a
 * `default-medium` border and `rounded-base` corners. The monospace face comes from the `<kbd>`
 * element (Tailwind's preflight maps it to the `font-mono` token). Keys holding an icon (arrow
 * keys) become `inline-flex` and the icon is 10px.
 *
 * `size="sm"` is a compact key for hints inside buttons and fields (such as a search
 * shortcut), where the default key is too tall.
 */
export const kbdVariants = cva(
  "border border-default-medium bg-neutral-tertiary font-semibold text-heading has-[svg]:inline-flex has-[svg]:items-center [&_svg]:size-2.5 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "rounded px-1.5 py-0.5 text-xs",
        md: "rounded-base px-2 py-1.5 text-xs",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type KbdVariantProps = VariantProps<typeof kbdVariants>;
