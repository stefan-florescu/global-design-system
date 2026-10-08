import type { ReactNode } from "react";

export type BadgeVariant = "default" | "secondary" | "outline" | "success";

export function Badge({
  variant = "secondary",
  children,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
}) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
