import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's card on semantic tokens: `card` surface and text, `border` outline, `shadow-sm`.
 * Link cards add the `accent` hover surface and a focus ring.
 */
export const cardVariants = cva(
  "flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      horizontal: {
        true: "md:flex-row",
        false: "",
      },
      interactive: {
        true: [
          "no-underline transition-colors hover:bg-accent motion-reduce:transition-none",
          "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ],
        false: "",
      },
    },
    defaultVariants: { horizontal: false, interactive: false },
  },
);

export const cardImageVariants = cva("w-full object-cover", {
  variants: {
    horizontal: {
      true: "h-64 md:h-auto md:w-48",
      false: "",
    },
  },
  defaultVariants: { horizontal: false },
});

export const cardBodyClassName = "flex flex-1 flex-col justify-center gap-3 p-6";

export const cardTitleClassName = "m-0 text-2xl font-bold tracking-tight text-card-foreground";

export const cardDescriptionClassName = "m-0 text-muted-foreground";

export type CardVariantProps = Omit<VariantProps<typeof cardVariants>, "interactive">;
