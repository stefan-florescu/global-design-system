import { act, render, screen, within } from "@testing-library/react";
import { createRef } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeadCell,
  TableRow,
} from "./table";

function Products(props: Parameters<typeof Table>[0]) {
  return (
    <Table {...props}>
      <TableCaption description="Laptops and accessories.">Our products</TableCaption>
      <TableHead>
        <TableHeadCell>Product name</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableHeadCell scope="row">Magic Mouse 2</TableHeadCell>
          <TableCell>$99</TableCell>
        </TableRow>
        <TableRow>
          <TableHeadCell scope="row">Surface Pro</TableHeadCell>
          <TableCell>$1999</TableCell>
        </TableRow>
      </TableBody>
      <TableFoot>
        <TableHeadCell scope="row">Total</TableHeadCell>
        <TableCell>$2098</TableCell>
      </TableFoot>
    </Table>
  );
}

describe("Table", () => {
  it("renders a native table named by its caption", () => {
    render(<Products />);
    const table = screen.getByRole("table", { name: /Our products/ });
    expect(table.tagName).toBe("TABLE");
    expect(within(table).getByText("Laptops and accessories.")).toHaveClass("text-body");
  });

  it("gives column and row headers their scope", () => {
    render(<Products />);
    const columns = screen.getAllByRole("columnheader");
    expect(columns.map((cell) => cell.textContent)).toEqual(["Product name", "Price"]);
    columns.forEach((cell) => expect(cell).toHaveAttribute("scope", "col"));
    expect(screen.getByRole("rowheader", { name: "Magic Mouse 2" })).toHaveAttribute(
      "scope",
      "row",
    );
    expect(screen.getByRole("cell", { name: "$99" })).toHaveClass("px-6", "py-4");
  });

  it("wraps head and foot cells in a row, but keeps rows that are passed in", () => {
    const { container } = render(
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell colSpan={2}>Device</TableHeadCell>
          </tr>
          <tr>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
          </tr>
        </TableHead>
        <TableFoot>
          <TableHeadCell scope="row">Total</TableHeadCell>
          <TableCell>$1</TableCell>
        </TableFoot>
      </Table>,
    );
    expect(container.querySelectorAll("thead > tr")).toHaveLength(2);
    expect(container.querySelectorAll("tfoot > tr")).toHaveLength(1);
    expect(container.querySelector("thead tr tr")).toBeNull();
  });

  it("draws Flowbite's bordered card by default", () => {
    render(<Products />);
    const card = screen.getByRole("table").closest("[data-slot='table-container']");
    expect(card).toHaveClass(
      "rounded-base",
      "border",
      "border-default",
      "bg-neutral-primary-soft",
      "shadow-xs",
    );
    expect(screen.getByRole("table")).toHaveClass("w-full", "text-sm", "text-body");
  });

  it("drops the card and the row lines without a border", () => {
    render(<Products bordered={false} />);
    const table = screen.getByRole("table");
    const card = table.closest("[data-slot='table-container']");
    expect(card).not.toHaveClass("border", "shadow-xs");
    expect(table).toHaveClass("[--table-divider-width:0px]");
    expect(table).toHaveAttribute("data-head", "plain");
  });

  it("drops only the shadow with shadow={false}", () => {
    render(<Products shadow={false} />);
    const card = screen.getByRole("table").closest("[data-slot='table-container']");
    expect(card).toHaveClass("border");
    expect(card).not.toHaveClass("shadow-xs");
  });

  it("exposes striping, hover and the head style to its parts", () => {
    const { rerender } = render(<Products striped hoverable />);
    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("data-striped", "rows");
    expect(table).toHaveAttribute("data-hoverable");
    expect(screen.getAllByRole("row")[1]).toHaveClass(
      "group-data-[striped=rows]/table:even:bg-(--table-row-alt)",
      "group-data-hoverable/table:hover:bg-(--table-row-hover)",
    );

    rerender(<Products striped="columns" />);
    expect(table).toHaveAttribute("data-striped", "columns");
    expect(table).not.toHaveAttribute("data-hoverable");

    rerender(<Products bordered={false} rounded />);
    expect(table).toHaveAttribute("data-head", "bar");
  });

  it("uses Flowbite's brand colours with variant='brand'", () => {
    render(<Products variant="brand" />);
    const table = screen.getByRole("table");
    expect(table).toHaveClass(
      "text-fg-brand-subtle",
      "dark:text-brand-foreground",
      "[--table-head-bg:var(--sds-color-brand-strong)]",
      "[--table-row-bg:var(--sds-color-brand)]",
    );
  });

  it("renders a visually hidden caption", () => {
    render(
      <Table>
        <TableCaption visuallyHidden>Keyboard shortcuts</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Esc</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("table", { name: "Keyboard shortcuts" })).toBeInTheDocument();
    expect(screen.getByText("Keyboard shortcuts").closest("caption")).toHaveClass("sr-only");
  });

  it("shows a toolbar above and a footer under the table, inside the card", () => {
    render(
      <Products
        toolbar={<input aria-label="Search" />}
        footer={<nav aria-label="Table navigation" />}
      />,
    );
    const card = screen.getByRole("table").closest("[data-slot='table-container']")!;
    expect(within(card as HTMLElement).getByRole("textbox", { name: "Search" })).toBeVisible();
    expect(within(card as HTMLElement).getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveAttribute("data-toolbar");
  });

  it("is not focusable while the table fits", () => {
    render(<Products />);
    const area = screen.getByRole("table").parentElement!;
    expect(area).toHaveAttribute("data-slot", "table-scroll-area");
    expect(area).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("becomes a focusable region named by the caption when the table overflows", () => {
    const scrollWidth = vi
      .spyOn(HTMLElement.prototype, "scrollWidth", "get")
      .mockImplementation(function (this: HTMLElement) {
        return this.dataset.slot === "table-scroll-area" ? 900 : 0;
      });
    const clientWidth = vi
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockImplementation(() => 400);

    render(<Products />);
    const region = screen.getByRole("region", { name: "Our products" });
    expect(region).toHaveAttribute("tabindex", "0");
    act(() => region.focus());
    expect(region).toHaveFocus();

    scrollWidth.mockRestore();
    clientWidth.mockRestore();
  });

  it("names an overflowing region by the table's aria-label when there is no caption", () => {
    const scrollWidth = vi
      .spyOn(HTMLElement.prototype, "scrollWidth", "get")
      .mockImplementation(() => 900);
    const clientWidth = vi
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockImplementation(() => 400);

    render(
      <Table aria-label="Orders">
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("region", { name: "Orders" })).toHaveAttribute("tabindex", "0");

    scrollWidth.mockRestore();
    clientWidth.mockRestore();
  });

  it("forwards ref and attributes to the table, and merges class names", () => {
    const ref = createRef<HTMLTableElement>();
    render(
      <Table ref={ref} id="orders" className="text-xs" containerClassName="max-w-md">
        <TableBody>
          <TableRow className="bg-neutral-secondary-medium">
            <TableCell className="p-4">1</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const table = screen.getByRole("table");
    expect(ref.current).toBe(table);
    expect(table).toHaveAttribute("id", "orders");
    expect(table).toHaveClass("text-xs");
    expect(table).not.toHaveClass("text-sm");
    expect(table.closest("[data-slot='table-container']")).toHaveClass("max-w-md");
    const row = screen.getByRole("row");
    expect(row).toHaveClass("bg-neutral-secondary-medium");
    expect(row).not.toHaveClass("bg-(--table-row-bg)");
    expect(screen.getByRole("cell")).toHaveClass("p-4");
    expect(screen.getByRole("cell")).not.toHaveClass("px-6");
  });
});
