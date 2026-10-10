"use client";

import { useState } from "react";

import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

const products = [
  { name: 'Apple MacBook Pro 17"', color: "Silver", category: "Laptop", price: "$2999" },
  { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
  { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
  { name: "Apple Watch", color: "Silver", category: "Accessories", price: "$179" },
  { name: "iPad", color: "Gold", category: "Tablet", price: "$699" },
  { name: 'Apple iMac 27"', color: "Silver", category: "PC Desktop", price: "$3999" },
];

export default function TableCheckbox() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const all = selected.size === products.length;
  const some = selected.size > 0 && !all;

  const toggle = (name: string) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  return (
    <Table hoverable>
      <TableCaption visuallyHidden>Products</TableCaption>
      <TableHead>
        <TableHeadCell className="p-4">
          {/* Checked when every row is, mixed (indeterminate) when only some are. */}
          <Checkbox
            aria-label="Select all products"
            checked={all}
            indeterminate={some}
            onChange={() => setSelected(all ? new Set() : new Set(products.map((p) => p.name)))}
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
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell className="w-4 p-4">
              <Checkbox
                className="flex"
                aria-label={`Select ${product.name}`}
                checked={selected.has(product.name)}
                onChange={() => toggle(product.name)}
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
