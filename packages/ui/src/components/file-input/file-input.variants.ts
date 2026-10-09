import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4 file input (https://flowbite.com/docs/forms/file-input/): the shared field styles
 * (see input.variants.ts) with the browser's "Choose file" button as a `neutral-quaternary`
 * segment with `body` text. The segment sits inside the field, 4px from its border, with its
 * start corners rounded to 8px: the field's 12px radius minus the gap, so the curves stay
 * parallel. The segment's padding sets the field height: 38, 42 and 50px, like the other fields.
 * Deviation: in dark mode the label is `heading`, because `body` on `neutral-quaternary` is under
 * 4.5:1 there.
 */
export const fileInputVariants = cva(
  [
    "cursor-pointer p-0 disabled:file:cursor-not-allowed",
    "file:my-1 file:ms-1 file:me-3 file:cursor-pointer file:rounded-s file:rounded-e-none file:border-0 file:bg-neutral-quaternary",
    "file:font-medium file:text-body hover:file:text-heading dark:file:text-heading",
  ],
  {
    variants: {
      size: {
        sm: "text-xs file:px-3 file:py-1.5 file:text-xs file:leading-4",
        md: "text-sm file:px-4 file:py-1.5 file:text-sm file:leading-5",
        lg: "text-lg file:px-5 file:py-2.5 file:text-sm file:leading-5",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type FileInputVariantProps = VariantProps<typeof fileInputVariants>;

/*
 * Flowbite's dropzone: a 256px dashed area on `neutral-secondary-medium` that darkens on hover.
 * The dashed border is the `input` token (gray-200, as Flowbite's `default-strong`). The native input is stretched over it, invisible, so clicking,
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
