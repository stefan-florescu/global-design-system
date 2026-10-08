import { ChevronRight } from "@stefan-florescu/icons";
import type { ReactNode } from "react";

import { Badge, type BadgeVariant } from "./badge";

export type PageBadge = { label: string; variant?: BadgeVariant };

export function PageHeader({
  title,
  description,
  section,
  badges = [],
  id,
}: {
  title: string;
  description?: ReactNode;
  section?: string;
  badges?: PageBadge[];
  id?: string;
}) {
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <span>Docs</span>
        {section ? (
          <>
            <ChevronRight aria-hidden size={14} />
            <span>{section}</span>
          </>
        ) : null}
        <ChevronRight aria-hidden size={14} />
        <span className="breadcrumb__current" aria-current="page">
          {title}
        </span>
      </nav>
      <header className="page-header">
        <h1 className="page-header__title" id={id ?? title.toLowerCase().replace(/\W+/g, "-")}>
          {title}
        </h1>
        {description ? <p className="page-header__lead">{description}</p> : null}
        {badges.length ? (
          <div className="page-header__meta">
            {badges.map((badge) => (
              <Badge key={badge.label} variant={badge.variant}>
                {badge.label}
              </Badge>
            ))}
          </div>
        ) : null}
      </header>
    </>
  );
}
