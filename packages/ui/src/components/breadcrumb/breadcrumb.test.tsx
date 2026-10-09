import { render, screen, within } from "@testing-library/react";

import { Breadcrumb, BreadcrumbItem } from "./breadcrumb";

function Trail(props: Parameters<typeof Breadcrumb>[0]) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem>Design system</BreadcrumbItem>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("is a navigation landmark named Breadcrumb with an ordered list", () => {
    render(<Trail />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    const list = within(nav).getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("links every level but the current page", () => {
    render(<Trail />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.queryByRole("link", { name: "Design system" })).not.toBeInTheDocument();
    expect(screen.getByText("Design system")).toHaveAttribute("aria-current", "page");
  });

  it("hides separators from assistive technology", () => {
    render(<Trail />);
    const separators = screen.getAllByRole("listitem").map((item) => item.querySelector("svg"));
    for (const separator of separators) expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the solid variant", () => {
    render(<Trail variant="solid" />);
    expect(screen.getByRole("navigation")).toHaveClass("bg-neutral-secondary-medium", "border");
  });
});
