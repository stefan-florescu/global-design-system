import { User } from "@stefan-florescu/icons";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import {
  avatarFrameVariants,
  avatarGroupCounterClassName,
  avatarImageVariants,
  avatarPlaceholderClassName,
  avatarStatusVariants,
  avatarVariants,
  type AvatarVariantProps,
} from "./avatar.variants";

type AvatarStatus = "online" | "away" | "busy" | "offline";

const STATUS_LABELS: Record<AvatarStatus, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
};

export type AvatarProps = Omit<ComponentProps<"span">, "children"> &
  AvatarVariantProps & {
    /** Image URL. Without it, the avatar shows `initials` or a placeholder icon. */
    src?: string;
    /**
     * Who the avatar shows, for example "Jese Leos". Read by screen readers. Leave it out only
     * when the name is already shown next to the avatar.
     */
    alt?: string;
    /** One or two letters shown when there is no image. */
    initials?: string;
    /** Presence dot. Announced to screen readers as `statusLabel`. */
    status?: AvatarStatus;
    /** Corner of the presence dot. */
    statusPosition?: "top-right" | "bottom-right";
    /** Text announced for the status. Defaults to "Online", "Away", "Busy" or "Offline". */
    statusLabel?: string;
  };

/** An image, initials or placeholder that represents a person or entity. */
export function Avatar({
  src,
  alt,
  initials,
  size = "md",
  shape = "circle",
  bordered,
  stacked,
  status,
  statusPosition = "bottom-right",
  statusLabel,
  className,
  ...props
}: AvatarProps) {
  const label = alt || undefined;

  return (
    <span data-slot="avatar" className={cn(avatarVariants({ size }), className)} {...props}>
      <span
        className={avatarFrameVariants({
          shape,
          size,
          bordered,
          stacked,
          content: src ? "image" : initials ? "initials" : "placeholder",
        })}
      >
        {src ? (
          <img src={src} alt={alt ?? ""} className={avatarImageVariants({ shape })} />
        ) : initials ? (
          <span
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
          >
            {initials}
          </span>
        ) : (
          <span
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            className="size-full"
          >
            <User aria-hidden className={avatarPlaceholderClassName} />
          </span>
        )}
      </span>
      {status ? (
        <span className={avatarStatusVariants({ status, size, shape, position: statusPosition })}>
          <span className="sr-only">{statusLabel ?? STATUS_LABELS[status]}</span>
        </span>
      ) : null}
    </span>
  );
}

/** Overlaps avatars in a row. Give each avatar `stacked` so it is outlined against the next. */
export function AvatarGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="avatar-group" className={cn("flex -space-x-4", className)} {...props} />;
}

export type AvatarGroupCounterProps = ComponentProps<"span"> & {
  /** Link to the full list. Renders an `<a>` when set. */
  href?: string;
};

/** The "+99" item at the end of an avatar group. */
export function AvatarGroupCounter({
  href,
  className,
  children,
  ...props
}: AvatarGroupCounterProps) {
  const classes = cn(avatarGroupCounterClassName, className);
  if (href) {
    return (
      <a
        href={href}
        data-slot="avatar-group-counter"
        className={classes}
        {...(props as ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }
  return (
    <span data-slot="avatar-group-counter" className={classes} {...props}>
      {children}
    </span>
  );
}
