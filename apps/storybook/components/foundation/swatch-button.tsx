"use client";

import { useEffect, useState, type CSSProperties } from "react";

/** A colour swatch that copies its hex value when clicked. */
export function SwatchButton({
  hex,
  label,
  style,
}: {
  hex: string;
  label: string;
  style: CSSProperties;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      className="scale__swatch"
      type="button"
      style={style}
      aria-label={`Copy ${hex}, ${label}`}
      data-copied={copied || undefined}
      onClick={async () => {
        await navigator.clipboard.writeText(hex);
        setCopied(true);
      }}
    />
  );
}
