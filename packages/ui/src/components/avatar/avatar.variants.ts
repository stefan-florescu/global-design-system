import { cva, type VariantProps } from "class-variance-authority";

/* Flowbite's avatar sizes (24–144px) on the 4px spacing scale. */
export const avatarVariants = cva("relative inline-flex shrink-0", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-8",
      md: "size-10",
      lg: "size-20",
      xl: "size-36",
    },
  },
  defaultVariants: { size: "md" },
});

/** The visible circle or square: image, initials or placeholder. */
export const avatarFrameVariants = cva(
  "flex size-full items-center justify-center overflow-hidden bg-muted font-medium text-muted-foreground select-none",
  {
    variants: {
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-2xl",
        xl: "text-5xl",
      },
      bordered: {
        true: "p-1 ring-2 ring-border",
        false: "",
      },
      stacked: {
        true: "ring-2 ring-background",
        false: "",
      },
    },
    defaultVariants: { shape: "circle", size: "md", bordered: false, stacked: false },
  },
);

export const avatarImageVariants = cva("size-full object-cover", {
  variants: {
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: { shape: "circle" },
});

export const avatarStatusVariants = cva("absolute rounded-full border-2 border-background", {
  variants: {
    status: {
      online: "bg-success",
      away: "bg-warning",
      busy: "bg-destructive",
      offline: "bg-muted-foreground",
    },
    size: {
      xs: "size-2",
      sm: "size-2.5",
      md: "size-3.5",
      lg: "size-5",
      xl: "size-7",
    },
    position: {
      "top-right": "top-0 right-0",
      "bottom-right": "right-0 bottom-0",
    },
  },
  defaultVariants: { size: "md", position: "bottom-right" },
});

export const avatarGroupCounterClassName = [
  "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full",
  "bg-primary text-xs font-medium text-primary-foreground no-underline ring-2 ring-background",
  "outline-hidden focus-visible:ring-ring",
].join(" ");

export type AvatarVariantProps = VariantProps<typeof avatarVariants> &
  Omit<VariantProps<typeof avatarFrameVariants>, "size">;
