"use client";

import { useState } from "react";

import {
  Checkbox,
  Pagination,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

const catalogue = [
  { name: 'Apple MacBook Pro 17"', color: "Silver", category: "Laptop", price: "$2999" },
  { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
  { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
  { name: "Apple Watch", color: "Black", category: "Watches", price: "$199" },
  { name: "Apple iMac", color: "Silver", category: "PC", price: "$2999" },
  { name: "Apple AirPods", color: "White", category: "Accessories", price: "$399" },
  { name: "iPad Pro", color: "Gold", category: "Tablet", price: "$699" },
  { name: "Magic Keyboard", color: "Black", category: "Accessories", price: "$99" },
  { name: "Smart Folio iPad Air", color: "Blue", category: "Accessories", price: "$79" },
  { name: "AirTag", color: "Silver", category: "Accessories", price: "$29" },
];
// 1000 rows, so there are pages to move through.
const products = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  ...catalogue[index % catalogue.length]!,
}));
const perPage = 10;

export default function TablePagination() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const first = (page - 1) * perPage;
  const rows = products.slice(first, first + perPage);
  const all = rows.every((product) => selected.has(product.id));
  const some = !all && rows.some((product) => selected.has(product.id));

  const toggle = (id: number) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <Table
      hoverable
      footer={
        <>
          <span aria-live="polite" className="text-body text-sm">
            Showing{" "}
            <span className="text-heading font-semibold">
              {first + 1}-{first + rows.length}
            </span>{" "}
            of <span className="text-heading font-semibold">{products.length}</span>
          </span>
          <Pagination
            aria-label="Table navigation"
            size="sm"
            currentPage={page}
            totalPages={products.length / perPage}
            siblingCount={1}
            showEllipsis
            onPageChange={setPage}
          />
        </>
      }
    >
      <TableCaption visuallyHidden>Products</TableCaption>
      <TableHead>
        <TableHeadCell className="p-4">
          <Checkbox
            aria-label="Select all products on this page"
            checked={all}
            indeterminate={some}
            onChange={() =>
              setSelected((previous) => {
                const next = new Set(previous);
                rows.forEach((product) => (all ? next.delete(product.id) : next.add(product.id)));
                return next;
              })
            }
            className="flex"
          />
        </TableHeadCell>
        <TableHeadCell>Product name</TableHeadCell>
        <TableHeadCell>Color</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody>
        {rows.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="w-4 p-4">
              <Checkbox
                className="flex"
                aria-label={`Select ${product.name}`}
                checked={selected.has(product.id)}
                onChange={() => toggle(product.id)}
              />
            </TableCell>
            <TableHeadCell scope="row">{product.name}</TableHeadCell>
            <TableCell>{product.color}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
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
