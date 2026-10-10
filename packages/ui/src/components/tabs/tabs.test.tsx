import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsLink,
  TabsList,
  TabsNav,
  TabsTrigger,
  type TabsProps,
} from "./tabs";

function Example(props: Partial<TabsProps>) {
  return (
    <Tabs defaultValue="profile" {...props}>
      <TabsList aria-label="Account">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Settings
        </TabsTrigger>
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Profile panel</TabsContent>
      <TabsContent value="dashboard">Dashboard panel</TabsContent>
      <TabsContent value="settings">Settings panel</TabsContent>
      <TabsContent value="contacts">Contacts panel</TabsContent>
    </Tabs>
  );
}

const tab = (name: string) => screen.getByRole("tab", { name });

describe("Tabs", () => {
  it("wires the tablist, tabs and panels together", () => {
    render(<Example />);
    const list = screen.getByRole("tablist", { name: "Account" });
    expect(list).toHaveAttribute("aria-orientation", "horizontal");
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    const profile = tab("Profile");
    expect(profile).toHaveAttribute("aria-selected", "true");
    const panel = screen.getByRole("tabpanel", { name: "Profile" });
    expect(profile).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveTextContent("Profile panel");
    expect(panel).toHaveAttribute("tabindex", "0");
  });

  it("shows only the selected panel", () => {
    render(<Example />);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    expect(screen.getByText("Dashboard panel")).not.toBeVisible();
  });

  it("uses a roving tabindex", () => {
    render(<Example />);
    expect(tab("Profile")).toHaveAttribute("tabindex", "0");
    expect(tab("Dashboard")).toHaveAttribute("tabindex", "-1");
  });

  it("selects a tab on click", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(tab("Dashboard"));
    expect(tab("Dashboard")).toHaveAttribute("aria-selected", "true");
    expect(tab("Profile")).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Dashboard panel");
  });

  it("moves and selects with the arrow keys, skipping disabled tabs and wrapping", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    expect(tab("Profile")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tab("Dashboard")).toHaveFocus();
    expect(tab("Dashboard")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowRight}");
    expect(tab("Contacts")).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tab("Profile")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("Contacts")).toHaveFocus();
    expect(tab("Contacts")).toHaveAttribute("aria-selected", "true");
  });

  it("jumps to the first and last tab with Home and End", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    await user.keyboard("{End}");
    expect(tab("Contacts")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(tab("Profile")).toHaveFocus();
  });

  it("moves focus from the tab to its panel with Tab", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("tabpanel")).toHaveFocus();
  });

  it("only moves focus in manual mode until Enter or Space", async () => {
    const user = userEvent.setup();
    render(<Example activationMode="manual" />);
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("Dashboard")).toHaveFocus();
    expect(tab("Profile")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Enter}");
    expect(tab("Dashboard")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowRight} ");
    expect(tab("Contacts")).toHaveAttribute("aria-selected", "true");
  });

  it("uses the up and down arrows when vertical", async () => {
    const user = userEvent.setup();
    render(<Example orientation="vertical" />);
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(tab("Profile")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(tab("Dashboard")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(tab("Profile")).toHaveFocus();
  });

  it("selects the first enabled tab without a default value", () => {
    render(<Example defaultValue={undefined} />);
    expect(tab("Profile")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Profile panel");
  });

  it("disables tabs", async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(tab("Settings")).toBeDisabled();
    await user.click(tab("Settings"));
    expect(tab("Profile")).toHaveAttribute("aria-selected", "true");
  });

  it("supports a controlled value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    function Controlled() {
      const [value, setValue] = useState("dashboard");
      return (
        <Example
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            setValue(next);
          }}
        />
      );
    }
    render(<Controlled />);
    expect(tab("Dashboard")).toHaveAttribute("aria-selected", "true");
    await user.click(tab("Contacts"));
    expect(onValueChange).toHaveBeenCalledWith("contacts");
    expect(tab("Contacts")).toHaveAttribute("aria-selected", "true");
  });

  it("does not call onValueChange when the selected tab is pressed again", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    await user.click(tab("Profile"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("styles the tabs by state and variant", () => {
    render(<Example variant="pills" />);
    expect(tab("Profile")).toHaveAttribute("data-state", "active");
    expect(tab("Profile")).toHaveClass("bg-brand", "text-brand-foreground");
    expect(tab("Dashboard")).toHaveAttribute("data-state", "inactive");
    expect(tab("Settings")).toHaveAttribute("data-state", "disabled");
    expect(tab("Settings")).toHaveClass("text-fg-disabled");
  });

  it("merges className", () => {
    render(
      <Tabs defaultValue="a" className="custom-root">
        <TabsList className="custom-list">
          <TabsTrigger value="a" className="custom-trigger">
            A
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="custom-panel">
          A panel
        </TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist")).toHaveClass("custom-list");
    expect(tab("A")).toHaveClass("custom-trigger");
    expect(screen.getByRole("tabpanel")).toHaveClass("custom-panel");
  });

  it("throws outside Tabs", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TabsTrigger value="a">A</TabsTrigger>)).toThrow(/inside <Tabs>/);
    vi.restoreAllMocks();
  });
});

describe("TabsNav", () => {
  function Nav() {
    return (
      <TabsNav aria-label="Account pages">
        <TabsLink href="/profile" active>
          Profile
        </TabsLink>
        <TabsLink href="/dashboard">Dashboard</TabsLink>
        <TabsLink href="/archive" disabled>
          Disabled
        </TabsLink>
      </TabsNav>
    );
  }

  it("renders a navigation landmark with a list of links", () => {
    render(<Nav />);
    const nav = screen.getByRole("navigation", { name: "Account pages" });
    expect(nav).toContainElement(screen.getByRole("list"));
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("marks the current page", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveAttribute("aria-current");
  });

  it("renders disabled links without an href", () => {
    render(<Nav />);
    const disabled = screen.getByText("Disabled");
    expect(disabled).not.toHaveAttribute("href");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    expect(disabled).toHaveClass("text-fg-disabled");
  });

  it("renders a router link with asChild", () => {
    render(
      <TabsNav aria-label="Pages">
        <TabsLink asChild active>
          <a href="/router">Router</a>
        </TabsLink>
      </TabsNav>,
    );
    const link = screen.getByRole("link", { name: "Router" });
    expect(link).toHaveAttribute("href", "/router");
    expect(link).toHaveAttribute("aria-current", "page");
  });
});
