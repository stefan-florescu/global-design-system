import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's toggle: a native checkbox with role="switch" laid over a track. Off is the `input`
 * colour and on is `brand` (both 3:1 against the page); the knob is `background`.
 */
export const toggleTrackVariants = cva(
  [
    "pointer-events-none relative block shrink-0 rounded-full bg-input transition-colors motion-reduce:transition-none",
    "after:absolute after:start-0.5 after:top-0.5 after:rounded-full after:bg-background after:shadow-sm",
    "after:transition-transform motion-reduce:after:transition-none",
    "peer-checked:bg-brand peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
    "peer-disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9 after:size-4",
        md: "h-6 w-11 after:size-5",
        lg: "h-7 w-13 after:size-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const toggleInputClassName =
  "peer absolute inset-0 z-raised m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed";

export type ToggleVariantProps = VariantProps<typeof toggleTrackVariants>;
