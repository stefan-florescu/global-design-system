"use client";

import { useId, useState } from "react";

import { Funnel } from "@stefan-florescu/icons";
import {
  Checkbox,
  Dropdown,
  DropdownMenu,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownTrigger,
  Label,
  SearchInput,
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
const categories = [...new Set(products.map((product) => product.category))];

export default function TableFilter() {
  const id = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const rows = products.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      product.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const all = rows.length > 0 && rows.every((product) => selected.has(product.name));
  const some = !all && rows.some((product) => selected.has(product.name));

  const toggle = (name: string) =>
    setSelected((previous) => {
      const next = new Set(previous);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  return (
    <Table
      hoverable
      toolbar={
        <>
          <form role="search" onSubmit={(event) => event.preventDefault()}>
            <Label htmlFor={`${id}-search`} className="sr-only">
              Search products
            </Label>
            <SearchInput
              id={`${id}-search`}
              size="sm"
              placeholder="Search"
              className="max-w-96"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <Dropdown>
            <DropdownTrigger variant="secondary" size="sm">
              <Funnel aria-hidden className="-ms-0.5" />
              Filter by
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownRadioGroup
                aria-label="Category"
                value={category}
                onValueChange={setCategory}
              >
                <DropdownRadioItem value="all">All categories</DropdownRadioItem>
                {categories.map((name) => (
                  <DropdownRadioItem key={name} value={name}>
                    {name}
                  </DropdownRadioItem>
                ))}
              </DropdownRadioGroup>
            </DropdownMenu>
          </Dropdown>
          <p role="status" className="sr-only">
            {rows.length} {rows.length === 1 ? "product" : "products"}
          </p>
        </>
      }
    >
      <TableCaption visuallyHidden>Products</TableCaption>
      <TableHead>
        <TableHeadCell className="p-4">
          <Checkbox
            aria-label="Select all products"
            checked={all}
            indeterminate={some}
            onChange={() =>
              setSelected((previous) => {
                const next = new Set(previous);
                rows.forEach((product) =>
                  all ? next.delete(product.name) : next.add(product.name),
                );
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
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No products match these filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
