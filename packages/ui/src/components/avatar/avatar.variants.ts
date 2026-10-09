import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4 avatars, class for class (https://flowbite.com/docs/components/avatar/), on our
 * semantic tokens. `md` (40px) is Flowbite's default avatar; the other sizes are its "Sizes"
 * example: 18, 24, 32, 44, 56 and 64px.
 */
export const avatarVariants = cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      "2xs": "size-4.5",
      xs: "size-6",
      sm: "size-8",
      md: "size-10",
      lg: "size-11",
      xl: "size-14",
      "2xl": "size-16",
    },
  },
  defaultVariants: { size: "md" },
});

/** The visible circle or square: image, initials or placeholder. */
export const avatarFrameVariants = cva(
  "relative flex size-full items-center justify-center overflow-hidden font-medium select-none",
  {
    variants: {
      shape: {
        circle: "rounded-full",
        square: "rounded-base",
      },
      size: {
        "2xs": "text-xs",
        xs: "text-xs",
        sm: "text-xs",
        md: "text-base",
        lg: "text-base",
        xl: "text-xl",
        "2xl": "text-xl",
      },
      content: {
        image: "",
        initials: "bg-neutral-tertiary text-body",
        placeholder: "bg-neutral-secondary-medium text-body-subtle",
      },
      bordered: {
        true: "p-1 ring-2 ring-default",
        false: "",
      },
      stacked: {
        true: "border-2 border-buffer",
        false: "",
      },
    },
    compoundVariants: [
      // Flowbite's smallest square avatars use the 6px radius.
      { shape: "square", size: ["2xs", "xs"], className: "rounded-sm" },
    ],
    defaultVariants: {
      shape: "circle",
      size: "md",
      content: "image",
      bordered: false,
      stacked: false,
    },
  },
);

export const avatarImageVariants = cva("size-full object-cover", {
  variants: {
    shape: {
      circle: "rounded-full",
      square: "",
    },
  },
  defaultVariants: { shape: "circle" },
});

/** Flowbite's placeholder: a person silhouette, larger than the frame and cropped by it. */
export const avatarPlaceholderClassName = "absolute -start-1/10 top-0 size-6/5 fill-current";

/** Flowbite's dot indicator: 14px with a 2px `buffer` ring that separates it from the image. */
export const avatarStatusVariants = cva("absolute rounded-full border-2 border-buffer", {
  variants: {
    status: {
      online: "bg-success",
      away: "bg-warning",
      busy: "bg-danger",
      offline: "bg-neutral-quaternary",
    },
    size: {
      "2xs": "size-2",
      xs: "size-2.5",
      sm: "size-3",
      md: "size-3.5",
      lg: "size-3.5",
      xl: "size-4",
      "2xl": "size-4",
    },
    position: {
      "top-right": "top-0",
      "bottom-right": "bottom-0",
    },
    shape: {
      circle: "-end-0.5",
      square: "-end-1.5",
    },
  },
  compoundVariants: [
    // On squares the dot sits on the corner, as in Flowbite.
    { shape: "square", position: "top-right", className: "-translate-y-1/2" },
    { shape: "square", position: "bottom-right", className: "translate-y-1/4" },
  ],
  defaultVariants: { size: "md", position: "bottom-right", shape: "circle" },
});

/** The "+99" item at the end of an avatar group. */
export const avatarGroupCounterClassName = [
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-buffer",
  "bg-dark-strong text-xs font-medium text-dark-foreground no-underline",
  focusOutline,
].join(" ");

export type AvatarVariantProps = VariantProps<typeof avatarVariants> &
  Pick<VariantProps<typeof avatarFrameVariants>, "shape" | "bordered" | "stacked">;
