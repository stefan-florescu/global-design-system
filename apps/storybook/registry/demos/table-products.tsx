"use client";

import { useState } from "react";

import {
  NumberInput,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

const initialProducts = [
  { name: "Apple Watch", price: "$599", image: "/images/landscape-1.svg" },
  { name: 'iMac 27"', price: "$2499", image: "/images/landscape-2.svg" },
  { name: "IPhone 12", price: "$999", image: "/images/landscape-3.svg" },
];

export default function TableProducts() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <Table hoverable>
      <TableCaption visuallyHidden>Shopping cart</TableCaption>
      <TableHead>
        <TableHeadCell className="px-16">
          <span className="sr-only">Image</span>
        </TableHeadCell>
        <TableHeadCell>Product</TableHeadCell>
        <TableHeadCell>Qty</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell className="p-4">
              {/* Decorative: the product name is in the next cell. */}
              <img src={product.image} alt="" className="max-h-full w-16 max-w-full md:w-24" />
            </TableCell>
            <TableHeadCell scope="row" className="font-semibold">
              {product.name}
            </TableHeadCell>
            <TableCell>
              <NumberInput
                variant="counter"
                aria-label={`Quantity, ${product.name}`}
                defaultValue={12}
                min={0}
              />
            </TableCell>
            <TableCell className="text-heading font-semibold">{product.price}</TableCell>
            <TableCell>
              <button
                type="button"
                className="text-fg-danger cursor-pointer font-medium hover:underline"
                onClick={() =>
                  setProducts((previous) => previous.filter((item) => item !== product))
                }
              >
                Remove<span className="sr-only"> {product.name}</span>
              </button>
            </TableCell>
          </TableRow>
        ))}
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Your cart is empty.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
