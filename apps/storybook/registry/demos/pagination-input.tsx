"use client";

import { useId, useState, type FormEvent } from "react";

import { Input, Pagination } from "@stefan-florescu/ui";

const totalPages = 99;

export default function PaginationInput() {
  const id = useId();
  const [page, setPage] = useState(3);

  function goTo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(new FormData(event.currentTarget).get("page"));
    if (Number.isInteger(value)) setPage(Math.min(Math.max(value, 1), totalPages));
  }

  return (
    <Pagination size="sm" currentPage={page} totalPages={totalPages} onPageChange={setPage}>
      <form onSubmit={goTo} className="flex items-center gap-2">
        <label htmlFor={`${id}-page`} className="text-body shrink-0 text-sm font-medium">
          Go to
        </label>
        <Input
          id={`${id}-page`}
          name="page"
          size="sm"
          inputMode="numeric"
          placeholder="99"
          required
          className="w-10"
        />
        <span className="text-body text-sm font-medium">page</span>
      </form>
    </Pagination>
  );
}
