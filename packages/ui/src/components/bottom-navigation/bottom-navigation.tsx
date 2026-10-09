import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  bottomNavigationItemClassName,
  bottomNavigationLabelClassName,
  bottomNavigationListVariants,
  bottomNavigationVariants,
  type BottomNavigationVariantProps,
} from "./bottom-navigation.variants";

export type BottomNavigationProps = ComponentProps<"nav"> &
  BottomNavigationVariantProps & {
    /** Content above the items, such as Flowbite's segmented "New / Popular / Following" bar. */
    header?: ReactNode;
  };

/**
 * A bar of top-level destinations fixed to the bottom of the screen, for mobile layouts.
 * Renders a `<nav>` landmark ("Bottom navigation" by default) with a list of items, one equal
 * column each.
 */
export function BottomNavigation({
  position,
  floating,
  bordered,
  header,
  className,
  children,
  ...props
}: BottomNavigationProps) {
  return (
    <nav
      aria-label="Bottom navigation"
      data-slot="bottom-navigation"
      className={cn(bottomNavigationVariants({ position, floating }), className)}
      {...props}
    >
      {header}
      <ul className={bottomNavigationListVariants({ bordered, floating })}>{children}</ul>
    </nav>
  );
}

type ItemOwnProps = {
  /** Icon shown above the label (24px). Mark it `aria-hidden`. */
  icon?: ReactNode;
  /** Marks the item for the current page (`aria-current`). */
  active?: boolean;
  /** Keep the label for screen readers only, showing just the icon. */
  hideLabel?: boolean;
};

export type BottomNavigationItemProps = ItemOwnProps &
  (
    | ({ href: string } & Omit<ComponentProps<"a">, "href">)
    | ({ href?: undefined } & ComponentProps<"button">)
  );

/** One destination: a link when it has `href`, otherwise a button. */
export function BottomNavigationItem({
  icon,
  active = false,
  hideLabel = false,
  className,
  children,
  ...props
}: BottomNavigationItemProps) {
  const classes = cn(bottomNavigationItemClassName, className);
  const content = (
    <>
      {icon}
      <span className={hideLabel ? "sr-only" : bottomNavigationLabelClassName}>{children}</span>
    </>
  );

  return (
    <li className="flex flex-1">
      {props.href !== undefined ? (
        <a
          data-slot="bottom-navigation-item"
          aria-current={active ? "page" : undefined}
          className={classes}
          {...(props as ComponentProps<"a">)}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          data-slot="bottom-navigation-item"
          aria-current={active ? "true" : undefined}
          className={classes}
          {...(props as ComponentProps<"button">)}
        >
          {content}
        </button>
      )}
    </li>
  );
}
