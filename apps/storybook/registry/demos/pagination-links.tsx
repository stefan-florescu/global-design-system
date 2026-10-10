"use client";

import { useState } from "react";

import { Pagination } from "@stefan-florescu/ui";

export default function PaginationLinks() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      aria-label="Blog posts"
      size="sm"
      currentPage={page}
      totalPages={8}
      getPageHref={(target) => `?page=${target}`}
      onPageChange={(target, event) => {
        // With a client-side router, push the URL here instead of reloading the page.
        event.preventDefault();
        setPage(target);
      }}
    />
  );
}
