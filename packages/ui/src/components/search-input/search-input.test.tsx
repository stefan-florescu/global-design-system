import { render, screen } from "@testing-library/react";

import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("is a search box with a hidden icon", () => {
    const { container } = render(<SearchInput aria-label="Search docs" />);
    expect(screen.getByRole("searchbox", { name: "Search docs" })).toBeInTheDocument();
    expect(container.querySelector("svg")?.closest("[aria-hidden]")).not.toBeNull();
  });

  it("takes a custom icon", () => {
    render(<SearchInput aria-label="Branch" icon={<svg data-testid="branch" />} />);
    expect(screen.getByTestId("branch").closest("[aria-hidden]")).not.toBeNull();
  });

  it("adds a submit button inside the field", () => {
    render(
      <form role="search">
        <SearchInput aria-label="Search docs" submitLabel="Search" />
      </form>,
    );
    expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "submit");
    expect(screen.getByRole("button", { name: "Search" })).toHaveClass("absolute", "end-1.5");
    expect(screen.getByRole("searchbox")).toHaveClass("py-3", "pe-24");
  });

  it("disables the submit button with the field", () => {
    render(<SearchInput aria-label="Search docs" submitLabel="Search" disabled />);
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });
});
