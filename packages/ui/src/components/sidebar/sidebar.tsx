"use client";

import { ChevronDown, Menu, X } from "@stefan-florescu/icons";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  use,
  useEffect,
  useId,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { Alert, type AlertProps } from "../alert";
import { alertDismissVariants } from "../alert/alert.variants";
import { Badge, type BadgeProps } from "../badge";
import { Drawer, DrawerContent, DrawerTrigger, useDrawer } from "../drawer";
import { Slot } from "../dropdown/dropdown-slot";

import {
  sidebarCollapseButtonClassName,
  sidebarCollapseChevronClassName,
  sidebarCollapseListClassName,
  sidebarCtaClassName,
  sidebarCtaDismissClassName,
  sidebarCtaDismissibleClassName,
  sidebarDrawerClassName,
  sidebarItemCountClassName,
  sidebarItemGroupClassName,
  sidebarItemLabelClassName,
  sidebarItemTagClassName,
  sidebarItemVariants,
  sidebarLogoClassName,
  sidebarLogoImageClassName,
  sidebarLogoMarkClassName,
  sidebarLogoNameClassName,
  sidebarPanelClassName,
  sidebarToggleBreakpoint,
  sidebarToggleClassName,
  sidebarVariants,
} from "./sidebar.variants";

export type SidebarBreakpoint = "sm" | "md" | "lg" | "none";

/** Tailwind's default breakpoints, for closing the drawer when the sidebar comes back. */
const breakpointQuery: Record<Exclude<SidebarBreakpoint, "none">, string> = {
  sm: "(min-width: 40rem)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
};

type SidebarContextValue = { breakpoint: SidebarBreakpoint };

const SidebarContext = createContext<SidebarContextValue | null>(null);

/** Set inside the drawer copy of the sidebar: following an item closes the drawer. */
const SidebarDrawerContext = createContext<(() => void) | null>(null);

/** Set inside a `SidebarCollapse`: its items are indented. */
const SidebarCollapseContext = createContext(false);

/** The open state of the sidebar's drawer (below the breakpoint) and a setter. */
export function useSidebar() {
  if (!use(SidebarContext)) throw new Error("useSidebar must be used inside <SidebarProvider>.");
  return useDrawer();
}

export type SidebarProviderProps = {
  /** Below this breakpoint the sidebar is hidden and opens as a drawer from `SidebarToggle`. */
  breakpoint?: SidebarBreakpoint;
  /** Whether the drawer is open (controlled). Use with `onOpenChange`. */
  open?: boolean;
  /** Whether the drawer is open on first render (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the drawer asks to open or close: toggle, Escape, backdrop, a followed item. */
  onOpenChange?: (open: boolean) => void;
  /** The `Sidebar`, its `SidebarToggle` (in a navbar, for example) and the page. */
  children?: ReactNode;
};

/**
 * Shares the sidebar's drawer state with a `SidebarToggle` placed elsewhere, such as in a navbar.
 * Without a provider, `Sidebar` renders Flowbite's hamburger button just before itself.
 */
export function SidebarProvider({
  breakpoint = "sm",
  open,
  defaultOpen,
  onOpenChange,
  children,
}: SidebarProviderProps) {
  return (
    <SidebarContext value={{ breakpoint }}>
      <Drawer open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} placement="left">
        {children}
      </Drawer>
    </SidebarContext>
  );
}

export type SidebarToggleProps = Omit<ComponentProps<"button">, "children" | "type"> & {
  /** Accessible name of the button. */
  label?: string;
};

/**
 * Flowbite's hamburger button. It opens the sidebar as a drawer and is shown only below the
 * sidebar's breakpoint. Use it inside a `SidebarProvider`.
 */
export function SidebarToggle({ label = "Open sidebar", className, ...props }: SidebarToggleProps) {
  const context = use(SidebarContext);
  if (!context) throw new Error("<SidebarToggle> must be used inside <SidebarProvider>.");
  return (
    <DrawerTrigger
      {...props}
      variant="ghost"
      iconOnly
      data-slot="sidebar-toggle"
      className={cn(sidebarToggleClassName, sidebarToggleBreakpoint[context.breakpoint], className)}
    >
      <Menu aria-hidden />
      <span className="sr-only">{label}</span>
    </DrawerTrigger>
  );
}

export type SidebarProps = Omit<ComponentProps<"aside">, "aria-label"> &
  Omit<SidebarProviderProps, "children"> & {
    /** Where the sidebar sits: fixed to the viewport (Flowbite's), sticky, or in the flow. */
    position?: "fixed" | "sticky" | "static";
    /** Accessible name of the sidebar (the `<aside>`) and of its drawer. */
    label?: string;
  };

/**
 * Vertical navigation along the side of an app: an `<aside>` with Flowbite's scrolling panel.
 * Put a `SidebarLogo`, `SidebarItems` and a `SidebarCTA` in it.
 *
 * Below `breakpoint` (`sm` by default) it is hidden and the same content opens in a `Drawer`
 * (a modal dialog) from a `SidebarToggle`. Without a `SidebarProvider` around it, the sidebar
 * renders that toggle just before itself, as Flowbite does; `breakpoint`, `open`, `defaultOpen`
 * and `onOpenChange` then apply here. Inside a provider, set them on the provider.
 */
