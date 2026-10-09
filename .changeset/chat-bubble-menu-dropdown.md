---
"@stefan-florescu/ui": minor
---

Rebuild `ChatBubbleMenu` and `ChatBubbleMenuItem` on `Dropdown`: the "more" button is now a WAI-ARIA menu button with arrow keys, Home, End, typeahead and Escape. `ChatBubbleMenu` gains `placement`, `open`, `defaultOpen` and `onOpenChange`; `ChatBubbleMenuItem` takes `DropdownItem` props (`href`, `variant`, `disabled`…).
