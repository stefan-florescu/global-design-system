import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Dropdown, DropdownContent, DropdownItem } from "../dropdown";

import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarCollapse,
  NavbarDropdownTrigger,
  NavbarLink,
  NavbarToggle,
  type NavbarProps,
} from ".";

function Example(props: Omit<NavbarProps, "children">) {
  return (
    <Navbar {...props}>
      <NavbarBrand href="/" name="Stefan" />
      <NavbarActions>
        <button type="button">Get started</button>
        <NavbarToggle />
      </NavbarActions>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <li>
          <Dropdown>
            <NavbarDropdownTrigger>Services</NavbarDropdownTrigger>
            <DropdownContent>
              <DropdownItem href="/design">Design</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </li>
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/legacy" disabled>
          Legacy
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

const toggle = () => screen.getByRole("button", { name: "Open main menu" });
const collapse = () => document.querySelector<HTMLElement>("[data-slot=navbar-collapse]")!;

describe("Navbar", () => {
  it("is a navigation landmark named Main by default", () => {
    render(<Example />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("takes its own accessible name", () => {
    const { rerender } = render(<Example aria-label="Primary" />);
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    rerender(
      <>
        <h2 id="title">Site</h2>
        <Example aria-labelledby="title" />
      </>,
    );
    const nav = screen.getByRole("navigation", { name: "Site" });
    expect(nav).not.toHaveAttribute("aria-label");
  });

  it("links the brand with the brand name as its name", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "Stefan" })).toHaveAttribute("href", "/");
  });

  it("renders the links as a list and marks the current page", () => {
    render(<Example />);
    const list = screen.getByRole("list");
    expect(list.querySelectorAll(":scope > li")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
  });

  it("renders a disabled link without href, announced as disabled", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const legacy = screen.getByText("Legacy");
    expect(legacy).not.toHaveAttribute("href");
    expect(legacy).toHaveAttribute("aria-disabled", "true");
    await user.click(legacy);
  });

  it("the hamburger is a disclosure button for the collapsed links", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);
    expect(toggle()).toHaveAttribute("aria-expanded", "false");
    expect(toggle()).toHaveAttribute("aria-controls", collapse().id);
    expect(collapse()).toHaveClass("hidden");

    await user.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "true");
    expect(collapse()).not.toHaveClass("hidden");
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    await user.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "false");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("opens with Enter and Space from the keyboard", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    await user.tab();
    await user.tab();
    expect(toggle()).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(toggle()).toHaveAttribute("aria-expanded", "true");
    await user.keyboard(" ");
    expect(toggle()).toHaveAttribute("aria-expanded", "false");
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Example open onOpenChange={onOpenChange} />);
    expect(toggle()).toHaveAttribute("aria-expanded", "true");
    await user.click(toggle());
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(toggle()).toHaveAttribute("aria-expanded", "true");
  });

  it("Escape in the open menu hides it and returns focus to the hamburger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    // jsdom has no layout; pretend the hamburger is on screen.
    vi.spyOn(toggle(), "getClientRects").mockReturnValue([{}] as unknown as DOMRectList);
    await user.click(toggle());
    screen.getByRole("link", { name: "About" }).focus();
    await user.keyboard("{Escape}");
    expect(toggle()).toHaveAttribute("aria-expanded", "false");
    expect(toggle()).toHaveFocus();
  });

  it("leaves Escape to an open dropdown inside the menu", async () => {
    const user = userEvent.setup();
    render(<Example defaultOpen />);
    vi.spyOn(toggle(), "getClientRects").mockReturnValue([{}] as unknown as DOMRectList);
    const services = screen.getByRole("button", { name: "Services" });
    await user.click(services);
    expect(services).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(services).toHaveAttribute("aria-expanded", "false"));
    expect(services).toHaveFocus();
    expect(toggle()).toHaveAttribute("aria-expanded", "true");
  });

  it("does not move focus to a hidden hamburger on Escape", async () => {
    const user = userEvent.setup();
    render(<Example defaultOpen />);
    screen.getByRole("link", { name: "About" }).focus();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("link", { name: "About" })).toHaveFocus();
  });

  it("styles a dropdown trigger as a navbar item that opens a disclosure of links", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const services = screen.getByRole("button", { name: "Services" });
    expect(services).not.toHaveAttribute("aria-haspopup");
    await user.click(services);
    expect(services).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Design" })).toBeInTheDocument();
  });

  it("takes an icon and label for a second toggle", () => {
    render(
      <Navbar>
        <NavbarToggle label="Search" icon={<svg data-testid="icon" />} />
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/">Home</NavbarLink>
        </NavbarCollapse>
      </Navbar>,
    );
    const search = screen.getByRole("button", { name: "Search" });
    expect(search).toHaveAttribute("aria-controls", toggle().getAttribute("aria-controls"));
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("shows the links in a row from md by default, or from lg with expand='lg'", () => {
    const { rerender } = render(<Example />);
    expect(toggle()).toHaveClass("md:hidden");
    expect(collapse()).toHaveClass("md:flex");
    expect(screen.getByRole("link", { name: "About" })).toHaveClass("md:p-0");

    rerender(<Example expand="lg" />);
    expect(toggle()).toHaveClass("lg:hidden");
    expect(toggle()).not.toHaveClass("md:hidden");
    expect(collapse()).toHaveClass("lg:order-1", "lg:flex", "lg:w-auto");
    expect(collapse()).not.toHaveClass("md:flex");
    expect(screen.getByRole("list")).toHaveClass("lg:flex-row");
    expect(screen.getByRole("link", { name: "About" })).toHaveClass("lg:p-0");
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "lg:aria-[current=page]:text-fg-brand",
    );
    expect(screen.getByRole("button", { name: "Services" })).toHaveClass("lg:w-auto");
    expect(document.querySelector("[data-slot=navbar-actions]")).toHaveClass("lg:order-2");
  });

  it("never collapses an inline list", () => {
    render(
      <Navbar size="sm">
        <NavbarCollapse variant="inline">
          <NavbarLink href="/">Home</NavbarLink>
        </NavbarCollapse>
      </Navbar>,
    );
    expect(collapse()).not.toHaveClass("hidden");
    expect(collapse()).not.toHaveAttribute("data-state");
  });

  it("renders a router link with asChild", () => {
    render(
      <Navbar>
        <NavbarCollapse>
          <NavbarLink asChild active>
            <a href="/docs">Docs</a>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>,
    );
    const docs = screen.getByRole("link", { name: "Docs" });
    expect(docs).toHaveAttribute("aria-current", "page");
    expect(docs).toHaveAttribute("data-slot", "navbar-link");
  });

  it("applies position, variant and border classes and merges className", () => {
    render(<Example position="fixed" variant="solid" border={false} className="custom" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("fixed", "z-fixed", "bg-neutral-secondary-soft", "custom");
    expect(nav).not.toHaveClass("border-b");
  });

  it("throws when a part is used outside Navbar", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<NavbarToggle />)).toThrow(/inside <Navbar>/);
  });
});
