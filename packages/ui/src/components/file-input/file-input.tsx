import { CloudUpload } from "@stefan-florescu/icons";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { fieldVariants } from "../input/input.variants";

import {
  fileDropzoneClassName,
  fileDropzoneContentClassName,
  fileInputVariants,
  type FileInputVariantProps,
} from "./file-input.variants";

export type FileInputProps = Omit<ComponentProps<"input">, "type" | "size"> &
  FileInputVariantProps & {
    /** Marks the selection as wrong: red border and `aria-invalid`. */
    invalid?: boolean;
  };

/** A native file field. Give it a `Label`; use `accept` and `multiple` as usual. */
export function FileInput({ size, invalid, className, ...props }: FileInputProps) {
  return (
    <input
      type="file"
      data-slot="file-input"
      aria-invalid={invalid || undefined}
      className={cn(fieldVariants(), fileInputVariants({ size }), className)}
      {...props}
    />
  );
}

export type FileDropzoneProps = Omit<ComponentProps<"input">, "type" | "title"> & {
  /** Main text, which also names the field. */
  title?: ReactNode;
  /** Secondary text, such as accepted formats and size. */
  description?: ReactNode;
};

/**
 * A large drop area for files. The whole area is the file input's label, so it can be clicked,
 * focused with the keyboard, or receive dropped files.
 */
export function FileDropzone({
  title = (
    <>
      <span className="font-semibold">Click to upload</span> or drag and drop
    </>
  ),
  description,
  className,
  ...props
}: FileDropzoneProps) {
  return (
    <label data-slot="file-dropzone" className={cn(fileDropzoneClassName, className)}>
      <span className={fileDropzoneContentClassName}>
        <CloudUpload aria-hidden className="mb-4 size-8" />
        <span className="mb-2 text-sm">{title}</span>
        {description ? <span className="text-xs">{description}</span> : null}
      </span>
      <input type="file" className="absolute inset-0 cursor-pointer opacity-0" {...props} />
    </label>
  );
}
