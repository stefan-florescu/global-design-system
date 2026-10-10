---
"@stefan-florescu/tokens": minor
"@stefan-florescu/themes": minor
---

The `input` token (field, checkbox, radio and toggle-track borders) is now gray-200 in light mode and gray-700 in dark mode, for lighter field borders. By design it sits below 3:1 against the page, so the themes build no longer checks it (43 pairings). The `gray.450` primitive, used only by `input`, is removed.
