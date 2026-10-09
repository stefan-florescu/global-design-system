import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSub,
  DropdownSubMenu,
  DropdownSubTrigger,
  DropdownTrigger,
  type DropdownProps,
} from ".";
import { computeDropdownPosition } from "./dropdown-position";

function Menu({
  onSettings,
  ...props
}: Omit<DropdownProps, "children"> & { onSettings?: () => void }) {
  return (
    <>
      <Dropdown {...props}>
        <DropdownTrigger>Options</DropdownTrigger>
        <DropdownMenu>
          <DropdownHeader>Bonnie Green</DropdownHeader>
          <DropdownItem href="#dashboard">Dashboard</DropdownItem>
          <DropdownItem onClick={onSettings}>Settings</DropdownItem>
          <DropdownItem disabled>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <button type="button">After</button>
    </>
  );
}

const trigger = () => screen.getByRole("button", { name: "Options" });

describe("Dropdown menu", () => {
  it("names the menu by its trigger and reflects the open state", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    expect(trigger()).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(trigger());
    const menu = screen.getByRole("menu", { name: "Options" });
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(trigger()).toHaveAttribute("aria-controls", menu.id);
    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual([
      "Dashboard",
      "Settings",
      "Earnings",
      "Sign out",
    ]);
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Dashboard" })).toHaveFocus();
  });

  it("opens on the first item with Enter, Space and Arrow Down, and on the last with Arrow Up", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    trigger().focus();

    for (const key of ["{Enter}", " ", "{ArrowDown}"]) {
      await user.keyboard(key);
      expect(screen.getByRole("menuitem", { name: "Dashboard" })).toHaveFocus();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(trigger()).toHaveFocus();
    }

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toHaveFocus();
  });

  it("moves with the arrow keys, Home and End, wrapping around, and keeps disabled items focusable", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    trigger().focus();
    await user.keyboard("{ArrowDown}");

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Settings" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Earnings" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("menuitem", { name: "Earnings" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Dashboard" })).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("menuitem", { name: "Dashboard" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toHaveFocus();
  });

  it("moves to the next item starting with the typed letters", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    trigger().focus();
    await user.keyboard("{ArrowDown}");

    await user.keyboard("s");
    expect(screen.getByRole("menuitem", { name: "Settings" })).toHaveFocus();
    await user.keyboard("s");
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toHaveFocus();
    // The typed letters are forgotten after half a second.
    await act(() => new Promise((resolve) => setTimeout(resolve, 600)));
    await user.keyboard("e");
    expect(screen.getByRole("menuitem", { name: "Earnings" })).toHaveFocus();
  });

  it("runs the item, closes and returns focus to the trigger when an item is chosen", async () => {
    const user = userEvent.setup();
    const onSettings = vi.fn();
    render(<Menu onSettings={onSettings} />);

    await user.click(trigger());
    await user.click(screen.getByRole("menuitem", { name: "Settings" }));
    expect(onSettings).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();

    trigger().focus();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onSettings).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("ignores disabled items", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Menu onOpenChange={onOpenChange} />);
    await user.click(trigger());
    await user.click(screen.getByRole("menuitem", { name: "Earnings" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it("renders links for items with href", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    await user.click(trigger());
    const link = screen.getByRole("menuitem", { name: "Dashboard" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#dashboard");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("closes on a click outside and when Tab moves focus away", async () => {
    const user = userEvent.setup();
    render(<Menu />);

    await user.click(trigger());
    await user.click(document.body);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(trigger());
    await user.tab();
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("toggles with a second click on the trigger", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    await user.click(trigger());
    await user.click(trigger());
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(<Menu open={false} onOpenChange={onOpenChange} />);
    await user.click(trigger());
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    rerender(<Menu open onOpenChange={onOpenChange} />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});

describe("Dropdown checkbox and radio items", () => {
  it("toggles checkbox items and keeps the menu open", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Dropdown>
        <DropdownTrigger>Filters</DropdownTrigger>
        <DropdownMenu>
          <DropdownCheckboxItem onCheckedChange={onCheckedChange}>Default</DropdownCheckboxItem>
          <DropdownCheckboxItem defaultChecked description="Some helpful text.">
            Checked
          </DropdownCheckboxItem>
          <DropdownCheckboxItem indicator="toggle">Notifications</DropdownCheckboxItem>
        </DropdownMenu>
      </Dropdown>,
    );
    await user.click(screen.getByRole("button", { name: "Filters" }));
    const first = screen.getByRole("menuitemcheckbox", { name: "Default" });
    expect(first).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("menuitemcheckbox", { name: "Checked" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("menuitemcheckbox", { name: "Checked" })).toHaveAccessibleDescription(
      "Some helpful text.",
    );

    await user.click(first);
    expect(first).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard(" ");
    expect(first).toHaveAttribute("aria-checked", "false");
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(screen.getByRole("menuitemcheckbox", { name: "Notifications" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("checks one radio item of a group", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Dropdown>
        <DropdownTrigger>Plan</DropdownTrigger>
        <DropdownMenu>
          <DropdownRadioGroup aria-label="Plan" defaultValue="free" onValueChange={onValueChange}>
            <DropdownRadioItem value="free">Free</DropdownRadioItem>
            <DropdownRadioItem value="pro">Pro</DropdownRadioItem>
          </DropdownRadioGroup>
        </DropdownMenu>
      </Dropdown>,
    );
    await user.click(screen.getByRole("button", { name: "Plan" }));
    expect(screen.getByRole("group", { name: "Plan" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "Free" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await user.click(screen.getByRole("menuitemradio", { name: "Pro" }));
    expect(onValueChange).toHaveBeenCalledWith("pro");
    expect(screen.getByRole("menuitemradio", { name: "Pro" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("menuitemradio", { name: "Free" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });
});

describe("Dropdown sub-menus", () => {
  function MultiLevel({ onRewards }: { onRewards?: () => void }) {
    return (
      <Dropdown>
        <DropdownTrigger>Options</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownSub>
            <DropdownSubTrigger>More</DropdownSubTrigger>
            <DropdownSubMenu>
              <DropdownItem>Overview</DropdownItem>
              <DropdownItem onClick={onRewards}>Rewards</DropdownItem>
            </DropdownSubMenu>
          </DropdownSub>
          <DropdownItem>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  it("opens with Arrow Right, closes with Arrow Left or Escape, and skips sub-items in the parent", async () => {
    const user = userEvent.setup();
    render(<MultiLevel />);
    trigger().focus();
    await user.keyboard("{ArrowDown}{ArrowDown}");
    const more = screen.getByRole("menuitem", { name: "More" });
    expect(more).toHaveFocus();
    expect(more).toHaveAttribute("aria-haspopup", "menu");
    expect(more).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("menu", { name: "More" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Overview" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Rewards" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(more).toHaveFocus();
    expect(screen.queryByRole("menu", { name: "More" })).not.toBeInTheDocument();

    await user.keyboard("{Enter}");
    expect(screen.getByRole("menuitem", { name: "Overview" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(more).toHaveFocus();
    expect(screen.getByRole("menu", { name: "Options" })).toBeInTheDocument();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Sign out" })).toHaveFocus();
  });

  it("closes every level when a sub-item is chosen", async () => {
    const user = userEvent.setup();
    const onRewards = vi.fn();
    render(<MultiLevel onRewards={onRewards} />);
    await user.click(trigger());
    await user.click(screen.getByRole("menuitem", { name: "More" }));
    await user.click(screen.getByRole("menuitem", { name: "Rewards" }));
    expect(onRewards).toHaveBeenCalled();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();
  });
});

describe("DropdownContent", () => {
  it("as a dialog, moves focus to its first control and closes with Escape", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <DropdownTrigger>Users</DropdownTrigger>
        <DropdownContent role="dialog">
          <input aria-label="Search" />
          <button type="button">Delete user</button>
        </DropdownContent>
      </Dropdown>,
    );
    expect(screen.getByRole("button", { name: "Users" })).toHaveAttribute(
      "aria-haspopup",
      "dialog",
    );
    await user.click(screen.getByRole("button", { name: "Users" }));
    expect(screen.getByRole("dialog", { name: "Users" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Delete user" })).toHaveFocus();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Users" })).toHaveFocus();
  });

  it("as a disclosure, keeps focus on the trigger and renders items as plain links", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <DropdownTrigger>Products</DropdownTrigger>
        <DropdownContent>
          <DropdownItem href="#a">Dashboard</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );
    const button = screen.getByRole("button", { name: "Products" });
    expect(button).not.toHaveAttribute("aria-haspopup");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveFocus();
    const link = screen.getByRole("link", { name: "Dashboard" });
    expect(link).not.toHaveAttribute("tabindex");
    await user.tab();
    expect(link).toHaveFocus();
    await user.click(link);
    expect(screen.queryByRole("link", { name: "Dashboard" })).not.toBeInTheDocument();
  });
});

describe("DropdownTrigger", () => {
  it("renders a custom trigger with asChild", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Dropdown>
        <DropdownTrigger asChild>
          <button type="button" aria-label="Open user menu" className="custom" onClick={onClick}>
            <span>JM</span>
          </button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Account</DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );
    const button = screen.getByRole("button", { name: "Open user menu" });
    expect(button).toHaveClass("custom");
    expect(button).toHaveAttribute("aria-haspopup", "menu");
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("opens on hover with openOnHover, and a click keeps it open", async () => {
    const user = userEvent.setup();
    render(<Menu openOnHover hoverDelay={0} />);
    await user.hover(trigger());
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
    // Opening on hover does not move focus.
    expect(document.body).toHaveFocus();
    await user.unhover(trigger());
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());

    await user.hover(trigger());
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument());
    await user.click(trigger());
    await user.unhover(trigger());
    await act(() => new Promise((resolve) => setTimeout(resolve, 10)));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});

describe("computeDropdownPosition", () => {
  const anchor = { top: 100, bottom: 140, left: 200, right: 300, width: 100, height: 40 };
  const panel = { width: 176, height: 120 };
  const base = {
    offset: 10,
    skidding: 0,
    rtl: false,
    viewport: { width: 1000, height: 800 },
  };

  it("centres on the side and aligns start or end", () => {
    expect(computeDropdownPosition(anchor, panel, { ...base, placement: "bottom" })).toEqual({
      x: 162,
      y: 150,
      side: "bottom",
    });
    expect(computeDropdownPosition(anchor, panel, { ...base, placement: "bottom-start" }).x).toBe(
      200,
    );
    expect(computeDropdownPosition(anchor, panel, { ...base, placement: "bottom-end" }).x).toBe(
      124,
    );
    expect(
      computeDropdownPosition(anchor, panel, { ...base, placement: "bottom-start", rtl: true }).x,
    ).toBe(124);
    expect(computeDropdownPosition(anchor, panel, { ...base, placement: "right-start" })).toEqual({
      x: 310,
      y: 100,
      side: "right",
    });
  });

  it("applies the skidding and flips when there is no room", () => {
    expect(
      computeDropdownPosition(anchor, panel, { ...base, placement: "right", skidding: 50 }).y,
    ).toBe(110);
    expect(computeDropdownPosition(anchor, panel, { ...base, placement: "top" }).side).toBe(
      "bottom",
    );
  });
});
