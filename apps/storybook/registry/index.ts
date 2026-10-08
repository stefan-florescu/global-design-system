import type { ComponentType } from "react";

import ButtonAsLink from "./demos/button-as-link";
import ButtonDemo from "./demos/button-demo";
import ButtonDisabled from "./demos/button-disabled";
import ButtonFullWidth from "./demos/button-full-width";
import ButtonIcon from "./demos/button-icon";
import ButtonLoading from "./demos/button-loading";
import ButtonOutline from "./demos/button-outline";
import ButtonPill from "./demos/button-pill";
import ButtonSizes from "./demos/button-sizes";
import ButtonSizesWithIcon from "./demos/button-sizes-with-icon";
import ButtonVariants from "./demos/button-variants";
import ButtonWithIcon from "./demos/button-with-icon";
import ButtonWithLabel from "./demos/button-with-label";

/**
 * Demo registry. Each key must match a file in registry/demos/<key>.tsx — the
 * file's source is what <ComponentPreview name="…" /> shows in its Code tab.
 */
export const demos = {
  "button-as-link": ButtonAsLink,
  "button-demo": ButtonDemo,
  "button-disabled": ButtonDisabled,
  "button-full-width": ButtonFullWidth,
  "button-icon": ButtonIcon,
  "button-loading": ButtonLoading,
  "button-outline": ButtonOutline,
  "button-pill": ButtonPill,
  "button-sizes": ButtonSizes,
  "button-sizes-with-icon": ButtonSizesWithIcon,
  "button-variants": ButtonVariants,
  "button-with-icon": ButtonWithIcon,
  "button-with-label": ButtonWithLabel,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;
