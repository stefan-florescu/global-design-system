import uiPackage from "@stefan-florescu/ui/package.json";

export const siteConfig = {
  name: "Stefan Design System",
  shortName: "Stefan DS",
  description: "Token-driven, accessible, multi-theme design system for React.",
  /**
   * The released version of `@stefan-florescu/ui`. Before the first release the package still says
   * 0.0.0, so the site shows the version that release ships as.
   */
  version: uiPackage.version === "0.0.0" ? "1.0.0" : uiPackage.version,
  links: {
    github: "https://github.com/stefan-florescu/global-design-system",
  },
};
