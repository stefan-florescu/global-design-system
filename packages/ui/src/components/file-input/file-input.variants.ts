import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4 file input (https://flowbite.com/docs/forms/file-input/): the shared field styles
 * (see input.variants.ts) with no padding, and the browser's "Choose file" button styled as
 * Flowbite's plugin does: a `neutral-quaternary` segment with `body` text. Deviation: in dark
 * mode that text is `heading`, because `body` on `neutral-quaternary` is under 4.5:1 there.
 * The button keeps `text-sm` and takes the field's line height, so `lg` grows by 2px like
 * Flowbite's large input.
 */
export const fileInputVariants = cva(
  [
    "cursor-pointer p-0 disabled:file:cursor-not-allowed",
    "file:-ms-4 file:me-4 file:cursor-pointer file:border-0 file:bg-neutral-quaternary file:py-2.5 file:ps-8 file:pe-4",
    "file:text-sm file:leading-[inherit] file:font-medium file:text-body dark:file:text-heading",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type FileInputVariantProps = VariantProps<typeof fileInputVariants>;

/*
 * Flowbite's dropzone: a 256px dashed area on `neutral-secondary-medium` that darkens on hover.
 * Deviation: the dashed border is the `input` token (Flowbite: `default-strong`), so the drop
 * area's edge reaches 3:1. The native input is stretched over it, invisible, so clicking,
 * keyboard focus and drag-and-drop all work without script; keyboard focus outlines the area.
 */
export const fileDropzoneClassName = [
  "relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-base",
  "border border-dashed border-input bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium",
  "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-solid has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring",
  "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
].join(" ");

/** The dropzone's content: icon, title and description in `body`. */
export const fileDropzoneContentClassName =
  "flex flex-col items-center justify-center pt-5 pb-6 text-center text-body";
