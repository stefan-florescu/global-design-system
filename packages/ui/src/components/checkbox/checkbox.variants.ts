import { cva, type VariantProps } from "class-variance-authority";

/*
 * Native checkboxes and radios, tinted with `accent-brand` so the browser keeps drawing them
 * (high-contrast and forced-colors modes included). Focus uses an outline in `ring`. `bordered`
 * puts the control and its text in a `border` box that turns `brand` when checked; the whole
 * box is clickable.
 */
export const choiceControlClassName = [
  "mt-0.5 size-4 shrink-0 cursor-pointer accent-brand",
  "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:outline-2 aria-invalid:outline-offset-1 aria-invalid:outline-destructive",
].join(" ");

export const choiceVariants = cva("relative flex items-start gap-2", {
  variants: {
    bordered: {
      true: "rounded-lg border border-border px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand-subtle/40",
      false: "",
    },
  },
  defaultVariants: { bordered: false },
});

export const choiceLabelVariants = cva("text-sm font-medium text-foreground", {
  variants: {
    bordered: {
      // Stretch the label over the box so clicking anywhere toggles the control.
      true: "cursor-pointer after:absolute after:inset-0 after:rounded-lg",
      false: "cursor-pointer",
    },
    disabled: {
      true: "cursor-not-allowed text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: { bordered: false, disabled: false },
});

export const choiceDescriptionClassName = "m-0 text-xs text-muted-foreground";

export type ChoiceVariantProps = VariantProps<typeof choiceVariants>;
