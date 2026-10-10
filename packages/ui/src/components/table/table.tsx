import {
  Children,
  isValidElement,
  useId,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

import { TableScrollArea } from "./table-scroll-area";
import {
  getTableHeadLook,
  tableCaptionDescriptionClassName,
  tableCaptionVariants,
  tableCellClassName,
  tableContainerVariants,
  tableFootClassName,
  tableFooterVariants,
  tableHeadCellVariants,
  tableHeadClassName,
  tableRowClassName,
  tableToolbarClassName,
  tableVariants,
} from "./table.variants";

export type TableProps = Omit<ComponentProps<"table">, "color"> & {
  /** Flowbite's "Table colors": `brand` fills the head and rows with the brand colour. */
  variant?: "default" | "brand";
  /** Alternate the fill of every second row (`true` or `"rows"`) or column (`"columns"`). */
  striped?: boolean | "rows" | "columns";
  /** Fill a row when the pointer is over it. Also gives the head Flowbite's stronger fill. */
  hoverable?: boolean;
  /**
   * Flowbite's card around the table (border, rounded corners, fill) and the lines between rows.
   * Turn it off for the "Without border" style.
   */
  bordered?: boolean;
  /** The `shadow-xs` under the bordered card. */
  shadow?: boolean;
  /** Without a border: fill the head and round its ends (Flowbite's table-foot example). */
  rounded?: boolean;
  /** Controls shown above the table, inside the card: search, filters, bulk actions. */
  toolbar?: ReactNode;
  /** Content shown under the table, inside the card, such as pagination. */
  footer?: ReactNode;
  /** Classes for the card around the table. `className` goes to the `<table>`. */
  containerClassName?: string;
};

/**
 * Rows and columns of data in a native `<table>` (Flowbite's table). Build it from `TableCaption`,
 * `TableHead` with `TableHeadCell`s, `TableBody` with `TableRow`s of `TableHeadCell scope="row"`
 * and `TableCell`, and `TableFoot`. Server-safe; only the horizontal scroller runs on the client,
 * to become focusable when the table is wider than its container.
 */
export function Table({
  variant = "default",
  striped = false,
  hoverable = false,
  bordered = true,
  shadow = true,
  rounded = false,
  toolbar,
  footer,
  containerClassName,
  className,
  children,
  ...props
}: TableProps) {
  const stripes = striped === true ? "rows" : striped || undefined;
  const look = { variant, bordered, rounded, striped: stripes, hoverable };
  const surface = !bordered ? "none" : stripes === "columns" ? "page" : "soft";

  return (
    <div
      data-slot="table-container"
      className={cn(tableContainerVariants({ bordered, shadow, surface }), containerClassName)}
    >
      {toolbar ? (
        <div data-slot="table-toolbar" className={tableToolbarClassName}>
          {toolbar}
        </div>
      ) : null}
      <TableScrollArea>
        <table
          data-slot="table"
          data-striped={stripes}
          data-hoverable={hoverable || undefined}
          data-toolbar={toolbar ? "" : undefined}
          data-head={getTableHeadLook(look)}
          className={cn(tableVariants(look), className)}
          {...props}
        >
          {children}
        </table>
      </TableScrollArea>
      {footer ? (
        <div data-slot="table-footer" className={tableFooterVariants({ bordered })}>
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export type TableCaptionProps = ComponentProps<"caption"> & {
  /** Supporting text under the title. */
  description?: ReactNode;
  /** Keep the caption for screen readers only. Every table should have a caption. */
  visuallyHidden?: boolean;
};

/**
 * The table's title (`<caption>`), read when screen-reader users reach the table and used to
 * name its scroller. Put it first in the `Table`.
 */
export function TableCaption({
  description,
  visuallyHidden = false,
  className,
  children,
  ...props
}: TableCaptionProps) {
  const titleId = useId();
  return (
    <caption
      data-slot="table-caption"
      className={cn(tableCaptionVariants({ visuallyHidden }), className)}
      {...props}
    >
      <span id={titleId} data-slot="table-caption-title">
        {children}
      </span>
      {description ? (
        <p data-slot="table-caption-description" className={tableCaptionDescriptionClassName}>
          {description}
        </p>
      ) : null}
    </caption>
  );
}

/** True when the children are rows (`<tr>` or `TableRow`), not cells. */
function holdsRows(children: ReactNode) {
  return Children.toArray(children).some(
    (child) => isValidElement(child) && (child.type === "tr" || child.type === TableRow),
  );
}

/** Wraps cells in a row, so `TableHead` and `TableFoot` take cells directly. */
function wrapCells(children: ReactNode): ReactElement | ReactNode {
  return holdsRows(children) ? children : <tr>{children}</tr>;
}

export type TableHeadProps = ComponentProps<"thead">;

/**
 * The column headers (`<thead>`). Put `TableHeadCell`s directly inside; they are wrapped in one
 * row. For a head of several rows, pass `<tr>` elements instead.
 */
export function TableHead({ className, children, ...props }: TableHeadProps) {
  return (
    <thead data-slot="table-head" className={cn(tableHeadClassName, className)} {...props}>
      {wrapCells(children)}
    </thead>
  );
}

export type TableHeadCellProps = ComponentProps<"th">;

/**
 * A header cell (`<th>`). In `TableHead` it heads a column (`scope="col"`, the default); as the
 * first cell of a body row, set `scope="row"` to head the row, such as a product name.
 */
export function TableHeadCell({ scope = "col", className, ...props }: TableHeadCellProps) {
  return (
    <th
      scope={scope}
      data-slot="table-head-cell"
      className={cn(tableHeadCellVariants({ scope: scope === "row" ? "row" : "col" }), className)}
      {...props}
    />
  );
}

export type TableBodyProps = ComponentProps<"tbody">;

/** The data rows (`<tbody>`). */
export function TableBody(props: TableBodyProps) {
  return <tbody data-slot="table-body" {...props} />;
}

export type TableRowProps = ComponentProps<"tr">;

/** A body row: fill, divider, stripes and hover come from the `Table`. */
export function TableRow({ className, ...props }: TableRowProps) {
  return <tr data-slot="table-row" className={cn(tableRowClassName, className)} {...props} />;
}

export type TableCellProps = ComponentProps<"td">;

/** A data cell (`<td>`). */
export function TableCell({ className, ...props }: TableCellProps) {
  return <td data-slot="table-cell" className={cn(tableCellClassName, className)} {...props} />;
}

export type TableFootProps = ComponentProps<"tfoot">;

/**
 * Totals under the data (`<tfoot>`). Put the cells directly inside (a `TableHeadCell scope="row"`
 * label and `TableCell`s); they are wrapped in one row. For several rows, pass `<tr>` elements.
 */
export function TableFoot({ className, children, ...props }: TableFootProps) {
  return (
    <tfoot data-slot="table-foot" className={cn(tableFootClassName, className)} {...props}>
      {wrapCells(children)}
    </tfoot>
  );
}
