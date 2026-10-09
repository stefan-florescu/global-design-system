import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4's toggle (https://flowbite.com/docs/forms/toggle/), class for class: a visually
 * hidden native checkbox (`peer`) followed by a track whose `after:` knob slides over when checked.
 *
 * Differences from Flowbite, for WCAG 2.2 AA:
 * - the off track is `input` instead of `neutral-quaternary`, so the switch reaches 3:1 against
 *   the page (1.4.11); the on track is `brand` and the knob `brand-foreground`, as in Flowbite.
 * - keyboard focus also draws the solid `ring` outline around Flowbite's `brand-soft` halo.
 * - the knob animation stops when the user prefers reduced motion.
 */
export const toggleTrackVariants = cva(
  [
    "pointer-events-none relative block shrink-0 rounded-full bg-input",
    "peer-checked:bg-brand peer-[:disabled:not(:checked)]:bg-neutral-tertiary",
    "peer-focus:ring-4 peer-focus:ring-brand-soft",
    "peer-focus-visible:outline-2 peer-focus-visible:outline-solid peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
    "after:absolute after:start-0.5 after:top-0.5 after:rounded-full after:bg-brand-foreground after:content-['']",
    "after:transition-all motion-reduce:after:transition-none",
    "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
    "forced-colors:border forced-colors:after:border",
  ],
  {
    variants: {
      /* Flowbite's "base" (`md`) and "large" toggles. */
      size: {
        md: "h-5 w-9 after:size-4",
        lg: "h-6 w-11 after:size-5",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* The <label> around input, track and text: the whole thing is the click target. */
export const toggleVariants = cva("inline-flex cursor-pointer has-[:disabled]:cursor-not-allowed", {
  variants: {
    /* Flowbite's "Toggle card". */
    bordered: {
      true: "rounded-base border border-default bg-neutral-primary-soft p-4 shadow-xs",
      false: "",
    },
    /* A label alone is centred on the track; a title with a description starts at its top. */
    align: {
      center: "items-center",
      start: "",
    },
  },
  defaultVariants: { bordered: false, align: "center" },
});

export const toggleInputClassName = "peer sr-only";

export const toggleLabelVariants = cva("select-none text-sm font-medium", {
  variants: {
    disabled: {
      true: "text-fg-disabled",
      false: "text-heading",
    },
  },
  defaultVariants: { disabled: false },
});

/* Text next to the track: a title with a description (`ms-2.5`), or the label alone (`ms-3`). */
export const toggleTextVariants = cva("select-none", {
  variants: {
    position: {
      label: "ms-3",
      description: "ms-2.5",
      /* Before the track, in the card with an icon. */
      start: "me-2.5",
    },
  },
  defaultVariants: { position: "label" },
});

export const toggleTitleClassName = "mb-1 block";
export const toggleDescriptionClassName = "block text-sm font-normal text-body";
export const toggleIconClassName = "mb-2 block text-heading [&_svg]:size-8";

export type ToggleVariantProps = VariantProps<typeof toggleTrackVariants> &
  Pick<VariantProps<typeof toggleVariants>, "bordered">;
