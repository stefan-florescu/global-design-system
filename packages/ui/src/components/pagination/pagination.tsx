import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "@stefan-florescu/icons";
import type { ComponentProps, MouseEvent, ReactElement, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Tooltip } from "../tooltip/tooltip";

import {
  paginationEllipsisVariants,
  paginationItemVariants,
  paginationListVariants,
  paginationNextIconClassName,
  paginationPageInfoVariants,
  paginationPreviousIconClassName,
  paginationTableInfoClassName,
  paginationVariants,
  type PaginationItemVariantProps,
  type PaginationVariantProps,
} from "./pagination.variants";

export type PaginationLayout = NonNullable<PaginationVariantProps["layout"]>;
export type PaginationSize = "sm" | "md";

/** What the `table` and `single` layouts show as text. */
export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  /** First item on the current page (1-based; 0 when there are no items). */
  firstItem: number;
  /** Last item on the current page. */
  lastItem: number;
  totalItems: number;
};

export type PaginationProps = Omit<ComponentProps<"nav">, "children"> & {
  /** The page being shown, starting at 1. */
  currentPage: number;
  /** Number of pages. In the `table` layout it defaults to `totalItems / itemsPerPage`. */
  totalPages?: number;
  /**
   * Called with the page to show when a control is pressed (and the click event, so a link can
   * `preventDefault()` for client-side routing). Not called for the current page.
   */
  onPageChange?: (page: number, event: MouseEvent<HTMLElement>) => void;
  /** Return a URL to render every control as a link instead of a button. */
  getPageHref?: (page: number) => string;
  /**
   * `pagination`: numbered pages. `navigation`: separate previous / next buttons. `table`:
   * "Showing 1 to 10 of 100 Entries" over joined previous / next. `single`: previous and next
   * around "1 of 99".
   */
  layout?: PaginationLayout;
  /** `sm` is Flowbite's 36px row, `md` its 40px row. */
  size?: PaginationSize;
  /**
   * Show arrows. In `pagination` the previous / next controls become icon-only (their label
   * stays as visually hidden text); in `navigation` and `table` an arrow joins the label.
   * The `single` layout always shows icons.
   */
  showIcons?: boolean;
  /**
   * Show Flowbite's "Previous" / "Next" tooltips on icon-only previous and next controls (the
   * `single` layout, or `pagination` with `showIcons`). The tooltip is the control's name.
   */
  showTooltips?: boolean;
  /** Pages shown on each side of the current one in the `pagination` layout. */
  siblingCount?: number;
  /** Always show the first and last page, with an ellipsis over any gap. */
  showEllipsis?: boolean;
  /** Label of the previous control (visually hidden when icon-only). */
  previousLabel?: string;
  /** Label of the next control (visually hidden when icon-only). */
  nextLabel?: string;
  /** Accessible name of a page control. */
  getPageLabel?: (page: number) => string;
  /** Items per page, for the `table` layout. */
  itemsPerPage?: number;
  /** Total number of items, for the `table` layout. */
  totalItems?: number;
  /**
   * Replace the text of the `table` layout ("Showing 1 to 10 of 100 Entries") or the `single`
   * layout ("1 of 99"), for example to translate it.
   */
  renderInfo?: (info: PaginationInfo) => ReactNode;
  /** Extra controls after the pages, inside the landmark, such as a page-size select. */
  children?: ReactNode;
};

type PageItem = number | "start-ellipsis" | "end-ellipsis";

const range = (from: number, to: number) =>
  Array.from({ length: Math.max(0, to - from + 1) }, (_, index) => from + index);

/**
 * The pages to list: a window of `siblingCount` pages on each side of the current one, shifted
 * at the ends so it always holds `2 × siblingCount + 1` pages when there are that many. With
 * `showEllipsis`, the first and last pages are always listed and gaps become an ellipsis.
 */
