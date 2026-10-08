import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's chat bubble on semantic tokens: the `muted` surface (default), a `border` outline
 * on `background`, or no surface at all (clean). The corner nearest the avatar stays square.
 */
export const chatBubbleVariants = cva("flex items-start gap-2.5", {
  variants: {
    align: {
      start: "",
      end: "flex-row-reverse",
    },
  },
  defaultVariants: { align: "start" },
});

export const chatBubbleBodyVariants = cva(
  "flex w-full max-w-80 min-w-0 flex-col gap-1 text-sm text-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted p-4",
        outline: "border border-border bg-background p-4",
        clean: "",
      },
      align: {
        start: "rounded-e-xl rounded-es-xl",
        end: "rounded-s-xl rounded-ee-xl",
      },
    },
    defaultVariants: { variant: "default", align: "start" },
  },
);

export const chatBubbleMetaClassName = "flex items-center gap-2";

export const chatBubbleMutedClassName = "text-sm text-muted-foreground";

export type ChatBubbleVariantProps = VariantProps<typeof chatBubbleBodyVariants>;
