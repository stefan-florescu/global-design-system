"use client";

import { useState } from "react";

import { Badge } from "@stefan-florescu/ui";

export default function BadgeDismissible() {
  const [tags, setTags] = useState(["React", "Tailwind CSS", "Accessibility", "Tokens"]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="neutral"
          size="lg"
          onDismiss={() => setTags((current) => current.filter((t) => t !== tag))}
          dismissLabel={`Remove ${tag}`}
        >
          {tag}
        </Badge>
      ))}
      {tags.length === 0 ? (
        <button
          type="button"
          className="text-muted-foreground text-sm underline underline-offset-4"
          onClick={() => setTags(["React", "Tailwind CSS", "Accessibility", "Tokens"])}
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}