export function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 2,
  showEllipsis = false,
): PageItem[] {
  const total = Math.max(0, Math.floor(totalPages));
  const current = Math.min(Math.max(1, currentPage), Math.max(1, total));
  const siblings = Math.max(0, siblingCount);

  if (!showEllipsis) {
    const size = 2 * siblings + 1;
    const start = Math.max(1, Math.min(current - siblings, total - size + 1));
    return range(start, Math.min(total, start + size - 1));
  }

  // First, last, current, its siblings and two ellipses.
  const slots = 2 * siblings + 5;
  if (total <= slots) return range(1, total);

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showStart = left > 3;
  const showEnd = right < total - 2;
  const edge = 3 + 2 * siblings;

  if (!showStart) return [...range(1, edge), "end-ellipsis", total];
  if (!showEnd) return [1, "start-ellipsis", ...range(total - edge + 1, total)];
  return [1, "start-ellipsis", ...range(left, right), "end-ellipsis", total];
}

type ControlProps = Omit<ComponentProps<"button">, "children" | "className"> & {
  page: number;
  disabled?: boolean;
  current?: boolean;
  label?: string;
  className: string;
  children: ReactNode;
  getPageHref?: (page: number) => string;
  onPageChange?: PaginationProps["onPageChange"];
  activePage: number;
};

