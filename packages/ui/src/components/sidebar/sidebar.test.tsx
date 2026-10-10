import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";

import { AlertTitle } from "../alert";

import {
  Sidebar,
  SidebarCollapse,
  SidebarCTA,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
  SidebarProvider,
  SidebarToggle,
  type SidebarProps,
} from "./sidebar";

// jsdom has no <dialog> methods: a minimal stand-in that tracks `open`.
beforeAll(() => {
  const proto = HTMLDialogElement.prototype;
  proto.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  proto.show = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  proto.close = function (this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

function Example(props: SidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarLogo href="/" name="Stefan DS" />
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/dashboard" icon={<svg aria-hidden />} active>
            Dashboard
          </SidebarItem>
          <SidebarCollapse label="E-commerce">
            <SidebarItem href="/products">Products</SidebarItem>
            <SidebarItem href="/billing">Billing</SidebarItem>
          </SidebarCollapse>
          <SidebarItem href="/kanban" label="Pro">
            Kanban
          </SidebarItem>
          <SidebarItem href="/inbox" count={2}>
            Inbox
          </SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="/docs">Documentation</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

describe("Sidebar", () => {
  it("renders a named aside with a named navigation landmark", () => {
    render(<Example />);
    const aside = screen.getByRole("complementary", { name: "Sidebar" });
    expect(aside.tagName).toBe("ASIDE");
    expect(within(aside).getByRole("navigation", { name: "Sidebar" })).toBeInTheDocument();
    expect(within(aside).getByRole("link", { name: "Stefan DS" })).toHaveAttribute("href", "/");
  });

  it("takes custom accessible names", () => {
    render(
      <Sidebar label="App">
        <SidebarItems aria-label="Main">
          <SidebarItemGroup>
            <SidebarItem href="/">Home</SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>,
    );
    expect(screen.getByRole("complementary", { name: "App" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("marks the current page and renders labels and counts as badges", () => {
    render(<Example />);
    const aside = screen.getByRole("complementary");
    expect(within(aside).getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(aside).getByRole("link", { name: "Kanban Pro" })).not.toHaveAttribute(
      "aria-current",
    );
    const inbox = within(aside).getByRole("link", { name: "Inbox 2" });
    expect(inbox.querySelector('[data-slot="sidebar-item-count"]')).toHaveTextContent("2");
  });

  it("renders a button item without href", async () => {
    const onClick = vi.fn();
    render(
      <Sidebar breakpoint="none">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem onClick={onClick}>Sign out</SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>,
    );
    const button = screen.getByRole("button", { name: "Sign out" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a router link with asChild", () => {
    function RouterLink({ children, ...props }: ComponentProps<"a">) {
      return (
        <a data-router="" {...props}>
          {children}
        </a>
      );
    }
    render(
      <Sidebar breakpoint="none">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem asChild icon={<svg aria-hidden />} active label="New">
              <RouterLink href="/users">Users</RouterLink>
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>,
    );
    const link = screen.getByRole("link", { name: "Users New" });
    expect(link).toHaveAttribute("data-router");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("data-slot", "sidebar-item");
  });

  it("shows and hides a multi-level group as a disclosure", async () => {
    render(<Example breakpoint="none" />);
    const button = screen.getByRole("button", { name: "E-commerce" });
    const list = document.getElementById(button.getAttribute("aria-controls") ?? "");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(list).not.toBeVisible();

    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(list).toBeVisible();
    expect(within(list!).getByRole("link", { name: "Products" })).toHaveClass("ps-10");

    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a collapse on first render with defaultOpen", () => {
    render(
      <Sidebar breakpoint="none">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarCollapse label="Shop" defaultOpen>
              <SidebarItem href="/a">A</SidebarItem>
            </SidebarCollapse>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>,
    );
    expect(screen.getByRole("button", { name: "Shop" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "A" })).toBeVisible();
  });

  it("renders the hamburger toggle before the aside and opens the drawer", async () => {
    render(<Example />);
    const toggle = screen.getByRole("button", { name: "Open sidebar" });
    expect(toggle).toHaveClass("sm:hidden");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle.compareDocumentPosition(screen.getByRole("complementary"))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );

    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).not.toHaveAttribute("open");
    // The drawer copy of the content is only rendered once the drawer opens.
    expect(within(dialog).queryByRole("navigation", { hidden: true })).toBeNull();

    await userEvent.click(toggle);
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAccessibleName("Sidebar");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", dialog.id);

    // Following a link closes the drawer.
    await userEvent.click(within(dialog).getByRole("link", { name: "Dashboard" }));
    expect(dialog).not.toHaveAttribute("open");
  });

  it("closes the drawer from its close button and returns focus to the toggle", async () => {
    render(<Example />);
    const toggle = screen.getByRole("button", { name: "Open sidebar" });
    await userEvent.click(toggle);
    const dialog = screen.getByRole("dialog");
    await userEvent.click(within(dialog).getByRole("button", { name: "Close menu" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(toggle).toHaveFocus();
  });

  it("keeps the drawer open when a collapse is toggled inside it", async () => {
    render(<Example defaultOpen />);
    const dialog = screen.getByRole("dialog", { hidden: true });
    await userEvent.click(within(dialog).getByRole("button", { name: "E-commerce" }));
    expect(dialog).toHaveAttribute("open");
  });

  it("uses the breakpoint for the aside and the toggle", () => {
    render(<Example breakpoint="lg" />);
    expect(screen.getByRole("complementary")).toHaveClass("max-lg:hidden");
    expect(screen.getByRole("button", { name: "Open sidebar" })).toHaveClass("lg:hidden");
  });

  it("has no toggle or drawer with breakpoint none", () => {
    render(<Example breakpoint="none" />);
    expect(screen.queryByRole("button", { name: "Open sidebar" })).toBeNull();
    expect(screen.queryByRole("dialog", { hidden: true })).toBeNull();
    expect(screen.getByRole("complementary")).not.toHaveClass("max-sm:hidden");
  });

  it("shares the drawer with a toggle placed elsewhere through SidebarProvider", async () => {
    const onOpenChange = vi.fn();
    render(
      <SidebarProvider onOpenChange={onOpenChange}>
        <header>
          <SidebarToggle label="Menu" />
        </header>
        <Example />
      </SidebarProvider>,
    );
    // Only the provider's toggle: the sidebar doesn't add its own.
    expect(screen.getAllByRole("button", { name: /sidebar|menu/i })).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute("open");
  });

  it("applies the position", () => {
    render(<Example position="static" breakpoint="none" className="w-80" />);
    const aside = screen.getByRole("complementary");
    expect(aside).not.toHaveClass("fixed");
    expect(aside).toHaveClass("h-full", "w-80");
  });

  it("separates item groups", () => {
    render(<Example breakpoint="none" />);
    const lists = screen.getAllByRole("list");
    expect(lists[lists.length - 1]).toHaveClass("not-first:border-t");
  });

  it("renders a CTA that is not a live region and can be dismissed", async () => {
    render(
      <SidebarCTA dismissible dismissLabel="Close">
        <AlertTitle>Beta version</AlertTitle>
      </SidebarCTA>,
    );
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByText("Beta version")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Beta version")).toBeNull();
  });
});
