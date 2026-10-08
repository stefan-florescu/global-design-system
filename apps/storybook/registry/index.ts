import type { ComponentType } from "react";

import AccordionBrand from "./demos/accordion-brand";
import AccordionCollapsed from "./demos/accordion-collapsed";
import AccordionDemo from "./demos/accordion-demo";
import AccordionFlush from "./demos/accordion-flush";
import AccordionIcon from "./demos/accordion-icon";
import AccordionMultiple from "./demos/accordion-multiple";
import AccordionNested from "./demos/accordion-nested";
import AlertAccentBorder from "./demos/alert-accent-border";
import AlertAdditionalContent from "./demos/alert-additional-content";
import AlertBordered from "./demos/alert-bordered";
import AlertDemo from "./demos/alert-demo";
import AlertDismissible from "./demos/alert-dismissible";
import AlertIcon from "./demos/alert-icon";
import AlertList from "./demos/alert-list";
import AvatarBordered from "./demos/avatar-bordered";
import AvatarDemo from "./demos/avatar-demo";
import AvatarInitials from "./demos/avatar-initials";
import AvatarPlaceholder from "./demos/avatar-placeholder";
import AvatarSizes from "./demos/avatar-sizes";
import AvatarStacked from "./demos/avatar-stacked";
import AvatarStatus from "./demos/avatar-status";
import AvatarText from "./demos/avatar-text";
import BadgeBordered from "./demos/badge-bordered";
import BadgeDemo from "./demos/badge-demo";
import BadgeDismissible from "./demos/badge-dismissible";
import BadgeIcon from "./demos/badge-icon";
import BadgeIconOnly from "./demos/badge-icon-only";
import BadgeLarge from "./demos/badge-large";
import BadgeLink from "./demos/badge-link";
import BadgeNotification from "./demos/badge-notification";
import BadgePill from "./demos/badge-pill";
import BannerBottom from "./demos/banner-bottom";
import BannerCta from "./demos/banner-cta";
import BannerDemo from "./demos/banner-demo";
import BannerInformational from "./demos/banner-informational";
import BottomNavigationAppBar from "./demos/bottom-navigation-app-bar";
import BottomNavigationBordered from "./demos/bottom-navigation-bordered";
import BottomNavigationDemo from "./demos/bottom-navigation-demo";
import BreadcrumbDemo from "./demos/breadcrumb-demo";
import BreadcrumbSolid from "./demos/breadcrumb-solid";
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
  "accordion-brand": AccordionBrand,
  "accordion-collapsed": AccordionCollapsed,
  "accordion-demo": AccordionDemo,
  "accordion-flush": AccordionFlush,
  "accordion-icon": AccordionIcon,
  "accordion-multiple": AccordionMultiple,
  "accordion-nested": AccordionNested,
  "alert-accent-border": AlertAccentBorder,
  "alert-additional-content": AlertAdditionalContent,
  "alert-bordered": AlertBordered,
  "alert-demo": AlertDemo,
  "alert-dismissible": AlertDismissible,
  "alert-icon": AlertIcon,
  "alert-list": AlertList,
  "avatar-bordered": AvatarBordered,
  "avatar-demo": AvatarDemo,
  "avatar-initials": AvatarInitials,
  "avatar-placeholder": AvatarPlaceholder,
  "avatar-sizes": AvatarSizes,
  "avatar-stacked": AvatarStacked,
  "avatar-status": AvatarStatus,
  "avatar-text": AvatarText,
  "badge-bordered": BadgeBordered,
  "badge-demo": BadgeDemo,
  "badge-dismissible": BadgeDismissible,
  "badge-icon": BadgeIcon,
  "badge-icon-only": BadgeIconOnly,
  "badge-large": BadgeLarge,
  "badge-link": BadgeLink,
  "badge-notification": BadgeNotification,
  "badge-pill": BadgePill,
  "banner-bottom": BannerBottom,
  "banner-cta": BannerCta,
  "banner-demo": BannerDemo,
  "banner-informational": BannerInformational,
  "bottom-navigation-app-bar": BottomNavigationAppBar,
  "bottom-navigation-bordered": BottomNavigationBordered,
  "bottom-navigation-demo": BottomNavigationDemo,
  "breadcrumb-demo": BreadcrumbDemo,
  "breadcrumb-solid": BreadcrumbSolid,
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