export function Sidebar({ breakpoint, open, defaultOpen, onOpenChange, ...props }: SidebarProps) {
  const context = use(SidebarContext);
  if (context) return <SidebarRoot {...props} breakpoint={context.breakpoint} />;

  const resolved = breakpoint ?? "sm";
  return (
    <SidebarProvider
      breakpoint={resolved}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {resolved === "none" ? null : <SidebarToggle className="ms-3 mt-3" />}
      <SidebarRoot {...props} breakpoint={resolved} />
    </SidebarProvider>
  );
}

function SidebarRoot({
  breakpoint,
  position = "fixed",
  label = "Sidebar",
  className,
  children,
  ...props
}: Omit<SidebarProps, "breakpoint" | "open" | "defaultOpen" | "onOpenChange"> & {
  breakpoint: SidebarBreakpoint;
}) {
  const { open, setOpen } = useDrawer();
  // The drawer copy of the content is rendered from the first time the drawer opens.
  const [drawerUsed, setDrawerUsed] = useState(open);
  if (open && !drawerUsed) setDrawerUsed(true);

  // Close the drawer when the window grows past the breakpoint and the sidebar shows again.
  useEffect(() => {
    if (!open || breakpoint === "none" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(breakpointQuery[breakpoint]);
    if (query.matches) {
      setOpen(false);
      return;
    }
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open, breakpoint, setOpen]);

  return (
    <>
      <aside
        aria-label={label}
        data-slot="sidebar"
        className={cn(sidebarVariants({ position, breakpoint }), className)}
        {...props}
      >
        <div data-slot="sidebar-panel" className={sidebarPanelClassName}>
          {children}
        </div>
      </aside>
      {breakpoint === "none" ? null : (
        <DrawerContent aria-label={label} className={sidebarDrawerClassName}>
          <SidebarDrawerContext value={() => setOpen(false)}>
            <div data-slot="sidebar-panel" className={sidebarPanelClassName}>
              {drawerUsed ? children : null}
            </div>
          </SidebarDrawerContext>
        </DrawerContent>
      )}
    </>
  );
}

export type SidebarLogoProps = Omit<ComponentProps<"a">, "children"> & {
  /** The brand name. */
  name: ReactNode;
  /** A logo mark element, such as an icon (decorative). */
  logo?: ReactNode;
  /** A logo image URL. */
  src?: string;
  /** Alternative text of the logo image. Leave it empty when `name` already names the brand. */
  alt?: string;
};

/** Flowbite's "Logo branding": the brand's logo and name, linking to the home page. */
export function SidebarLogo({ name, logo, src, alt = "", className, ...props }: SidebarLogoProps) {
  return (
    <a data-slot="sidebar-logo" className={cn(sidebarLogoClassName, className)} {...props}>
      {src ? <img src={src} alt={alt} className={sidebarLogoImageClassName} /> : null}
      {logo ? (
        <span aria-hidden className={sidebarLogoMarkClassName}>
          {logo}
        </span>
      ) : null}
      <span className={sidebarLogoNameClassName}>{name}</span>
    </a>
  );
}

export type SidebarItemsProps = ComponentProps<"nav">;

/**
 * The sidebar's navigation landmark (named "Sidebar"; change it with `aria-label`). Put one or
 * more `SidebarItemGroup`s in it.
 */
export function SidebarItems({ className, ...props }: SidebarItemsProps) {
  return <nav aria-label="Sidebar" data-slot="sidebar-items" className={className} {...props} />;
}

export type SidebarItemGroupProps = ComponentProps<"ul">;

/** A list of `SidebarItem`s. Each group after the first starts with a divider. */
export function SidebarItemGroup({ className, ...props }: SidebarItemGroupProps) {
  return (
    <ul
      data-slot="sidebar-item-group"
      className={cn(sidebarItemGroupClassName, className)}
      {...props}
    />
  );
}

type SidebarItemOwnProps = {
  /** A decorative icon before the text, drawn at 20px. */
  icon?: ReactNode;
  /** A small tag after the text, such as "Pro" (a bordered `Badge`). */
  label?: ReactNode;
  /** Colour of the `label` badge. */
  labelVariant?: BadgeProps["variant"];
  /** A round counter after the text, such as unread messages (a bordered pill `Badge`). */
  count?: ReactNode;
  /** Colour of the `count` badge. */
  countVariant?: BadgeProps["variant"];
  /** Mark the item as the current page (`aria-current="page"`). */
  active?: boolean;
};

export type SidebarItemProps = SidebarItemOwnProps &
  (
    | ({ href: string; asChild?: false } & Omit<ComponentProps<"a">, "href">)
    | ({
        /** Render the only child (such as a router `Link`) as the item's link. */
        asChild: true;
        href?: undefined;
      } & Omit<ComponentProps<"a">, "href">)
    | ({ href?: undefined; asChild?: false } & ComponentProps<"button">)
  );

/**
 * One destination: a link when it has `href` (or `asChild`), otherwise a button. Inside a
 * `SidebarCollapse` it is indented under the collapse's label. In the drawer, following it
 * closes the drawer; call `preventDefault()` in `onClick` to keep it open.
 */
export function SidebarItem({
  icon,
  label,
  labelVariant = "gray",
  count,
  countVariant = "danger",
  active = false,
  asChild = false,
  className,
  children,
  onClick,
  ...props
}: SidebarItemProps) {
  const nested = use(SidebarCollapseContext);
  const closeDrawer = use(SidebarDrawerContext);
  const isLink = asChild || props.href !== undefined;

  const content = (text: ReactNode) => (
    <>
      {icon}
      <span className={cn(icon ? sidebarItemLabelClassName : "flex-1 text-start")}>{text}</span>
      {label !== undefined && label !== null ? " " : null}
      {label !== undefined && label !== null ? (
        <Badge
          variant={labelVariant}
          bordered
          data-slot="sidebar-item-label"
          className={sidebarItemTagClassName}
        >
          {label}
        </Badge>
      ) : null}
      {count !== undefined && count !== null ? " " : null}
      {count !== undefined && count !== null ? (
        <Badge
          variant={countVariant}
          bordered
          pill
          data-slot="sidebar-item-count"
          className={sidebarItemCountClassName}
        >
          {count}
        </Badge>
      ) : null}
    </>
  );

  const shared = {
    "data-slot": "sidebar-item",
    className: cn(sidebarItemVariants({ nested }), className),
    onClick: (event: MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => {
      (onClick as ((event: MouseEvent<HTMLElement>) => void) | undefined)?.(event);
      if (isLink && !event.defaultPrevented) closeDrawer?.();
    },
  };

  if (asChild) {
    const child = Children.only(children);
    if (!isValidElement(child)) return null;
    const element = child as ReactElement<{ children?: ReactNode }>;
    return (
      <li>
        <Slot {...props} {...shared} aria-current={active ? "page" : undefined}>
          {cloneElement(element, undefined, content(element.props.children))}
        </Slot>
      </li>
    );
  }

  return (
    <li>
      {isLink ? (
        <a
          {...(props as ComponentProps<"a">)}
          {...shared}
          aria-current={active ? "page" : undefined}
        >
          {content(children)}
        </a>
      ) : (
        <button
          type="button"
          {...(props as ComponentProps<"button">)}
          {...shared}
          aria-current={active ? "true" : undefined}
          className={cn(shared.className, "cursor-pointer")}
        >
          {content(children)}
        </button>
      )}
    </li>
  );
}

export type SidebarCollapseProps = Omit<ComponentProps<"button">, "children" | "onToggle"> & {
  /** The text of the button that shows and hides the items. */
  label: ReactNode;
  /** A decorative icon before the label, drawn at 20px. */
  icon?: ReactNode;
  /** Whether the items are shown (controlled). Use with `onOpenChange`. */
  open?: boolean;
  /** Whether the items are shown on first render (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the button is pressed, with the new state. */
  onOpenChange?: (open: boolean) => void;
  /** The nested `SidebarItem`s. */
  children?: ReactNode;
};

/**
 * Flowbite's "Multi-level menu": a disclosure button (`aria-expanded`, `aria-controls`) that shows
 * and hides a nested list of `SidebarItem`s.
 */
export function SidebarCollapse({
  label,
  icon,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  onClick,
  ...props
}: SidebarCollapseProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const listId = `${useId()}-items`;

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        data-slot="sidebar-collapse"
        className={cn(sidebarItemVariants(), sidebarCollapseButtonClassName, className)}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          if (openProp === undefined) setUncontrolled(!open);
          onOpenChange?.(!open);
        }}
        {...props}
      >
        {icon}
        <span className={icon ? sidebarItemLabelClassName : "flex-1 text-start"}>{label}</span>
        <ChevronDown aria-hidden className={sidebarCollapseChevronClassName} />
      </button>
      <ul id={listId} hidden={!open} className={sidebarCollapseListClassName}>
        <SidebarCollapseContext value>{children}</SidebarCollapseContext>
      </ul>
    </li>
  );
}

export type SidebarCTAProps = AlertProps;

/**
 * Flowbite's CTA card under the items: a bordered brand `Alert` (with `AlertTitle`,
 * `AlertDescription` and a button inside) that is not a live region. Add `dismissible` for
 * Flowbite's close button in the top-end corner, next to the title.
 */
export function SidebarCTA({
  variant = "brand",
  bordered = true,
  dismissible = false,
  dismissLabel = "Dismiss",
  onDismiss,
  className,
  children,
  ...props
}: SidebarCTAProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <Alert
      role={undefined}
      variant={variant}
      bordered={bordered}
      data-slot="sidebar-cta"
      className={cn(sidebarCtaClassName, dismissible && sidebarCtaDismissibleClassName, className)}
      {...props}
    >
      {children}
      {dismissible ? (
        <button
          type="button"
          aria-label={dismissLabel}
          className={cn(alertDismissVariants({ variant }), sidebarCtaDismissClassName)}
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
        >
          <X aria-hidden />
        </button>
      ) : null}
    </Alert>
  );
}
