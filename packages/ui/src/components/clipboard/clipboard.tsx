"use client";

import { Check, Copy } from "@stefan-florescu/icons";
import { useEffect, useState } from "react";

import { Button, type ButtonProps } from "../button";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type ClipboardProps = DistributiveOmit<ButtonProps, "children" | "value" | "onCopy"> & {
  /** The text to copy. */
  value: string;
  /** Button text (the accessible name when `iconOnly`). */
  label?: string;
  /** Text shown and announced after copying. */
  copiedLabel?: string;
  /** Milliseconds before the button returns to its normal state. */
  resetAfter?: number;
  /** Called after the value was copied. */
  onCopy?: (value: string) => void;
};

/**
 * A button that copies `value` to the clipboard, confirms with a check icon and "Copied!", and
 * announces the result to screen readers.
 */
export function Clipboard({
  value,
  label = "Copy",
  copiedLabel = "Copied!",
  resetAfter = 2000,
  onCopy,
  iconOnly,
  onClick,
  ...props
}: ClipboardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), resetAfter);
    return () => window.clearTimeout(timer);
  }, [copied, resetAfter]);

  const text = copied ? copiedLabel : label;

  return (
    <>
      <Button
        {...(props as ButtonProps)}
        iconOnly={iconOnly}
        aria-label={iconOnly ? text : undefined}
        data-slot="clipboard"
        data-copied={copied || undefined}
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
      >
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        {iconOnly ? null : text}
      </Button>
      <span role="status" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
