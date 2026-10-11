import { cva, type VariantProps } from "class-variance-authority";

/*
 * Steppers on our semantic tokens. Each `variant` is one layout:
 * - `default`: numbers and names in a row, joined by a line (a slash on small screens);
 * - `progress`: icon markers joined by a thick line, with the names visually hidden;
 * - `detailed`: icon markers with a name and a description, stacked on small screens;
 * - `vertical`: a column of cards, each with a check or an arrow;
 * - `breadcrumb`: numbered names in a bordered bar, separated by double chevrons;
 * - `timeline`: icon markers on a vertical line, with a name and a description.
 *
 * Steps are `complete`, `current` or `upcoming`. Complete steps are brand (success in the vertical
 * and timeline steppers) and upcoming ones neutral. The current step is brand and, so that it is
 * not told apart by colour alone (WCAG 1.4.1), also has a shape: a filled number in the `default`
 * and `breadcrumb` steppers, a brand border round the marker in `progress`, `detailed` and
 * `timeline`, and a 2px brand outline on the `vertical` card.
 *
 * Separators are `aria-hidden` elements, so screen readers don't read the slash. Spacing uses
 * `gap-*`, so it also works right to left.
 */
export const stepperVariants = cva("m-0 list-none p-0", {
  variants: {
    variant: {
      default: "flex w-full items-center text-center text-sm font-medium text-body sm:text-base",
      progress: "flex w-full items-center gap-4",
      detailed: "w-full items-center space-y-4 sm:flex sm:gap-8 sm:space-y-0",
      vertical: "w-72 space-y-4",
      breadcrumb:
        "flex w-full items-center gap-2 rounded-base border border-default bg-neutral-primary-soft p-3 text-center text-sm font-medium text-body shadow-xs sm:gap-4 sm:p-4",
      timeline: "relative border-s border-default text-body",
    },
  },
  defaultVariants: { variant: "default" },
});

export type StepperVariant = NonNullable<VariantProps<typeof stepperVariants>["variant"]>;
export type StepperStatus = "complete" | "current" | "upcoming";

/** The `<li>` of each step. `last` is the final step, which has no connector. */
export const stepperItemVariants = cva("flex items-center", {
  variants: {
    variant: {
      default: "",
      progress: "w-full",
      detailed: "gap-3",
      vertical: "block",
      breadcrumb: "",
      timeline: "mb-10 ms-7 block",
    },
    status: {
      complete: "",
      current: "",
      upcoming: "",
    },
    last: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { variant: "default", last: false, className: "md:w-full" },
    { variant: "default", status: ["complete", "current"], className: "text-fg-brand" },
    { variant: "progress", status: ["complete", "current"], className: "text-fg-brand" },
    { variant: "detailed", status: ["complete", "current"], className: "text-fg-brand" },
    { variant: "detailed", status: "upcoming", className: "text-body" },
    { variant: "breadcrumb", status: ["complete", "current"], className: "text-fg-brand" },
    { variant: "timeline", last: true, className: "mb-0" },
  ],
  defaultVariants: { variant: "default", status: "upcoming", last: false },
});

/** The line (or slash) after a step in the `default` and `progress` steppers. */
export const stepperConnectorVariants = cva("", {
  variants: {
    variant: {
      default: "hidden h-1 w-full border-b border-default sm:mx-6 sm:inline-block xl:mx-10",
      progress: "ms-4 inline-block h-1 w-full rounded-full border-4",
    },
    status: {
      complete: "",
      current: "",
      upcoming: "",
    },
  },
  compoundVariants: [
    { variant: "progress", status: "complete", className: "border-brand-subtle" },
    { variant: "progress", status: ["current", "upcoming"], className: "border-default" },
  ],
  defaultVariants: { variant: "default", status: "upcoming" },
});

/** The slash between steps on small screens in the `default` stepper. */
export const stepperSlashClassName = "mx-2 text-fg-disabled sm:hidden";

/** The double chevron between steps in the `breadcrumb` stepper. */
export const stepperChevronClassName = "ms-2 size-5 shrink-0 rtl:rotate-180";

/** The number or icon of a step. */
export const stepperMarkerVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "",
      progress: "flex size-10 items-center justify-center rounded-full lg:size-12 [&_svg]:size-5",
      detailed: "flex size-10 items-center justify-center rounded-full lg:size-12 [&_svg]:size-5",
      vertical: "size-5 [&_svg]:size-5",
      breadcrumb: "me-2 flex size-5 items-center justify-center rounded-full border text-xs",
      timeline:
        "absolute -start-4 flex size-8 items-center justify-center rounded-full ring-4 ring-buffer [&_svg]:size-5",
    },
    status: {
      complete: "",
      current: "",
      upcoming: "",
    },
  },
  compoundVariants: [
    // Default: a check when complete, a plain number when upcoming, a filled number when current.
    { variant: "default", status: "complete", className: "me-1.5 size-5" },
    { variant: "default", status: "upcoming", className: "me-2" },
    {
      variant: "default",
      status: "current",
      className:
        "me-2 flex size-5 items-center justify-center rounded-full bg-brand text-xs text-brand-foreground",
    },
    {
      variant: ["progress", "detailed"],
      status: "complete",
      className: "bg-brand-softer text-fg-brand",
    },
    {
      variant: ["progress", "detailed"],
      status: "current",
      className: "border-2 border-brand bg-brand-softer text-fg-brand",
    },
    {
      variant: ["progress", "detailed"],
      status: "upcoming",
      className: "bg-neutral-tertiary text-body",
    },
    { variant: "breadcrumb", status: "complete", className: "border-brand" },
    {
      variant: "breadcrumb",
      status: "current",
      className: "border-brand bg-brand text-brand-foreground",
    },
    { variant: "breadcrumb", status: "upcoming", className: "border-body" },
    {
      variant: "timeline",
      status: "complete",
      className: "bg-success-soft text-fg-success-strong",
    },
    {
      variant: "timeline",
      status: "current",
      className: "border-2 border-brand bg-brand-softer text-fg-brand",
    },
    { variant: "timeline", status: "upcoming", className: "bg-neutral-tertiary text-body" },
  ],
  defaultVariants: { variant: "default", status: "upcoming" },
});

/** The card of a step in the `vertical` stepper. */
export const stepperCardVariants = cva(
  "flex w-full items-center justify-between gap-2 rounded-base border p-4",
  {
    variants: {
      status: {
        complete: "border-success-subtle bg-success-soft text-fg-success-strong",
        current: "border-brand bg-brand-softer text-fg-brand-strong ring-1 ring-brand",
        upcoming: "border-default bg-neutral-secondary-soft text-body",
      },
    },
    defaultVariants: { status: "upcoming" },
  },
);

/** The name of a step in the `detailed`, `vertical` and `timeline` steppers. */
export const stepperTitleClassName = "block font-medium leading-tight";

/** The vertical card's title keeps the default line height. */
export const stepperCardTitleClassName = "font-medium";

/** The text under a step's name. */
export const stepperDescriptionClassName = "block text-sm";

export type StepperVariantProps = VariantProps<typeof stepperVariants>;
