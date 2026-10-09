import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Shared look of every text-like field (Input, Select, Textarea, NumberInput…): Flowbite v4's
 * input field, class for class (https://flowbite.com/docs/forms/input-field/). The border is the
 * `input` token, Flowbite's gray-200 (gray-700 in dark). Invalid and valid states use Flowbite's
 * danger / success fields with a solid `danger` / `success` border, so the state reaches 3:1.
 */
export const fieldVariants = cva(
  [
    "block w-full min-w-0 rounded-base border border-input bg-neutral-secondary-medium text-heading shadow-xs",
    "placeholder:text-body",
    "outline-hidden focus:border-brand focus:ring-1 focus:ring-brand",
    "disabled:cursor-not-allowed disabled:text-fg-disabled",
    "aria-invalid:border-danger aria-invalid:bg-danger-soft aria-invalid:text-fg-danger-strong aria-invalid:placeholder:text-fg-danger-strong aria-invalid:focus:border-danger aria-invalid:focus:ring-danger",
    "data-valid:border-success data-valid:bg-success-soft data-valid:text-fg-success-strong data-valid:placeholder:text-fg-success-strong data-valid:focus:border-success data-valid:focus:ring-success",
  ],
  {
    variants: {
      size: {
        sm: "px-2.5 py-2 text-sm",
        md: "px-3 py-2.5 text-sm",
        lg: "px-3.5 py-3 text-base",
        xl: "px-4 py-3.5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/** Icon inside a field (Flowbite's input group with icon): 16px, `body` colour. */
export const fieldIconClassName =
  "pointer-events-none absolute inset-y-0 z-raised flex items-center text-body [&_svg]:size-4";

/** Text or icon attached to a field's edge (Flowbite's input group addon), with a 16px icon. */
export const fieldAddonClassName =
  "inline-flex shrink-0 items-center border border-input bg-neutral-tertiary px-3 text-sm text-body [&_svg]:size-4";

/*
 * Field groups (Flowbite's "dropdown input", currency and phone inputs): controls joined edge to
 * edge with overlapping 1px borders and one shared shadow. Square the inner corners of each part
 * (`rounded-e-none`, `rounded-none`, `rounded-s-none`) and drop their own shadows.
 */
export const fieldGroupClassName = "flex w-full -space-x-px rounded-base shadow-xs";

/**
 * A `Select` joined to a field, styled like Flowbite's dropdown button: `font-medium text-body`,
 * `px-4`, as wide as the chosen option (`field-sizing-content`, like Flowbite's button), gray
 * hover and the soft focus halo plus our solid keyboard outline. It keeps the field's `input`
 * border, so the group reads as one field at 3:1.
 */
export const fieldSelectAddonClassName = [
  "relative w-auto field-sizing-content ps-4 pe-9.5 font-medium text-body shadow-none",
  "hover:bg-neutral-tertiary-medium hover:text-heading",
  "focus:z-raised focus:ring-4 focus:ring-neutral-tertiary",
  focusOutline,
].join(" ");

/** A field inside a group: no own shadow, and lifted above its neighbours while focused. */
export const fieldGroupItemClassName = "relative shadow-none focus:z-raised";

export type FieldVariantProps = VariantProps<typeof fieldVariants>;
