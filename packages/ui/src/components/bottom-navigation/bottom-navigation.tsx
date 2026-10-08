import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  bottomNavigationItemClassName,
  bottomNavigationListVariants,
  bottomNavigationVariants,
  type BottomNavigationVariantProps,
} from "./bottom-navigation.variants";

export type BottomNavigationProps = ComponentProps<"nav"> & BottomNavigationVariantProps;

/**
 * A bar of top-level destinations fixed to the bottom of the screen, for mobile layouts.
 * Renders a `<nav>` landmark ("Bottom navigation" by default) with a list of items.
 */
export function BottomNavigation({
  position,
  floating,
  bordered,
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
      <ul className={bottomNavigationListVariants({ bordered })}>{children}</ul>
    </nav>
  );
}

type ItemOwnProps = {
  /** Icon shown above the label. Mark it `aria-hidden`. */
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
      <span className={hideLabel ? "sr-only" : undefined}>{children}</span>
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
