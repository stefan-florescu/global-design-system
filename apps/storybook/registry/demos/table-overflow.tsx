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
  {
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    accessories: "Yes",
    available: "Yes",
    price: "$2999",
    weight: "3.0 lb.",
  },
  {
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    accessories: "No",
    available: "Yes",
    price: "$1999",
    weight: "1.0 lb.",
  },
  {
    name: "Magic Mouse 2",
    color: "Black",
    category: "Accessories",
    accessories: "Yes",
    available: "No",
    price: "$99",
    weight: "0.2 lb.",
  },
  {
    name: "Apple Watch",
    color: "Black",
    category: "Watches",
    accessories: "Yes",
    available: "No",
    price: "$199",
    weight: "0.12 lb.",
  },
  {
    name: "Apple iMac",
    color: "Silver",
    category: "PC",
    accessories: "Yes",
    available: "Yes",
    price: "$2999",
    weight: "7.0 lb.",
  },
  {
    name: "Apple AirPods",
    color: "White",
    category: "Accessories",
    accessories: "No",
    available: "Yes",
    price: "$399",
    weight: "38 g",
  },
  {
    name: "iPad Pro",
    color: "Gold",
    category: "Tablet",
    accessories: "No",
    available: "Yes",
    price: "$699",
    weight: "1.3 lb.",
  },
  {
    name: "Magic Keyboard",
    color: "Black",
    category: "Accessories",
    accessories: "Yes",
    available: "Yes",
    price: "$99",
    weight: "453 g",
  },
  {
    name: "Apple TV 4K",
    color: "Black",
    category: "TV",
    accessories: "Yes",
    available: "No",
    price: "$179",
    weight: "1.78 lb.",
  },
  {
    name: "AirTag",
    color: "Silver",
    category: "Accessories",
    accessories: "Yes",
    available: "No",
    price: "$29",
    weight: "53 g",
  },
];

export default function TableOverflow() {
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
      {/* The caption also names the scroller, which takes focus when the table is too wide. */}
      <TableCaption visuallyHidden>Products</TableCaption>
      <TableHead>
        <TableHeadCell className="p-4">
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
        <TableHeadCell>Accessories</TableHeadCell>
        <TableHeadCell>Available</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>Weight</TableHeadCell>
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
            <TableCell>{product.accessories}</TableCell>
            <TableCell>{product.available}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.weight}</TableCell>
            <TableCell className="whitespace-nowrap">
              <a href="#edit" className="text-fg-brand font-medium hover:underline">
                Edit<span className="sr-only"> {product.name}</span>
              </a>
              <a href="#remove" className="text-fg-danger ms-3 font-medium hover:underline">
                Remove<span className="sr-only"> {product.name}</span>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
