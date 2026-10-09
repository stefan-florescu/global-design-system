"use client";

import { useId, useState } from "react";

import { Label, Pagination, Select } from "@stefan-florescu/ui";

export default function PaginationDropdown() {
  const id = useId();
  const [page, setPage] = useState(3);
  const [perPage, setPerPage] = useState(10);

  return (
    <Pagination
      size="sm"
      currentPage={page}
      totalPages={Math.ceil(1000 / perPage)}
      onPageChange={setPage}
    >
      <form className="w-32">
        <Label htmlFor={`${id}-per-page`} className="sr-only">
          Items per page
        </Label>
        <Select
          id={`${id}-per-page`}
          value={perPage}
          className="pe-8"
          onChange={(event) => {
            setPerPage(Number(event.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </Select>
      </form>
    </Pagination>
  );
}
