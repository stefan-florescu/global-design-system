import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Number inputs on the shared field styles. `default` with `stepper` gives "Control buttons": the
 * field sits between two secondary buttons that share its border (40px tall, `h-10`, at the base
 * size). `counter` is the "Counter input": round 24px buttons around a borderless value. The
 * browser's own spin buttons are hidden whenever our buttons are shown.
 */
const hideSpinButtons =
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

export const numberInputGroupVariants = cva("relative flex w-full", {
  variants: {
    variant: {
      default: "items-stretch rounded-base shadow-xs",
      counter: "items-center",
    },
  },
  defaultVariants: { variant: "default" },
});

export const numberInputFieldVariants = cva(hideSpinButtons, {
  variants: {
    variant: {
      default: "rounded-none border-x-0 text-center shadow-none",
      // The counter has no focus ring; keyboard focus draws the solid outline.
      counter: [
        "w-10 shrink-0 rounded-xs border-0 bg-transparent px-1 py-2 text-center shadow-none focus:ring-0",
        focusOutline,
      ],
    },
    size: { sm: "", md: "", lg: "", xl: "" },
    caption: {
      true: "pb-6 text-xs",
      false: "",
    },
  },
  compoundVariants: [{ variant: "default", size: "md", className: "h-10" }],
  defaultVariants: { variant: "default", size: "md", caption: false },
});

/** Our secondary `Button`, joined to the field (default) or shrunk to a 24px circle (counter). */
export const numberInputButtonVariants = cva(
  "shadow-none focus-visible:z-raised [&_svg]:text-heading",
  {
    variants: {
      variant: {
        default: "h-auto border-input px-3 py-0",
        counter: "size-6 rounded-full p-0 [&_svg]:size-3",
      },
      side: {
        start: "",
        end: "",
      },
    },
    compoundVariants: [
      { variant: "default", side: "start", className: "rounded-e-none" },
      { variant: "default", side: "end", className: "rounded-s-none" },
    ],
    defaultVariants: { variant: "default" },
  },
);

/** Text under the value inside the field, such as an icon and "Bedrooms". */
export const numberInputCaptionClassName =
  "pointer-events-none absolute bottom-1 start-1/2 flex -translate-x-1/2 items-center gap-1 text-xs text-body rtl:translate-x-1/2 [&_svg]:size-3 [&_svg]:text-body-subtle";

export type NumberInputVariantProps = Pick<
  VariantProps<typeof numberInputFieldVariants>,
  "variant"
>;
