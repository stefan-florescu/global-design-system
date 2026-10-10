import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { focusOutlineInset } from "../../lib/focus";

/*
 * Flowbite v4 tables, class for class (https://flowbite.com/docs/components/tables/), on our
 * semantic tokens.
 *
 * The table is server-safe, so its parts cannot read the table's options from React context.
 * Instead the `<table>` sets a few CSS variables (colours) and data attributes (striping, hover,
 * head style), and the parts read them: a row is `bg-(--table-row-bg)` and a striped row adds
 * `even:bg-(--table-row-alt)`. A `className` on a part still wins, because `cn()` replaces the
 * variable-based utility with yours.
 *
 * Flowbite's looks, as table options:
 * - default: `bg-neutral-primary` rows with `border-default` dividers under a
 *   `bg-neutral-secondary-soft` head, in a `bg-neutral-primary-soft` container with a
 *   `border-default` border, `rounded-base` corners and `shadow-xs`;
 * - `hoverable`: `bg-neutral-primary-soft` rows that turn `bg-neutral-secondary-medium` on hover,
 *   under a `bg-neutral-secondary-medium` head with a `border-default-medium` line (Flowbite uses
 *   this head on every table with hover, selection or a toolbar);
 * - `striped="rows"`: `odd:bg-neutral-primary even:bg-neutral-secondary-soft`;
 * - `striped="columns"`: odd columns `bg-neutral-secondary-soft`, on a `bg-neutral-primary`
 *   container with no head fill;
 * - `bordered={false}`: no container, no dividers, a `text-heading` semibold head ("Without
 *   border"); add `rounded` for Flowbite's table-foot example, a `bg-neutral-secondary-medium`
 *   head with `rounded-s-base` / `rounded-e-base` ends;
 * - `variant="brand"` (Flowbite's "Table colors"): `bg-brand` rows with `border-brand-light`
 *   dividers under a `bg-brand-strong` head (`bg-brand` when hoverable or striped by column);
 *   stripes and hover use `brand-strong`.
 *
 * Accessibility deviation: Flowbite's brand table sets body text in `fg-brand-subtle` (blue-200).
 * That passes on light `brand` (4.8:1) but not on dark `brand` (blue-600, 3.7:1), so dark mode
 * uses `brand-foreground` (white, 5.3:1) instead.
 */

type TableLookOptions = {
  variant?: "default" | "brand" | null;
  bordered?: boolean | null;
  rounded?: boolean | null;
  striped?: "rows" | "columns" | null;
  hoverable?: boolean | null;
};

/** How the head is drawn, exposed as `data-head` for the head cells. */
export function getTableHeadLook({
  variant,
  bordered = true,
  rounded,
}: TableLookOptions): "filled" | "plain" | "bar" {
  if (variant === "brand" || bordered) return "filled";
  return rounded ? "bar" : "plain";
}

/*
 * The CSS variables that colour the head, rows, stripes and dividers, one value each, picked in
 * the order Flowbite's examples imply. Written out in full so Tailwind finds every class.
 */
const headBg = {
  none: "[--table-head-bg:transparent]",
  soft: "[--table-head-bg:var(--sds-color-neutral-secondary-soft)]",
  medium: "[--table-head-bg:var(--sds-color-neutral-secondary-medium)]",
  brand: "[--table-head-bg:var(--sds-color-brand)]",
  brandStrong: "[--table-head-bg:var(--sds-color-brand-strong)]",
};
const headFg = {
  body: "[--table-head-fg:var(--sds-color-body)]",
  heading: "[--table-head-fg:var(--sds-color-heading)]",
  brand: "[--table-head-fg:var(--sds-color-brand-foreground)]",
};
const headBorder = {
  default: "[--table-head-border:var(--sds-color-default)]",
  medium: "[--table-head-border:var(--sds-color-default-medium)]",
  brand: "[--table-head-border:var(--sds-color-brand-light)]",
};
const headLine = { on: "[--table-head-line:1px]", off: "[--table-head-line:0px]" };
const rowBg = {
  none: "[--table-row-bg:transparent]",
  page: "[--table-row-bg:var(--sds-color-neutral-primary)]",
  soft: "[--table-row-bg:var(--sds-color-neutral-primary-soft)]",
  brand: "[--table-row-bg:var(--sds-color-brand)]",
};
const neutralAccents = [
  "[--table-row-alt:var(--sds-color-neutral-secondary-soft)]",
  "[--table-row-hover:var(--sds-color-neutral-secondary-medium)]",
  "[--table-col-alt:var(--sds-color-neutral-secondary-soft)]",
  "[--table-divider:var(--sds-color-default)]",
  "[--table-row-head-fg:var(--sds-color-heading)]",
];
const brandAccents = [
  "[--table-row-alt:var(--sds-color-brand-strong)]",
  "[--table-row-hover:var(--sds-color-brand-strong)]",
  "[--table-col-alt:var(--sds-color-brand-strong)]",
  "[--table-divider:var(--sds-color-brand-light)]",
  "[--table-row-head-fg:var(--sds-color-fg-brand-subtle)] dark:[--table-row-head-fg:var(--sds-color-brand-foreground)]",
];
const dividerWidth = { on: "[--table-divider-width:1px]", off: "[--table-divider-width:0px]" };

