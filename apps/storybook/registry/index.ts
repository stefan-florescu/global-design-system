import type { ComponentType } from "react";

import ButtonDemo from "./demos/button-demo";
import ButtonDestructive from "./demos/button-destructive";
import ButtonGhost from "./demos/button-ghost";
import ButtonIcon from "./demos/button-icon";
import ButtonLink from "./demos/button-link";
import ButtonLoading from "./demos/button-loading";
import ButtonOutline from "./demos/button-outline";
import ButtonSecondary from "./demos/button-secondary";
import ButtonSizes from "./demos/button-sizes";
import ButtonWithIcon from "./demos/button-with-icon";

/**
 * Demo registry. Each key must match a file in registry/demos/<key>.tsx — the
 * file's source is what <ComponentPreview name="…" /> shows in its Code tab.
 */
export const demos = {
  "button-demo": ButtonDemo,
  "button-destructive": ButtonDestructive,
  "button-ghost": ButtonGhost,
  "button-icon": ButtonIcon,
  "button-link": ButtonLink,
  "button-loading": ButtonLoading,
  "button-outline": ButtonOutline,
  "button-secondary": ButtonSecondary,
  "button-sizes": ButtonSizes,
  "button-with-icon": ButtonWithIcon,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;
