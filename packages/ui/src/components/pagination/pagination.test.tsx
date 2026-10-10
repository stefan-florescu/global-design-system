import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getPaginationItems, Pagination } from "./pagination";

describe("Pagination", () => {
  it("is a navigation landmark with a list of pages", () => {
    render(<Pagination currentPage={3} totalPages={10} />);
    const nav = screen.getByRole("navigation", { name: "Pagination" });
    const list = within(nav).getByRole("list");
    // Previous, five pages, next.
    expect(within(list).getAllByRole("listitem")).toHaveLength(7);
  });

  it("marks the current page with aria-current", () => {
    render(<Pagination currentPage={3} totalPages={10} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Page 2" })).not.toHaveAttribute("aria-current");
  });

  it("calls onPageChange with the chosen page, but not for the current one", async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 4" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4, expect.anything());
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4, expect.anything());
    await userEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(onPageChange).toHaveBeenLastCalledWith(2, expect.anything());
    onPageChange.mockClear();
    await userEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disables previous on the first page and next on the last", () => {
    const { rerender } = render(<Pagination currentPage={1} totalPages={5} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    rerender(<Pagination currentPage={5} totalPages={5} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("names icon-only previous and next with visually hidden text", () => {
    render(<Pagination currentPage={2} totalPages={5} showIcons />);
    const previous = screen.getByRole("button", { name: "Previous" });
    expect(previous.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(within(previous).getByText("Previous")).toHaveClass("sr-only");
  });

  it("renders links with getPageHref, and disabled ends as links without href", () => {
    render(<Pagination currentPage={1} totalPages={5} getPageHref={(page) => `?page=${page}`} />);
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute("href", "?page=2");
    expect(screen.getByRole("link", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
    const previous = screen.getByRole("link", { name: "Previous" });
    expect(previous).toHaveAttribute("aria-disabled", "true");
    expect(previous).not.toHaveAttribute("href");
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute("href", "?page=2");
  });

  it("summarises the rows in the table layout", () => {
    render(
      <Pagination layout="table" currentPage={2} itemsPerPage={10} totalItems={95} showIcons />,
    );
    expect(screen.getByRole("navigation").textContent).toContain("Showing 11 to 20 of 95 Entries");
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: /Page/ })).not.toBeInTheDocument();
  });

  it("shows the position between the buttons in the single layout", () => {
    render(<Pagination layout="single" currentPage={1} totalPages={99} />);
    expect(screen.getByText("1 of 99")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  });

  it("accepts its own label and extra controls", () => {
    render(
      <Pagination aria-label="Search results" currentPage={1} totalPages={3}>
        <span>Extra</span>
      </Pagination>,
    );
    expect(
      within(screen.getByRole("navigation", { name: "Search results" })).getByText("Extra"),
    ).toBeInTheDocument();
  });
});

describe("Pagination tooltips", () => {
  it("names icon-only previous and next with Flowbite's tooltips when showTooltips is set", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        layout="single"
        currentPage={2}
        totalPages={99}
        onPageChange={onPageChange}
        showTooltips
      />,
    );
    const previous = screen.getByRole("button", { name: "Previous" });
    const tooltip = document.getElementById(previous.getAttribute("aria-labelledby")!);
    expect(tooltip).toHaveAttribute("role", "tooltip");
    expect(tooltip).toHaveTextContent("Previous");
    expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-labelledby");

    fireEvent.click(previous);
    expect(onPageChange).toHaveBeenCalledWith(1, expect.anything());
  });

  it("adds no tooltips to labelled controls or by default", () => {
    render(<Pagination currentPage={2} totalPages={5} showTooltips />);
    expect(screen.getByRole("button", { name: "Previous" })).not.toHaveAttribute("aria-labelledby");
    render(<Pagination layout="single" currentPage={2} totalPages={5} aria-label="Other" />);
    expect(document.querySelectorAll("[role=tooltip]")).toHaveLength(0);
  });
});

describe("getPaginationItems", () => {
  it("keeps a window of five pages, shifted at the ends", () => {
    expect(getPaginationItems(1, 10)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationItems(6, 10)).toEqual([4, 5, 6, 7, 8]);
    expect(getPaginationItems(10, 10)).toEqual([6, 7, 8, 9, 10]);
    expect(getPaginationItems(2, 3)).toEqual([1, 2, 3]);
  });

  it("adds the first and last page with ellipses", () => {
    expect(getPaginationItems(1, 99, 1, true)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 99]);
    expect(getPaginationItems(50, 99, 1, true)).toEqual([
      1,
      "start-ellipsis",
      49,
      50,
      51,
      "end-ellipsis",
      99,
    ]);
    expect(getPaginationItems(99, 99, 1, true)).toEqual([1, "start-ellipsis", 95, 96, 97, 98, 99]);
    expect(getPaginationItems(3, 7, 1, true)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
