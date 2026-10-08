---
"@stefan-florescu/ui": patch
---

Stop marking the whole bundle as `"use client"` so server-safe exports such as `cn()` can be called from React Server Components.
