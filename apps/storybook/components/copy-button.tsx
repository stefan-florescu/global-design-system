"use client";

import { Check, Copy } from "@stefan-florescu/icons";
import { useEffect, useState } from "react";

/** Copy-to-clipboard button. `subtle` is the variant for light surfaces (preview toolbar). */
export function CopyButton({ value, subtle = false }: { value: string; subtle?: boolean }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      className={subtle ? "copy-button copy-button--subtle" : "copy-button"}
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      data-copied={copied || undefined}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      }}
    >
      <Copy aria-hidden className="icon-copy" size={16} />
      <Check aria-hidden className="icon-check" size={16} />
    </button>
  );
}
