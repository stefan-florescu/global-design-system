"use client";

import { useState } from "react";

import { Pagination } from "@stefan-florescu/ui";

export default function PaginationNavigation() {
  const [page, setPage] = useState(3);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        layout="navigation"
        size="sm"
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
      />
      <Pagination layout="navigation" currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}
