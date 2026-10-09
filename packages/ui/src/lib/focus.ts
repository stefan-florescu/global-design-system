/*
 * Keyboard focus, shared by every interactive component.
 *
 * Components keep Flowbite's own focus styles (the soft `focus:ring-4 focus:ring-brand-medium`
 * halo on buttons, the brand border on fields). Those halos are under 3:1 against the page, so
 * keyboard focus also draws a solid outline in the `ring` token, which reaches 3:1 on every
 * surface (WCAG 2.4.7, 1.4.11). Pointer clicks show only Flowbite's halo.
 *
 * `outline-solid` is required: `outline-hidden` sets Tailwind's outline style to `none`, and
 * `outline-2` alone would inherit it and draw nothing.
 */
export const focusOutline =
  "outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring";

/** The same outline with no gap, for controls that sit flush with their neighbours. */
export const focusOutlineInset =
  "outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring";
