"use client";

import { ChevronLeft, ChevronRight } from "@stefan-florescu/icons";
import { useId, useState } from "react";

import { Button, ButtonGroup, Input, Label, Select } from "@stefan-florescu/ui";

const totalPages = 99;
const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

export default function PaginationSelectButtons() {
  const id = useId();
  const [page, setPage] = useState(3);

  return (
    <nav aria-label="Pagination">
      <form className="flex items-center gap-3" onSubmit={(event) => event.preventDefault()}>
        <Label htmlFor={`${id}-page`} className="sr-only">
          Page
        </Label>
        <div className="w-16 shrink-0">
          <Select
            id={`${id}-page`}
            value={page}
            onChange={(event) => setPage(Number(event.target.value))}
            className="pe-8"
          >
            {pages.map((option) => (
              <option key={option} value={option}>
                {String(option).padStart(2, "0")}
              </option>
            ))}
          </Select>
        </div>
        <Input
          aria-label="Total pages"
          value={`of ${totalPages} pages`}
          readOnly
          disabled
          size="sm"
          className="disabled:bg-disabled w-28"
        />
        <ButtonGroup aria-label="Previous and next page">
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            aria-label="Previous"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft aria-hidden className="rtl:rotate-180" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            aria-label="Next"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight aria-hidden className="rtl:rotate-180" />
          </Button>
        </ButtonGroup>
      </form>
    </nav>
  );
}
