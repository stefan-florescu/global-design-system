"use client";

import { Check, Clipboard as ClipboardIcon, ClipboardCheck } from "@stefan-florescu/icons";
import { useEffect, useState, type ComponentProps } from "react";

import { cn } from "../../lib/cn";

import {
  clipboardCheckClassName,
  clipboardChipIconClassName,
  clipboardChipLabelClassName,
  clipboardCopiedIconClassName,
  clipboardCopiedLabelClassName,
  clipboardVariants,
  type ClipboardVariantProps,
} from "./clipboard.variants";

export type ClipboardProps = Omit<ComponentProps<"button">, "children" | "value" | "onCopy"> &
  ClipboardVariantProps & {
    /** The text to copy. */
    value: string;
    /** Button text, or the accessible name when `iconOnly`. */
    label?: string;
    /** Text shown and announced after copying. */
    copiedLabel?: string;
    /** Milliseconds before the button returns to its normal state. */
    resetAfter?: number;
    /** Called after the value was copied. */
    onCopy?: (value: string) => void;
  };

/**
 * A button that copies `value` to the clipboard, confirms it with a check icon and "Copied!",
 * and announces the result to screen readers. Flowbite's four trigger styles: `brand` and
 * `secondary` buttons, a `ghost` icon button and a small `tertiary` chip.
 */
export function Clipboard({
  value,
  label = "Copy",
  copiedLabel = "Copied!",
  resetAfter = 2000,
  onCopy,
  variant,
  size,
  iconOnly,
  className,
  onClick,
  type = "button",
  ...props
}: ClipboardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), resetAfter);
    return () => window.clearTimeout(timer);
  }, [copied, resetAfter]);

  const text = copied ? copiedLabel : label;
  const tinted = copied && variant !== "brand" && variant !== undefined;
  const icon = copied ? (
    <ClipboardCheck aria-hidden className={cn(tinted && clipboardCopiedIconClassName)} />
  ) : (
    <ClipboardIcon aria-hidden />
  );

  let content;
  if (iconOnly) {
    content = icon;
  } else if (variant === "tertiary") {
    content = (
      <>
        {copied ? (
          <ClipboardCheck
            aria-hidden
            className={cn(clipboardChipIconClassName, clipboardCopiedIconClassName)}
          />
        ) : (
          <ClipboardIcon aria-hidden className={clipboardChipIconClassName} />
        )}
        <span className={cn(clipboardChipLabelClassName, copied && clipboardCopiedLabelClassName)}>
          {text}
        </span>
      </>
    );
  } else {
    content = (
      <>
        {copied ? <Check aria-hidden className={clipboardCheckClassName} /> : null}
        {text}
      </>
    );
  }

  return (
    <>
      <button
        type={type}
        aria-label={iconOnly ? text : undefined}
        data-slot="clipboard"
        data-copied={copied || undefined}
        className={cn(clipboardVariants({ variant, size, iconOnly }), className)}
        onClick={async (event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            onCopy?.(value);
          } catch {
            setCopied(false);
          }
        }}
        {...props}
      >
        {content}
      </button>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
