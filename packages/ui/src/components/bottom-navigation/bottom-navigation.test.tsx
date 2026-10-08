import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BottomNavigation, BottomNavigationItem } from "./bottom-navigation";

describe("BottomNavigation", () => {
  it("is a navigation landmark with a list of items", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem href="/">Home</BottomNavigationItem>
        <BottomNavigationItem href="/wallet">Wallet</BottomNavigationItem>
      </BottomNavigation>,
    );
    const nav = screen.getByRole("navigation", { name: "Bottom navigation" });
    expect(within(nav).getAllByRole("listitem")).toHaveLength(2);
    expect(within(nav).getByRole("link", { name: "Wallet" })).toHaveAttribute("href", "/wallet");
  });

  it("marks the current page", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem href="/" active>
          Home
        </BottomNavigationItem>
        <BottomNavigationItem href="/settings">Settings</BottomNavigationItem>
      </BottomNavigation>,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Settings" })).not.toHaveAttribute("aria-current");
  });

  it("renders buttons without href", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <BottomNavigation aria-label="Tools">
        <BottomNavigationItem onClick={onClick}>Filter</BottomNavigationItem>
      </BottomNavigation>,
    );
    expect(screen.getByRole("navigation", { name: "Tools" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("keeps a hidden label as the accessible name", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem href="/profile" hideLabel icon={<svg aria-hidden />}>
          Profile
        </BottomNavigationItem>
      </BottomNavigation>,
    );
    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByText("Profile")).toHaveClass("sr-only");
  });

  it("sits on the fixed layer", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem href="/">Home</BottomNavigationItem>
      </BottomNavigation>,
    );
    expect(screen.getByRole("navigation")).toHaveClass("fixed", "z-fixed");
  });

  it("applies bordered and floating styles", () => {
    render(
      <BottomNavigation floating bordered>
        <BottomNavigationItem href="/">Home</BottomNavigationItem>
      </BottomNavigation>,
    );
    expect(screen.getByRole("navigation")).toHaveClass("rounded-full", "inset-x-4");
    expect(screen.getByRole("list")).toHaveClass("divide-x");
  });
});
