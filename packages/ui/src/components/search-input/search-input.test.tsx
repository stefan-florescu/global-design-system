import { render, screen } from "@testing-library/react";

import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("is a search box with a hidden icon", () => {
    const { container } = render(<SearchInput aria-label="Search docs" />);
    expect(screen.getByRole("searchbox", { name: "Search docs" })).toBeInTheDocument();
    expect(container.querySelector("svg")?.closest("[aria-hidden]")).not.toBeNull();
  });

  it("adds a submit button", () => {
    render(
      <form role="search">
        <SearchInput aria-label="Search docs" submitLabel="Search" />
      </form>,
    );
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("searchbox")).toHaveClass("pe-24");
  });
});
