import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's button group: buttons joined edge to edge. Only the outer corners stay rounded,
 * neighbouring borders overlap so they read as one line, and the focused button moves to the
 * `z.raised` layer so its focus ring is drawn above its neighbours.
 */
export const buttonGroupVariants = cva(
  [
    "inline-flex isolate",
    "*:rounded-none *:focus-visible:z-raised",
    "*:first:rounded-s-lg *:last:rounded-e-lg *:not-first:-ms-px",
  ],
  {
    variants: {
      pill: {
        true: "*:first:rounded-s-full *:last:rounded-e-full",
        false: "",
      },
    },
    defaultVariants: { pill: false },
  },
);

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;