function tableVariables({
  variant,
  bordered = true,
  rounded = false,
  striped,
  hoverable = false,
}: TableLookOptions) {
  const columns = striped === "columns";

  if (variant === "brand") {
    return [
      hoverable || columns ? headBg.brand : headBg.brandStrong,
      headFg.brand,
      headBorder.brand,
      hoverable ? headLine.on : headLine.off,
      rowBg.brand,
      ...brandAccents,
      bordered ? dividerWidth.on : dividerWidth.off,
    ];
  }

  if (!bordered) {
    return [
      rounded ? headBg.medium : headBg.none,
      rounded ? headFg.body : headFg.heading,
      headBorder.default,
      headLine.off,
      columns ? rowBg.none : rowBg.page,
      ...neutralAccents,
      dividerWidth.off,
    ];
  }

  return [
    columns ? headBg.none : hoverable ? headBg.medium : headBg.soft,
    headFg.body,
    hoverable ? headBorder.medium : headBorder.default,
    headLine.on,
    columns ? rowBg.none : hoverable ? rowBg.soft : rowBg.page,
    ...neutralAccents,
    dividerWidth.on,
  ];
}

/** Class names for the `<table>`: Flowbite's `w-full text-sm text-left text-body`, plus the variables. */
export function tableVariants(options: TableLookOptions = {}) {
  return cn(
    "group/table w-full text-left text-sm rtl:text-right",
    options.variant === "brand" ? "text-fg-brand-subtle dark:text-brand-foreground" : "text-body",
    tableVariables(options),
  );
}

/** The box around the table: Flowbite's bordered, rounded card with `shadow-xs`. */
export const tableContainerVariants = cva("relative w-full", {
  variants: {
    bordered: {
      true: "overflow-hidden rounded-base border border-default",
      false: "",
    },
    shadow: { true: "", false: "" },
    surface: {
      soft: "bg-neutral-primary-soft",
      page: "bg-neutral-primary",
      none: "",
    },
  },
  compoundVariants: [{ bordered: true, shadow: true, className: "shadow-xs" }],
  defaultVariants: { bordered: true, shadow: true, surface: "soft" },
});

/**
 * The horizontal scroller around the `<table>`. It becomes focusable when it overflows, so the
 * keyboard draws the inset outline (an outset one would be clipped by the rounded container).
 */
export const tableScrollAreaClassName = cn("relative overflow-x-auto", focusOutlineInset);

/** Controls above the table (search, filters, bulk actions): Flowbite's `p-4` bar. */
export const tableToolbarClassName = "flex flex-wrap items-center justify-between gap-4 p-4";

/** Content under the table, such as pagination: Flowbite's `p-4` bar. */
export const tableFooterVariants = cva("flex flex-wrap items-center justify-between gap-4 p-4", {
  variants: {
    bordered: { true: "border-t border-default", false: "" },
  },
  defaultVariants: { bordered: true },
});

/** Flowbite's caption: an `text-lg` heading with an optional `text-sm` description. */
export const tableCaptionVariants = cva("text-left text-heading rtl:text-right", {
  variants: {
    visuallyHidden: {
      true: "sr-only",
      false: "p-5 text-lg font-medium",
    },
  },
  defaultVariants: { visuallyHidden: false },
});

export const tableCaptionDescriptionClassName = "mt-1.5 text-sm font-normal text-body";

/**
 * The head: its fill, text and bottom line come from the table. Under a visible caption or a
 * toolbar the line is drawn on top too, as in Flowbite's caption, search and filter examples.
 */
export const tableHeadClassName = [
  "bg-(--table-head-bg) text-(--table-head-fg)",
  "border-(--table-head-border) border-b-(length:--table-head-line)",
  "group-data-toolbar/table:border-t-(length:--table-head-line)",
  "[caption:not(.sr-only)+&]:border-t-(length:--table-head-line)",
].join(" ");

/** Flowbite's `<tfoot>` row: semibold `text-heading`, `py-3` cells and a `text-base` label. */
export const tableFootClassName =
  "font-semibold text-heading [&_td]:py-3 [&_th]:py-3 [&_th]:text-base [&_th]:font-semibold";

/** Odd columns of a table striped by column. */
const columnStripe = "group-data-[striped=columns]/table:odd:bg-(--table-col-alt)";

export const tableRowClassName = [
  "bg-(--table-row-bg) border-(--table-divider) border-b-(length:--table-divider-width) last:border-b-0",
  "group-data-[striped=rows]/table:even:bg-(--table-row-alt)",
  "group-data-hoverable/table:hover:bg-(--table-row-hover)",
].join(" ");

export const tableHeadCellVariants = cva(columnStripe, {
  variants: {
    scope: {
      // A column header in the head.
      col: [
        "px-6 py-3 font-medium",
        "group-data-[head=plain]/table:font-semibold",
        "group-data-[head=bar]/table:first:rounded-s-base group-data-[head=bar]/table:last:rounded-e-base",
      ],
      // A row header: the first cell of a body row, such as the product name.
      row: "px-6 py-4 font-medium whitespace-nowrap text-(--table-row-head-fg)",
    },
  },
  defaultVariants: { scope: "col" },
});

export const tableCellClassName = cn("px-6 py-4", columnStripe);

export type TableHeadCellVariantProps = VariantProps<typeof tableHeadCellVariants>;
