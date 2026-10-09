"use client";

import { ChevronDown, Menu } from "@stefan-florescu/icons";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { DropdownTrigger } from "../dropdown";
import { mergeRefs, Slot } from "../dropdown/dropdown-slot";

import {
  navbarActionsVariants,
  navbarBrandClassName,
  navbarBrandImageClassName,
  navbarBrandMarkClassName,
  navbarBrandNameClassName,
  navbarChevronClassName,
  navbarCollapseVariants,
  navbarContainerVariants,
  navbarItemVariants,
  navbarListVariants,
  navbarToggleVariants,
  navbarVariants,
  type NavbarCollapseVariantProps,
  type NavbarVariantProps,
} from "./navbar.variants";

/*
 * The navbar is a `<nav>` landmark. Below `expand` its links collapse behind a hamburger button,
 * a WAI-ARIA disclosure (`aria-expanded`, `aria-controls`) that shows and hides them in place.
 * Dropdowns and mega menus inside it are `Dropdown` and `MegaMenu`; `NavbarDropdownTrigger`
 * styles a dropdown's button as a navbar link.
 */

type Expand = "md" | "never";
type ListVariant = NonNullable<NavbarCollapseVariantProps["variant"]>;

type NavbarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapseId: string;
  expand: Expand;
  variant: "default" | "solid";
  /** The hamburger buttons, so Escape in the collapsed menu can return focus to one. */
  registerToggle: (node: HTMLElement | null) => void;
  /** Called by a hamburger when it is clicked: Escape returns focus to it. */
  setLastToggle: (node: HTMLElement) => void;
  getToggle: () => HTMLElement | null;
};

const NavbarContext = createContext<NavbarContextValue | null>(null);

function useNavbarContext(component: string) {
  const context = useContext(NavbarContext);
  if (!context) throw new Error(`<${component}> must be used inside <Navbar>.`);
  return context;
}

/** The look of the links in the nearest `NavbarCollapse`. */
const ListContext = createContext<ListVariant>("default");

/** Whether an element is rendered (not `display: none`, as the hamburger is from `md` up). */
function isShown(element: HTMLElement | null): element is HTMLElement {
  return Boolean(element && element.getClientRects().length > 0);
}

/* ------------------------------------------------------------------------------------------ */
/* Navbar                                                                                     */
/* ------------------------------------------------------------------------------------------ */

export type NavbarProps = ComponentProps<"nav"> &
  NavbarVariantProps & {
    /**
     * The width from which the links show in a row and the hamburger hides. `never` keeps them
     * behind the hamburger at every width (Flowbite's "Hamburger menu").
     */
    expand?: Expand;
    /** Let the row span the full width instead of a centred `max-w-screen-xl` container. */
    fluid?: boolean;
    /** Inner padding: `md` for a navbar, `sm` for a secondary bar under one. */
    size?: "sm" | "md";
    /** Whether the collapsed links are shown (controlled). */
    open?: boolean;
    /** Whether the collapsed links are shown on first render (uncontrolled). */
    defaultOpen?: boolean;
    /** Called when the hamburger shows or hides the links. */
    onOpenChange?: (open: boolean) => void;
  };

/**
 * The navigation bar at the top of a page (Flowbite's navbar): a `<nav>` landmark, named "Main"
 * unless you pass `aria-label` or `aria-labelledby`, holding a centred row for `NavbarBrand`,
 * `NavbarToggle`, `NavbarCollapse` and `NavbarActions`.
 */
