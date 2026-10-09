import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4 pagination, class for class (https://flowbite.com/docs/components/pagination/), on
 * our semantic tokens. Four layouts, after flowbite-react's `layout` and Flowbite's sections:
 * - `pagination`: numbered pages joined edge to edge (`-space-x-px`), outer corners rounded;
 * - `navigation`: Flowbite's "Previous and next": two separate `shadow-xs` buttons;
 * - `table`: "Table data pagination": "Showing 1 to 10 of 100 Entries" over joined buttons;
 * - `single`: "Single pagination": icon buttons around "1 of 99" in one `shadow-xs` group.
 * Two sizes: `sm` is Flowbite's 36px row (`h-9`, `px-3 py-2`), `md` its 40px row (`h-10`,
 * `px-4 py-2.5`). Accessibility additions: the solid keyboard outline from lib/focus on a raised
 * layer so neighbours never cover it, and Flowbite's disabled-button look for the ends.
 */
export const paginationVariants = cva("flex", {
  variants: {
    layout: {
      pagination: "flex-wrap items-center gap-4",
      navigation: "flex-wrap items-center gap-4",
      table: "flex-col items-center gap-4",
      single: "flex-wrap items-center gap-4",
    },
  },
  defaultVariants: { layout: "pagination" },
});

/** Joined layouts round only the outer corners of their first and last controls. */
const joined = "-space-x-px [&>li:first-child>*]:rounded-s-base [&>li:last-child>*]:rounded-e-base";

export const paginationListVariants = cva("m-0 flex list-none p-0 text-sm", {
  variants: {
    layout: {
      pagination: joined,
      navigation: "gap-2",
      table: `inline-flex ${joined}`,
      single: `inline-flex rounded-base shadow-xs ${joined}`,
    },
  },
  defaultVariants: { layout: "pagination" },
});

export const paginationItemVariants = cva(
  [
    "relative box-border flex shrink-0 cursor-pointer items-center justify-center border border-default-medium bg-neutral-secondary-medium text-sm text-body no-underline select-none",
    "hover:bg-neutral-tertiary-medium hover:text-heading focus-visible:z-raised",
    focusOutline,
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // Flowbite's disabled button, for the ends of the range (`disabled` or `aria-disabled`).
    "disabled:pointer-events-none disabled:bg-disabled disabled:text-fg-disabled",
    "aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:bg-disabled aria-disabled:text-fg-disabled",
  ],
  {
    variants: {
      /**
       * `page`: a square page number. `step`: previous / next with a text label. `icon`: an
       * icon-only previous / next. `button`: the separate (navigation) or joined (table)
       * previous / next buttons, with Flowbite's `shadow-xs`.
       */
      shape: {
        page: "font-medium",
        step: "font-medium",
        icon: "font-medium",
        button: "inline-flex leading-5 font-medium shadow-xs",
      },
      size: {
        sm: "",
        md: "",
      },
      /** The current page: `fg-brand` on `neutral-tertiary-medium`, no hover change. */
      current: {
        true: "bg-neutral-tertiary-medium text-fg-brand hover:text-fg-brand",
        false: "",
      },
      /** Flowbite's "Single pagination" buttons add a 3px halo on focus. */
      ring: {
        true: "focus:z-raised focus:ring-3 focus:ring-neutral-tertiary",
        false: "",
      },
    },
    compoundVariants: [
      { shape: ["page", "icon"], size: "sm", className: "h-9 w-9" },
      { shape: ["page", "icon"], size: "md", className: "h-10 w-10" },
      { shape: "step", size: "sm", className: "h-9 px-3" },
      { shape: "step", size: "md", className: "h-10 px-3" },
      { shape: "button", size: "sm", className: "px-3 py-2" },
      { shape: "button", size: "md", className: "px-4 py-2.5" },
    ],
    defaultVariants: { shape: "page", size: "md", current: false, ring: false },
  },
);

/** Arrow beside a text label (Flowbite's "with icons" buttons): 16px, pulled toward the edge. */
export const paginationPreviousIconClassName = "me-1.5 -ms-0.5";
export const paginationNextIconClassName = "ms-1.5 -me-0.5";

/** Ellipsis between page ranges: a page-sized box that is not a control. */
export const paginationEllipsisVariants = cva(
  "box-border flex items-center justify-center border border-default-medium bg-neutral-secondary-medium text-sm font-medium text-body",
  {
    variants: { size: { sm: "h-9 w-9", md: "h-10 w-10" } },
    defaultVariants: { size: "md" },
  },
);

/** "1 of 99" between the single layout's buttons: Flowbite's middle segment, not a control. */
export const paginationPageInfoVariants = cva(
  "box-border inline-flex shrink-0 items-center justify-center border border-default-medium bg-neutral-secondary-medium px-3 text-sm leading-5 text-body",
  {
    variants: { size: { sm: "h-9", md: "h-10" } },
    defaultVariants: { size: "md" },
  },
);

/** "Showing 1 to 10 of 100 Entries" above the table layout's buttons. */
export const paginationTableInfoClassName =
  "text-sm text-body [&_strong]:font-semibold [&_strong]:text-heading";

export type PaginationVariantProps = VariantProps<typeof paginationVariants>;
export type PaginationItemVariantProps = VariantProps<typeof paginationItemVariants>;
