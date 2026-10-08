"use client";

import { X } from "@stefan-florescu/icons";
import { useState, type ComponentProps } from "react";

import { cn } from "../../lib/cn";

import { bannerDismissClassName, bannerVariants, type BannerVariantProps } from "./banner.variants";

export type BannerProps = ComponentProps<"section"> &
  BannerVariantProps & {
    /** Show a close button. The banner hides itself when it is pressed. */
    dismissible?: boolean;
    /** Accessible name of the close button. */
    dismissLabel?: string;
    /** Called after the close button is pressed, for example to remember the choice. */
    onDismiss?: () => void;
  };

/**
 * A site-wide message pinned to the top or bottom of the page: an announcement, a call to
 * action or a notice. Rendered as a labelled region ("Announcement" by default).
 */
export function Banner({
  position,
  floating,
  dismissible = false,
  dismissLabel = "Close banner",
  onDismiss,
  className,
  children,
  ...props
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <section
      aria-label="Announcement"
      data-slot="banner"
      className={cn(bannerVariants({ position, floating }), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-3">{children}</div>
      {dismissible ? (
        <button
          type="button"
          aria-label={dismissLabel}
          className={bannerDismissClassName}
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
        >
          <X aria-hidden />
        </button>
      ) : null}
    </section>
  );
}
