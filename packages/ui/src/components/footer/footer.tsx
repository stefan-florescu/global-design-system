import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  footerBrandClassName,
  footerBrandImageClassName,
  footerBrandMarkClassName,
  footerBrandNameClassName,
  footerCopyrightClassName,
  footerDividerClassName,
  footerIconClassName,
  footerIconsClassName,
  footerLinkClassName,
  footerLinkListVariants,
  footerTitleClassName,
  footerVariants,
  type FooterVariantProps,
} from "./footer.variants";

export type FooterProps = ComponentProps<"footer"> & FooterVariantProps;

/**
 * The page footer: a `<footer>` landmark (`contentinfo` when it is not inside an article or
 * section) that holds the brand, groups of links, the copyright notice and social icons.
 * Arrange the parts with your own layout, as in the examples.
 */
export function Footer({ variant, className, ...props }: FooterProps) {
  return (
    <footer data-slot="footer" className={cn(footerVariants({ variant }), className)} {...props} />
  );
}

export type FooterBrandProps = Omit<ComponentProps<"a">, "children"> & {
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

/** The brand's logo mark and name, linked to the home page. */
export function FooterBrand({
  href,
  name,
  logo,
  src,
  alt = "",
  className,
  ...props
}: FooterBrandProps) {
  return (
    <a
      href={href}
      data-slot="footer-brand"
      className={cn(footerBrandClassName, className)}
      {...props}
    >
      {src ? <img src={src} alt={alt} className={footerBrandImageClassName} /> : null}
      {logo ? (
        <span aria-hidden className={footerBrandMarkClassName}>
          {logo}
        </span>
      ) : null}
      <span className={footerBrandNameClassName}>{name}</span>
    </a>
  );
}

export type FooterTitleProps = ComponentProps<"h2">;

/** A heading over a column of links, in small uppercase `heading` text. */
export function FooterTitle({ className, children, ...props }: FooterTitleProps) {
  return (
    <h2 data-slot="footer-title" className={cn(footerTitleClassName, className)} {...props}>
      {children}
    </h2>
  );
}

export type FooterLinkGroupProps = ComponentProps<"nav"> & {
  /**
   * A heading shown over the links (a column title). It also names the navigation
   * landmark. Without it, name the group with `aria-label` (default "Footer").
   */
  title?: ReactNode;
  /** Stack the links in a column instead of a wrapping row. */
  vertical?: boolean;
};

/** A `<nav>` landmark holding a list of `FooterLink`s, with an optional `title` heading. */
export function FooterLinkGroup({
  title,
  vertical = false,
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: FooterLinkGroupProps) {
  const titleId = useId();
  const named = ariaLabel ?? ariaLabelledBy;

  return (
    <nav
      data-slot="footer-link-group"
      aria-label={ariaLabel ?? (title || ariaLabelledBy ? undefined : "Footer")}
      aria-labelledby={ariaLabelledBy ?? (title && !named ? titleId : undefined)}
      className={className}
      {...props}
    >
      {title ? <FooterTitle id={titleId}>{title}</FooterTitle> : null}
      <ul className={footerLinkListVariants({ vertical })}>{children}</ul>
    </nav>
  );
}

export type FooterLinkProps = ComponentProps<"a"> & {
  href: string;
};

/** One link in a `FooterLinkGroup`; renders the list item and the link. */
export function FooterLink({ className, children, ...props }: FooterLinkProps) {
  return (
    <li data-slot="footer-link">
      <a className={cn(footerLinkClassName, className)} {...props}>
        {children}
      </a>
    </li>
  );
}

export type FooterCopyrightProps = Omit<ComponentProps<"p">, "children"> & {
  /** The copyright holder, such as your company name. */
  by: ReactNode;
  /** Links the holder's name. */
  href?: string;
  /** The year after the © sign. */
  year?: number | string;
  /** Text after the holder, such as ". All Rights Reserved." */
  children?: ReactNode;
};

/** The copyright notice: © year, the holder (optionally linked) and any trailing text. */
export function FooterCopyright({
  by,
  href,
  year,
  className,
  children,
  ...props
}: FooterCopyrightProps) {
  return (
    <p data-slot="footer-copyright" className={cn(footerCopyrightClassName, className)} {...props}>
      ©{year !== undefined ? ` ${year}` : null}{" "}
      {href ? (
        <a href={href} className={footerLinkClassName}>
          {by}
        </a>
      ) : (
        by
      )}
      {children}
    </p>
  );
}

export type FooterDividerProps = ComponentProps<"hr">;

/** A horizontal rule between the footer's rows. */
export function FooterDivider({ className, ...props }: FooterDividerProps) {
  return (
    <hr data-slot="footer-divider" className={cn(footerDividerClassName, className)} {...props} />
  );
}

export type FooterIconsProps = ComponentProps<"ul">;

/** A row of `FooterIcon` links, such as social media profiles. Name it with `aria-label`. */
export function FooterIcons({ className, ...props }: FooterIconsProps) {
  return <ul data-slot="footer-icons" className={cn(footerIconsClassName, className)} {...props} />;
}

export type FooterIconProps = Omit<ComponentProps<"a">, "children"> & {
  href: string;
  /** The icon, 20px. It is decorative: `label` names the link. */
  icon: ReactNode;
  /** The link's accessible name, such as "GitHub account". Visually hidden. */
  label: string;
};

/** An icon-only link in `FooterIcons`, named by a visually hidden `label`. */
export function FooterIcon({ icon, label, className, ...props }: FooterIconProps) {
  return (
    <li data-slot="footer-icon">
      <a className={cn(footerIconClassName, className)} {...props}>
        {icon}
        <span className="sr-only">{label}</span>
      </a>
    </li>
  );
}
