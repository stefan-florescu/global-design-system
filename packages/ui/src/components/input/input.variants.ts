import { cva, type VariantProps } from "class-variance-authority";

/*
 * Shared look of every text-like field (Input, Select, Textarea, NumberInput…), from Flowbite's
 * input field on semantic tokens: `background` surface, `input` border (3:1 against the page in
 * both themes), `ring` focus, `destructive` / `success` borders for invalid / valid, `muted`
 * when disabled. Heights match Button: sm 36px, md 40px, lg 48px.
 */
export const fieldVariants = cva(
  [
    "block w-full min-w-0 rounded-lg border border-input bg-background text-foreground",
    "placeholder:text-muted-foreground",
    "transition-colors motion-reduce:transition-none",
    "outline-hidden focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground",
    "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
    "data-valid:border-success data-valid:focus-visible:ring-success",
  ],
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const fieldIconClassName =
  "pointer-events-none absolute inset-y-0 flex items-center text-muted-foreground [&_svg]:size-4";

export const fieldAddonClassName =
  "inline-flex shrink-0 items-center border border-input bg-muted px-3 text-sm text-muted-foreground";

export type FieldVariantProps = VariantProps<typeof fieldVariants>;
