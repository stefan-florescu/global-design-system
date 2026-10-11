import { cva, type VariantProps } from "class-variance-authority";

import { focusOutlineInset } from "../../lib/focus";

/*
 * Bottom navigation: a 64px `neutral-primary-soft` bar with a `default` top border, items centred
 * in a `max-w-lg` grid, `body` icons and labels that turn `fg-brand` on a
 * `neutral-secondary-medium` hover. It sits on the `z.fixed` layer. Accessibility: the current
 * page is `fg-brand` (`aria-current`), and items draw the solid keyboard outline from lib/focus.
 */
export const bottomNavigationVariants = cva("z-fixed border-default bg-neutral-primary-soft", {
  variants: {
    position: {
      fixed: "fixed bottom-0 left-0 w-full",
      sticky: "sticky bottom-0 left-0 w-full",
      static: "relative w-full",
    },
    /** "Application bar": a rounded bar inset from the bottom edge. */
    floating: {
      true: "max-w-lg rounded-full border",
      false: "border-t",
    },
  },
  compoundVariants: [
    { floating: true, position: "fixed", className: "bottom-4 left-1/2 -translate-x-1/2" },
    { floating: true, position: "static", className: "mx-auto" },
  ],
  defaultVariants: { position: "fixed", floating: false },
});

export const bottomNavigationListVariants = cva(
  "mx-auto my-0 grid h-16 max-w-lg list-none auto-cols-fr grid-flow-col p-0 font-medium",
  {
    variants: {
      bordered: {
        true: "divide-x divide-default border-x border-default rtl:divide-x-reverse",
        false: "",
      },
      floating: {
        true: "[&>li:first-child>*]:rounded-s-full [&>li:last-child>*]:rounded-e-full",
        false: "",
      },
    },
    defaultVariants: { bordered: false, floating: false },
  },
);

export const bottomNavigationItemClassName = [
  "group inline-flex size-full cursor-pointer flex-col items-center justify-center px-5 text-body no-underline",
  "hover:bg-neutral-secondary-medium hover:text-fg-brand",
  "aria-[current=page]:text-fg-brand aria-[current=true]:text-fg-brand",
  focusOutlineInset,
  "[&_svg]:mb-1 [&_svg]:size-6 [&_svg]:shrink-0",
].join(" ");

export const bottomNavigationLabelClassName = "text-sm";

export type BottomNavigationVariantProps = VariantProps<typeof bottomNavigationVariants> &
  Omit<VariantProps<typeof bottomNavigationListVariants>, "floating">;
