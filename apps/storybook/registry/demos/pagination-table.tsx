"use client";

import { useState } from "react";

import { Pagination } from "@stefan-florescu/ui";

export default function PaginationTable() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        layout="table"
        size="sm"
        currentPage={page}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={setPage}
      />
      <Pagination
        layout="table"
        currentPage={page}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={setPage}
      />
    </div>
  );
}
