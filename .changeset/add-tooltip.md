---
"@stefan-florescu/ui": minor
---

Add `Tooltip`: a short text in a dark or light box with an arrow that describes
its trigger (`aria-describedby`) or, with `mode="label"`, names an icon-only trigger
(`aria-labelledby`). It opens on hover and keyboard focus (or on click with `trigger="click"`) in the
top layer, flips when there is no room, stays open while hovered and hides with Escape (WCAG 1.4.13).
Options: `placement` (incl. `auto`), `variant` (`dark` | `light`), `arrow`, `animation`, `offset`,
`delay` and a controlled `open` state.

`Pagination` gains `showTooltips` ("Previous" / "Next" tooltips on icon-only controls) and
`Clipboard` gains `showTooltip` (the label, then "Copied!", in a tooltip on icon-only buttons).
Popover's positioning moved into a shared internal module; its behaviour is unchanged.