export function Navbar({
  variant,
  border,
  position,
  expand = "md",
  fluid = false,
  size = "md",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: NavbarProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = openProp ?? internal;
  const collapseId = `${useId()}-collapse`;
  const toggles = useRef(new Set<HTMLElement>());
  const lastToggle = useRef<HTMLElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setInternal(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const registerToggle = useCallback((node: HTMLElement | null) => {
    // Called with the node on mount and null on unmount; drop toggles no longer in the page.
    if (node) toggles.current.add(node);
    for (const toggle of toggles.current) if (!toggle.isConnected) toggles.current.delete(toggle);
  }, []);

  const setLastToggle = useCallback((node: HTMLElement) => {
    lastToggle.current = node;
  }, []);

  /** The hamburger that opened the menu, or else the first one on screen. */
  const getToggle = useCallback(() => {
    const last = lastToggle.current;
    if (isShown(last) && last.isConnected) return last;
    return [...toggles.current].find(isShown) ?? null;
  }, []);

  const context = useMemo(
    () => ({
      open,
      setOpen,
      collapseId,
      expand,
      variant: variant ?? "default",
      registerToggle,
      setLastToggle,
      getToggle,
    }),
    [open, setOpen, collapseId, expand, variant, registerToggle, setLastToggle, getToggle],
  );

  return (
    <NavbarContext value={context}>
      <nav
        data-slot="navbar"
        aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : "Main")}
        aria-labelledby={ariaLabelledBy}
        className={cn(navbarVariants({ variant, border, position }), className)}
        {...props}
      >
        <div className={navbarContainerVariants({ fluid, size })}>{children}</div>
      </nav>
    </NavbarContext>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Brand                                                                                      */
/* ------------------------------------------------------------------------------------------ */

export type NavbarBrandProps = Omit<ComponentProps<"a">, "children"> & {
  /** Where the logo links to, usually the home page. */
  href: string;
  /** The brand name shown next to the mark. It is also the link's accessible name. */
  name: ReactNode;
  /** A logo mark element, such as an icon or an inline SVG. Rendered 28px tall in `fg-brand`. */
  logo?: ReactNode;
  /** Logo image URL, as an alternative to `logo`. */
  src?: string;
  /** Alternative text for `src`. Leave it empty when `name` already names the brand. */
  alt?: string;
};

/** The brand's logo and name, linked to the home page. */
export function NavbarBrand({
  href,
  name,
  logo,
  src,
  alt = "",
  className,
  ...props
}: NavbarBrandProps) {
  return (
    <a
      href={href}
      data-slot="navbar-brand"
      className={cn(navbarBrandClassName, className)}
      {...props}
    >
      {src ? <img src={src} alt={alt} className={navbarBrandImageClassName} /> : null}
      {logo ? (
        <span aria-hidden className={navbarBrandMarkClassName}>
          {logo}
        </span>
      ) : null}
      <span className={navbarBrandNameClassName}>{name}</span>
    </a>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Toggle                                                                                     */
/* ------------------------------------------------------------------------------------------ */

export type NavbarToggleProps = Omit<ComponentProps<"button">, "type" | "children"> & {
  /** The button's accessible name, read by screen readers. */
  label?: string;
  /** The icon shown in the button. Defaults to the three-bar hamburger. */
  icon?: ReactNode;
};

/**
 * The hamburger button that shows and hides the `NavbarCollapse` below `expand` (a disclosure:
 * `aria-expanded`, `aria-controls`). It hides itself once the links show in a row. Add a second
 * one with another `icon` and `label`, such as a search icon, to open the same menu.
 */
export function NavbarToggle({
  label = "Open main menu",
  icon = <Menu />,
  className,
  onClick,
  ref,
  ...props
}: NavbarToggleProps) {
  const { open, setOpen, collapseId, expand, variant, registerToggle, setLastToggle } =
    useNavbarContext("NavbarToggle");

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={collapseId}
      data-state={open ? "open" : "closed"}
      data-slot="navbar-toggle"
      ref={mergeRefs<HTMLButtonElement>(registerToggle, ref)}
      className={cn(navbarToggleVariants({ expand, variant }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        setLastToggle(event.currentTarget);
        setOpen(!open);
      }}
      {...props}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden className="contents">
        {icon}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Actions                                                                                    */
/* ------------------------------------------------------------------------------------------ */

export type NavbarActionsProps = ComponentProps<"div">;

/**
 * Buttons at the end of the bar, such as a call to action, a user menu and the `NavbarToggle`.
 * From `expand` up they stay at the end, after the links.
 */
export function NavbarActions({ className, ...props }: NavbarActionsProps) {
  const { expand } = useNavbarContext("NavbarActions");
  return (
    <div
      data-slot="navbar-actions"
      className={cn(navbarActionsVariants({ expand }), className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Collapse                                                                                   */
/* ------------------------------------------------------------------------------------------ */

export type NavbarCollapseProps = ComponentProps<"div"> &
  NavbarCollapseVariantProps & {
    /** Content above the links, such as a search field for small screens. */
    header?: ReactNode;
    /** Class names for the list (`ul`) of links. */
    listClassName?: string;
  };

/**
 * The navbar's links (`NavbarLink`, or `<li>`s holding a `Dropdown` or `MegaMenu`), in a list.
 * Below `expand` the list is hidden until a `NavbarToggle` shows it; from `expand` up it is a row.
 * `variant="flush"` drops the card around the collapsed list (Flowbite's mega menu navbar);
 * `variant="inline"` never collapses: a row of small links for a secondary bar.
 */
export function NavbarCollapse({
  variant = "default",
  header,
  listClassName,
  className,
  children,
  ref,
  ...props
}: NavbarCollapseProps) {
  const { open, setOpen, collapseId, expand, getToggle } = useNavbarContext("NavbarCollapse");
  const inline = variant === "inline";
  const regionRef = useRef<HTMLDivElement | null>(null);

  // Escape in the open, collapsed menu hides it and returns focus to the hamburger. Escape that
  // belongs to an open dropdown or mega menu inside is left to it.
  useEffect(() => {
    const region = regionRef.current;
    if (!region || inline || !open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const toggle = getToggle();
      if (!toggle) return;
      for (
        let node = event.target as HTMLElement | null;
        node && node !== region;
        node = node.parentElement
      ) {
        if (node.getAttribute("aria-expanded") === "true") return;
        if (node.dataset.state === "open") return;
      }
      event.preventDefault();
      setOpen(false);
      toggle.focus();
    };
    region.addEventListener("keydown", onKeyDown);
    return () => region.removeEventListener("keydown", onKeyDown);
  }, [inline, open, setOpen, getToggle]);

  return (
    <ListContext value={variant ?? "default"}>
      <div
        id={inline ? props.id : collapseId}
        data-slot="navbar-collapse"
        data-state={inline ? undefined : open ? "open" : "closed"}
        className={cn(
          navbarCollapseVariants({
            expand: inline ? "never" : expand,
            open: inline || open,
            variant,
          }),
          className,
        )}
        {...props}
        ref={mergeRefs<HTMLDivElement>(regionRef, ref)}
      >
        {header}
        <ul className={cn(navbarListVariants({ expand, variant }), listClassName)}>{children}</ul>
      </div>
    </ListContext>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Links                                                                                      */
/* ------------------------------------------------------------------------------------------ */

export type NavbarLinkProps = ComponentProps<"a"> & {
  /** Marks the link as the current page (`aria-current="page"`). */
  active?: boolean;
  /** Shown and announced as unavailable; the link has no `href` and can't be followed. */
  disabled?: boolean;
  /** Render the only child (such as a router `Link`) as the link. */
  asChild?: boolean;
};

/**
 * A link in a `NavbarCollapse`; renders the list item and the link. Mark the current page with
 * `active` (or `aria-current="page"`).
 */
export function NavbarLink({
  active = false,
  disabled = false,
  asChild = false,
  href,
  className,
  children,
  onClick,
  ...props
}: NavbarLinkProps) {
  const { expand } = useNavbarContext("NavbarLink");
  const variant = useContext(ListContext);

  const linkProps = {
    "aria-current": active ? ("page" as const) : undefined,
    ...props,
    // With `asChild`, keep the child's own `href` unless disabled.
    ...(disabled ? { href: undefined } : href !== undefined ? { href } : {}),
    "aria-disabled": disabled || undefined,
    "data-slot": "navbar-link",
    className: cn(navbarItemVariants({ variant, expand, kind: "link" }), className),
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
  };

  return (
    <li>{asChild ? <Slot {...linkProps}>{children}</Slot> : <a {...linkProps}>{children}</a>}</li>
  );
}

export type NavbarDropdownTriggerProps = Omit<ComponentProps<"button">, "type"> & {
  /** Show the chevron after the label. */
  chevron?: boolean;
};

/**
 * A `Dropdown`'s button styled as a navbar link, with a chevron: a full-width row in the collapsed
 * menu, plain text in the row. Put it in a `Dropdown`, inside an `<li>` of a `NavbarCollapse`.
 */
export function NavbarDropdownTrigger({
  chevron = true,
  className,
  children,
  ...props
}: NavbarDropdownTriggerProps) {
  const { expand } = useNavbarContext("NavbarDropdownTrigger");
  const variant = useContext(ListContext);

  return (
    <DropdownTrigger asChild>
      <button
        type="button"
        data-slot="navbar-dropdown-trigger"
        className={cn(navbarItemVariants({ variant, expand, kind: "button" }), className)}
        {...props}
      >
        {children}
        {chevron ? <ChevronDown aria-hidden className={navbarChevronClassName} /> : null}
      </button>
    </DropdownTrigger>
  );
}
