"use client";

import { useState } from "react";

import { Pagination } from "@stefan-florescu/ui";

export default function PaginationEllipsis() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      size="sm"
      showIcons
      showEllipsis
      siblingCount={1}
      currentPage={page}
      totalPages={99}
      onPageChange={setPage}
    />
  );
}
