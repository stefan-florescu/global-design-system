import "react";

declare module "react" {
  /** Allow CSS custom properties (e.g. `style={{ "--r": "var(--sds-radius-lg)" }}`). */
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
