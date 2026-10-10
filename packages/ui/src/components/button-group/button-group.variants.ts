import { cva, type VariantProps } from "class-variance-authority";

/*
 * Button group. The group owns the joined look, so `Button` stays unchanged: it carries
 * `rounded-base` and `shadow-xs`, and its children lose their own corners and shadows. Only the
 * outer corners stay rounded, neighbouring borders overlap (`-space-x-px`), grouped icons are 16px
 * and the focus halo is `ring-3`. Filled neighbours of the same colour are split by a `*-strong`
 * line. Accessibility: the focused button moves to the
 * `z.raised` layer so its keyboard outline is never hidden behind a neighbour.
 */
export const buttonGroupVariants = cva(
  [
    "inline-flex isolate rounded-base shadow-xs",
    "*:rounded-none *:shadow-none *:focus:ring-3 *:focus:z-raised *:focus-visible:z-raised",
    "[&>*>svg]:size-4",
    // The divider between two filled buttons of the same colour.
    "[&>.bg-brand+.bg-brand]:border-s-brand-strong [&>.bg-success+.bg-success]:border-s-success-strong",
    "[&>.bg-danger+.bg-danger]:border-s-danger-strong [&>.bg-warning+.bg-warning]:border-s-warning-strong",
    "[&>.bg-dark+.bg-dark]:border-s-dark-strong",
  ],
  {
    variants: {
      orientation: {
        horizontal: "-space-x-px *:first:rounded-s-base *:last:rounded-e-base rtl:space-x-reverse",
        vertical: "flex-col -space-y-px *:first:rounded-t-base *:last:rounded-b-base",
      },
      /** Outline group: dark outlined buttons that fill on hover. */
      outline: {
        true: "shadow-none *:border-dark-strong *:bg-neutral-primary *:text-heading *:hover:bg-dark *:hover:text-dark-foreground *:focus:ring-neutral-tertiary-soft",
        false: "",
      },
      pill: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        pill: true,
        className: "rounded-full *:first:rounded-s-full *:last:rounded-e-full",
      },
    ],
    defaultVariants: { orientation: "horizontal", outline: false, pill: false },
  },
);

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;
