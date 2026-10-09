import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MouseEvent } from "react";

import {
  MegaMenu,
  MegaMenuContent,
  MegaMenuGroup,
  MegaMenuLink,
  MegaMenuTrigger,
  type MegaMenuContentProps,
  type MegaMenuProps,
} from ".";

function Nav({
  content,
  onAbout,
  ...props
}: Omit<MegaMenuProps, "children"> & {
  content?: MegaMenuContentProps;
  onAbout?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <nav aria-label="Main">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <MegaMenu {...props}>
            <MegaMenuTrigger>Company</MegaMenuTrigger>
            <MegaMenuContent {...content}>
              <MegaMenuGroup>
                <MegaMenuLink href="#about" onClick={onAbout}>
                  About Us
                </MegaMenuLink>
                <MegaMenuLink href="#library">Library</MegaMenuLink>
              </MegaMenuGroup>
              <MegaMenuGroup>
                <MegaMenuLink href="#stores" description="Connect with third-party tools.">
                  Online Stores
                </MegaMenuLink>
              </MegaMenuGroup>
            </MegaMenuContent>
          </MegaMenu>
        </li>
        <li>
          <a href="#team">Team</a>
        </li>
      </ul>
    </nav>
  );
}

const trigger = () => screen.getByRole("button", { name: "Company" });
const link = (name: string) => screen.getByRole("link", { name });

describe("MegaMenu", () => {
  it("is a disclosure button that controls a panel of links, not an ARIA menu", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).not.toHaveAttribute("aria-haspopup");
    expect(screen.queryByRole("link", { name: "About Us" })).not.toBeInTheDocument();

    await user.click(trigger());
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(trigger().getAttribute("aria-controls")!);
    expect(panel).toBeVisible();
    expect(panel).toContainElement(link("About Us"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    // Focus stays on the button; the links are lists in normal Tab order.
    expect(trigger()).toHaveFocus();
    expect(screen.getAllByRole("list")).toHaveLength(3);
  });

  it("puts the panel's links right after the trigger in the Tab order", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(trigger());
    await user.tab();
    expect(link("About Us")).toHaveFocus();
    await user.tab();
    expect(link("Library")).toHaveFocus();
    await user.tab();
    expect(link("Online Stores")).toHaveFocus();
    await user.tab();
    expect(link("Team")).toHaveFocus();
    // Moving focus out of the menu closes it.
    await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  });

  it("opens and closes with Enter and Space, and Escape returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    trigger().focus();
    await user.keyboard("{Enter}");
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    await user.keyboard(" ");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{Enter}");
    await user.tab();
    await user.tab();
    expect(link("Library")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveFocus();

    await user.keyboard("{Enter}{Escape}");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveFocus();
  });

  it("closes on a click outside", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(trigger());
    await user.click(link("About Us").closest("li")!.parentElement!);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    await user.click(document.body);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when a link is followed, unless the click is prevented", async () => {
    const user = userEvent.setup();
    const onAbout = vi.fn();
    const { rerender } = render(<Nav onAbout={onAbout} />);
    await user.click(trigger());
    await user.click(link("About Us"));
    expect(onAbout).toHaveBeenCalled();
    expect(trigger()).toHaveAttribute("aria-expanded", "false");

    rerender(<Nav onAbout={(event) => event.preventDefault()} />);
    await user.click(trigger());
    await user.click(link("About Us"));
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("names a described link by its title and reads the rest as its description", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(trigger());
    expect(link("Online Stores")).toHaveAccessibleDescription("Connect with third-party tools.");
  });

  it("marks the current page", async () => {
    const user = userEvent.setup();
    render(
      <MegaMenu>
        <MegaMenuTrigger>Company</MegaMenuTrigger>
        <MegaMenuContent>
          <MegaMenuGroup>
            <MegaMenuLink href="#about" aria-current="page">
              About Us
            </MegaMenuLink>
          </MegaMenuGroup>
        </MegaMenuContent>
      </MegaMenu>,
    );
    await user.click(trigger());
    expect(link("About Us")).toHaveAttribute("aria-current", "page");
    expect(link("About Us")).toHaveClass("aria-[current=page]:text-fg-brand");
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Nav open={false} onOpenChange={onOpenChange} />);
    await user.click(trigger());
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    rerender(<Nav open onOpenChange={onOpenChange} />);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("renders a custom trigger with asChild", async () => {
    const user = userEvent.setup();
    render(
      <MegaMenu>
        <MegaMenuTrigger asChild>
          <button type="button" className="custom">
            Products
          </button>
        </MegaMenuTrigger>
        <MegaMenuContent>
          <MegaMenuGroup>
            <MegaMenuLink href="#a">Dashboard</MegaMenuLink>
          </MegaMenuGroup>
        </MegaMenuContent>
      </MegaMenu>,
    );
    const button = screen.getByRole("button", { name: "Products" });
    expect(button).toHaveClass("custom");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

describe("MegaMenuContent layout", () => {
  const setWidth = (matches: boolean) => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  };
  afterEach(() => {
    // @ts-expect-error -- jsdom has no matchMedia; restore that.
    delete window.matchMedia;
  });

  it("stacks in the page flow on small screens and floats from md up", async () => {
    const user = userEvent.setup();
    setWidth(false);
    const { unmount } = render(<Nav defaultOpen />);
    const panel = () => document.querySelector<HTMLElement>('[data-slot="mega-menu-content"]')!;
    expect(panel()).toHaveAttribute("data-mode", "inline");
    unmount();

    setWidth(true);
    render(<Nav />);
    await user.click(trigger());
    expect(panel()).toHaveAttribute("data-mode", "floating");
    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 48rem)");
  });

  it("always floats with stackBelow none", () => {
    render(<Nav defaultOpen content={{ stackBelow: "none" }} />);
    expect(document.querySelector('[data-slot="mega-menu-content"]')).toHaveAttribute(
      "data-mode",
      "floating",
    );
  });

  it("spans the navbar with fullWidth, its columns in a centred container", () => {
    render(<Nav defaultOpen content={{ fullWidth: true }} />);
    const panel = document.querySelector('[data-slot="mega-menu-content"]')!;
    expect(panel).toHaveClass("border-y");
    expect(panel.firstElementChild).toHaveClass("max-w-screen-xl", "md:grid-cols-3");
  });
});
