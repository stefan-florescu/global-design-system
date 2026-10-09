import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Teaches tailwind-merge the scale names our preset adds (Flowbite's `rounded-base`). */
const twMerge = extendTailwindMerge({
  extend: { theme: { radius: ["base"] } },
});

/**
 * Merge class names and resolve Tailwind conflicts (last one wins).
 * Used by every component to combine CVA variants with a consumer `className`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
