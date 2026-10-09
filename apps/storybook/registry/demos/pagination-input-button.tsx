"use client";

import { useId, useState, type FormEvent } from "react";

import { Button, Input } from "@stefan-florescu/ui";

const totalPages = 99;

export default function PaginationInputButton() {
  const id = useId();
  const [page, setPage] = useState(1);

  function goTo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(new FormData(event.currentTarget).get("page"));
    if (Number.isInteger(value) && value > 0) setPage(Math.min(value, totalPages));
  }

  return (
    <nav aria-label="Pagination">
      <form onSubmit={goTo} className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor={`${id}-page`} className="text-heading shrink-0 text-sm font-medium">
            Go to
          </label>
          <Input
            id={`${id}-page`}
            name="page"
            size="sm"
            inputMode="numeric"
            placeholder="99"
            aria-describedby={`${id}-current`}
            className="w-10"
          />
          <span className="text-heading text-sm font-medium">page</span>
        </div>
        <Button type="submit" size="sm">
          Go
        </Button>
        <span id={`${id}-current`} aria-live="polite" className="sr-only">
          Page {page} of {totalPages}
        </span>
      </form>
    </nav>
  );
}
