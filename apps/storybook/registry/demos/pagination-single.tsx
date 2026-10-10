"use client";

import { useState } from "react";

import { Pagination } from "@stefan-florescu/ui";

export default function PaginationSingle() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      layout="single"
      size="sm"
      currentPage={page}
      totalPages={99}
      onPageChange={setPage}
    />
  );
}
