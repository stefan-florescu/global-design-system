"use client";

import { useState } from "react";

import { Badge } from "@stefan-florescu/ui";

const BADGES = [
  { variant: "brand", label: "Brand" },
  { variant: "alternative", label: "Alternative" },
  { variant: "gray", label: "Gray" },
  { variant: "danger", label: "Danger" },
  { variant: "success", label: "Success" },
  { variant: "warning", label: "Warning" },
] as const;

export default function BadgeAvatar() {
  const [badges, setBadges] = useState<readonly (typeof BADGES)[number][]>(BADGES);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {badges.map(({ variant, label }) => (
        <Badge
          key={variant}
          variant={variant}
          bordered
          onDismiss={() => setBadges((current) => current.filter((b) => b.variant !== variant))}
          dismissLabel={`Remove ${label}`}
        >
          <img src="/avatars/1.svg" alt="" className="me-1 size-3.5 rounded-full" />
          {label}
        </Badge>
      ))}
      {badges.length === 0 ? (
        <button
          type="button"
          className="text-fg-brand text-sm font-medium underline underline-offset-4"
          onClick={() => setBadges(BADGES)}
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}
