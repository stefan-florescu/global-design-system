import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import { kbdVariants, type KbdVariantProps } from "./kbd.variants";

export type KbdProps = ComponentProps<"kbd"> & KbdVariantProps;

/**
 * A key on the keyboard, such as <Kbd>Ctrl</Kbd>, shown inline in text, tables and hints.
 * Renders the semantic `<kbd>` element. A key that shows only an icon (an arrow key) needs a
 * text alternative: add `<span className="sr-only">Arrow key up</span>` next to the icon.
 */
export function Kbd({ size, className, ...props }: KbdProps) {
  return <kbd data-slot="kbd" className={cn(kbdVariants({ size }), className)} {...props} />;
}
