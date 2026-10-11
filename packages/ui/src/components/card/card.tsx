import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  cardBodyVariants,
  cardDescriptionClassName,
  cardImageVariants,
  cardTitleClassName,
  cardVariants,
  type CardVariantProps,
} from "./card.variants";

export type CardProps = Omit<ComponentProps<"div">, "children"> &
  CardVariantProps & {
    /** Make the whole card a link. Keep its content short: everything inside is the link text. */
    href?: string;
    /** Image shown flush at the top, or on the left with `horizontal`. */
    imgSrc?: string;
    /** Alternative text for the image. Leave empty when the image is decorative. */
    imgAlt?: string;
    children?: ReactNode;
  };

/**
 * A surface that groups related content and actions about a single subject. Children sit in a
 * `p-6` body, under the image when there is one.
 */
export function Card({
  href,
  horizontal,
  imgSrc,
  imgAlt = "",
  className,
  children,
  ...props
}: CardProps) {
  const classes = cn(cardVariants({ horizontal, interactive: Boolean(href) }), className);
  const content = (
    <>
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt} className={cardImageVariants({ horizontal })} />
      ) : null}
      <div className={cardBodyVariants({ horizontal })}>{children}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        data-slot="card"
        className={classes}
        {...(props as Omit<ComponentProps<"a">, "children">)}
      >
        {content}
      </a>
    );
  }

  return (
    <div data-slot="card" className={classes} {...props}>
      {content}
    </div>
  );
}

export type CardTitleProps = ComponentProps<"h3"> & {
  /** Heading level. Match the page outline. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/** The card's heading: a 24px semibold title with a 12px gap below. */
export function CardTitle({ headingLevel = 3, className, ...props }: CardTitleProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <Heading data-slot="card-title" className={cn(cardTitleClassName, className)} {...props} />
  );
}

/** Supporting text under the title. */
export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(cardDescriptionClassName, className)}
      {...props}
    />
  );
}
