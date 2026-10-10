"use client";

import { useState } from "react";

import { Pagination } from "@stefan-florescu/ui";

export default function PaginationIcons() {
  const [page, setPage] = useState(3);

  return (
    <div className="flex flex-col items-center gap-6">
      <Pagination size="sm" showIcons currentPage={page} totalPages={10} onPageChange={setPage} />
      <Pagination showIcons currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}
