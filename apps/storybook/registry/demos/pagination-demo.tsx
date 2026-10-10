"use client";

import { useState } from "react";

import { Pagination } from "@stefan-florescu/ui";

export default function PaginationDemo() {
  const [page, setPage] = useState(3);

  return (
    <div className="flex flex-col items-center gap-6">
      <Pagination size="sm" currentPage={page} totalPages={10} onPageChange={setPage} />
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}
