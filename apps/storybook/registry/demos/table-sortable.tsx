"use client";

import { useState } from "react";

import { ChevronDown, ChevronsUpDown, ChevronUp } from "@stefan-florescu/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

type Product = { name: string; color: string; category: string; price: number };
type SortKey = "color" | "category" | "price";
type Sort = { key: SortKey; direction: "ascending" | "descending" } | null;

const products: Product[] = [
  { name: 'Apple MacBook Pro 17"', color: "Silver", category: "Laptop", price: 2999 },
  { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: 1999 },
  { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: 99 },
];

const columns: { key: SortKey; label: string }[] = [
  { key: "color", label: "Color" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
];

export default function TableSortable() {
  const [sort, setSort] = useState<Sort>(null);

  const rows = sort
    ? [...products].sort((a, b) => {
        const order = a[sort.key] < b[sort.key] ? -1 : a[sort.key] > b[sort.key] ? 1 : 0;
        return sort.direction === "ascending" ? order : -order;
      })
    : products;

  return (
    <Table>
      <TableCaption visuallyHidden>Products, sortable by color, category and price</TableCaption>
      <TableHead>
        <TableHeadCell>Product name</TableHeadCell>
        {columns.map(({ key, label }) => {
          const direction = sort?.key === key ? sort.direction : undefined;
          const Icon =
            direction === "ascending"
              ? ChevronUp
              : direction === "descending"
                ? ChevronDown
                : ChevronsUpDown;
          return (
            // aria-sort tells screen readers which column orders the rows, and how.
            <TableHeadCell key={key} aria-sort={direction}>
              <button
                type="button"
                className="hover:text-heading inline-flex cursor-pointer items-center font-medium"
                onClick={() =>
                  setSort({
                    key,
                    direction: direction === "ascending" ? "descending" : "ascending",
                  })
                }
              >
                {label}
                <Icon aria-hidden className="ms-1 size-4" />
              </button>
            </TableHeadCell>
          );
        })}
        <TableHeadCell>
          <span className="sr-only">Edit</span>
        </TableHeadCell>
      </TableHead>
      <TableBody>
        {rows.map((product) => (
          <TableRow key={product.name}>
            <TableHeadCell scope="row">{product.name}</TableHeadCell>
            <TableCell>{product.color}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell className="text-end">
              <a href="#edit" className="text-fg-brand font-medium hover:underline">
                Edit<span className="sr-only"> {product.name}</span>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
