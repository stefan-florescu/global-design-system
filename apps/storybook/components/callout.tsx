import { CircleAlert, CircleCheck, Info, TriangleAlert } from "@stefan-florescu/icons";
import type { ReactNode } from "react";

const ICONS = { info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert };

export function Callout({
  title,
  variant = "info",
  children,
}: {
  title?: string;
  variant?: keyof typeof ICONS;
  children: ReactNode;
}) {
  const Icon = ICONS[variant];
  return (
    <div className={`callout callout--${variant}`}>
      <span className="callout__icon" aria-hidden>
        <Icon size={18} />
      </span>
      <div className="callout__body">
        {title ? <p className="callout__title">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}