/** One control: a link when `getPageHref` is set, otherwise a button. */
function PaginationControl({
  page,
  disabled,
  current,
  label,
  className,
  children,
  getPageHref,
  onPageChange,
  activePage,
  ...rest
}: ControlProps) {
  const ariaCurrent = current ? ("page" as const) : undefined;
  const onClick =
    onPageChange && !disabled
      ? (event: MouseEvent<HTMLElement>) => {
          if (page !== activePage) onPageChange(page, event);
        }
      : undefined;
  // A wrapping tooltip passes its own handlers; keep both. Without either, no handler is set, so
  // link pagination stays server-safe.
  const ownClick = rest.onClick as ((event: MouseEvent<HTMLElement>) => void) | undefined;
  const handleClick =
    ownClick && onClick
      ? (event: MouseEvent<HTMLElement>) => {
          ownClick(event);
          onClick(event);
        }
      : (ownClick ?? onClick);

  if (getPageHref) {
    if (disabled) {
      // A link to nowhere: no href, so it leaves the tab order, but it still reads as a link.
      return (
        <span
          {...(rest as ComponentProps<"span">)}
          role="link"
          aria-disabled="true"
          aria-label={label ?? rest["aria-label"]}
          className={className}
        >
          {children}
        </span>
      );
    }
    return (
      <a
        {...(rest as ComponentProps<"a">)}
        href={getPageHref(page)}
        aria-current={ariaCurrent}
        aria-label={label ?? rest["aria-label"]}
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...rest}
      type="button"
      disabled={disabled}
      aria-current={ariaCurrent}
      aria-label={label ?? rest["aria-label"]}
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

/**
 * Moves between pages of results or table rows. Renders a `<nav>` landmark (named "Pagination"
 * unless you pass `aria-label`) holding a list of controls; the current page has
 * `aria-current="page"` and previous / next are disabled at the ends. Controls are buttons that
 * call `onPageChange`, or links when `getPageHref` is set (server-safe: no state, no effects).
 */
export function Pagination({
  currentPage,
  totalPages: totalPagesProp,
  onPageChange,
  getPageHref,
  layout = "pagination",
  size = "md",
  showIcons = false,
  showTooltips = false,
  siblingCount = 2,
  showEllipsis = false,
  previousLabel = "Previous",
  nextLabel = "Next",
  getPageLabel = (page) => `Page ${page}`,
  itemsPerPage = 10,
  totalItems,
  renderInfo,
  className,
  children,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: PaginationProps) {
  const perPage = Math.max(1, itemsPerPage);
  const totalPages = Math.max(
    0,
    Math.floor(totalPagesProp ?? (totalItems === undefined ? 1 : Math.ceil(totalItems / perPage))),
  );
  const current = Math.min(Math.max(1, Math.floor(currentPage)), Math.max(1, totalPages));
  const itemCount = totalItems ?? totalPages * perPage;
  const firstItem = itemCount === 0 ? 0 : (current - 1) * perPage + 1;
  const info: PaginationInfo = {
    currentPage: current,
    totalPages,
    firstItem,
    lastItem: Math.min(current * perPage, itemCount),
    totalItems: itemCount,
  };

  const shared = { getPageHref, onPageChange, activePage: current };
  const atStart = current <= 1;
  const atEnd = current >= totalPages;

  const stepShape: PaginationItemVariantProps["shape"] =
    layout === "single" || (layout === "pagination" && showIcons)
      ? "icon"
      : layout === "pagination"
        ? "step"
        : "button";
  const stepClassName = cn(
    paginationItemVariants({ shape: stepShape, size, ring: layout === "single" }),
    layout === "navigation" && "rounded-base",
  );
  const iconOnly = stepShape === "icon";
  const arrows = layout === "navigation" || layout === "table";
  /** Flowbite's tooltip on an icon-only previous / next control, naming it. */
  const withTooltip = (label: string, control: ReactElement) =>
    showTooltips && iconOnly ? (
      <Tooltip content={label} mode="label" className="leading-4">
        {control}
      </Tooltip>
    ) : (
      control
    );

  const previous = iconOnly ? (
    <>
      <span className="sr-only">{previousLabel}</span>
      <ChevronLeft aria-hidden className="rtl:rotate-180" />
    </>
  ) : (
    <>
      {showIcons && arrows ? (
        <ArrowLeft aria-hidden className={cn(paginationPreviousIconClassName, "rtl:rotate-180")} />
      ) : null}
      {previousLabel}
    </>
  );
  const next = iconOnly ? (
    <>
      <span className="sr-only">{nextLabel}</span>
      <ChevronRight aria-hidden className="rtl:rotate-180" />
    </>
  ) : (
    <>
      {nextLabel}
      {showIcons && arrows ? (
        <ArrowRight aria-hidden className={cn(paginationNextIconClassName, "rtl:rotate-180")} />
      ) : null}
    </>
  );

  const pages =
    layout === "pagination"
      ? getPaginationItems(current, totalPages, siblingCount, showEllipsis)
      : [];

  return (
    <nav
      aria-label={ariaLabel}
      data-slot="pagination"
      className={cn(paginationVariants({ layout }), className)}
      {...props}
    >
      {layout === "table" ? (
        <span aria-live="polite" className={paginationTableInfoClassName}>
          {renderInfo ? (
            renderInfo(info)
          ) : (
            <>
              Showing <strong>{info.firstItem}</strong> to <strong>{info.lastItem}</strong> of{" "}
              <strong>{info.totalItems}</strong> Entries
            </>
          )}
        </span>
      ) : null}
      <ul className={paginationListVariants({ layout })}>
        <li>
          {withTooltip(
            previousLabel,
            <PaginationControl
              {...shared}
              page={current - 1}
              disabled={atStart}
              className={stepClassName}
            >
              {previous}
            </PaginationControl>,
          )}
        </li>
        {pages.map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <PaginationControl
                {...shared}
                page={item}
                current={item === current}
                label={getPageLabel(item)}
                className={paginationItemVariants({
                  shape: "page",
                  size,
                  current: item === current,
                })}
              >
                {item}
              </PaginationControl>
            </li>
          ) : (
            <li key={item} aria-hidden>
              <span className={paginationEllipsisVariants({ size })}>…</span>
            </li>
          ),
        )}
        {layout === "single" ? (
          <li>
            <span aria-live="polite" className={paginationPageInfoVariants({ size })}>
              {renderInfo ? renderInfo(info) : `${current} of ${totalPages}`}
            </span>
          </li>
        ) : null}
        <li>
          {withTooltip(
            nextLabel,
            <PaginationControl
              {...shared}
              page={current + 1}
              disabled={atEnd}
              className={stepClassName}
            >
              {next}
            </PaginationControl>,
          )}
        </li>
      </ul>
      {children}
    </nav>
  );
}
