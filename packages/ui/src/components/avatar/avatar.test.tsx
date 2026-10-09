import { render, screen } from "@testing-library/react";

import { Avatar, AvatarGroup, AvatarGroupCounter } from "./avatar";

describe("Avatar", () => {
  it("renders an image with its alt text", () => {
    render(<Avatar src="/jese.jpg" alt="Jese Leos" />);
    expect(screen.getByRole("img", { name: "Jese Leos" })).toHaveAttribute("src", "/jese.jpg");
  });

  it("names initials with alt", () => {
    render(<Avatar initials="JL" alt="Jese Leos" />);
    expect(screen.getByRole("img", { name: "Jese Leos" })).toHaveTextContent("JL");
  });

  it("shows a placeholder icon when there is no image or initials", () => {
    render(<Avatar alt="Unknown user" />);
    const img = screen.getByRole("img", { name: "Unknown user" });
    expect(img.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is decorative without alt", () => {
    render(<Avatar initials="JL" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("JL")).toHaveAttribute("aria-hidden", "true");
  });

  it("announces the status as text", () => {
    render(<Avatar alt="Jese Leos" initials="JL" status="busy" />);
    expect(screen.getByText("Busy")).toHaveClass("sr-only");
  });

  it("uses a custom status label", () => {
    render(<Avatar alt="Jese Leos" initials="JL" status="away" statusLabel="In a meeting" />);
    expect(screen.getByText("In a meeting")).toBeInTheDocument();
  });

  it("is Flowbite's 40px circle by default, with initials on neutral-tertiary", () => {
    render(<Avatar alt="Jese Leos" initials="JL" />);
    const frame = screen.getByRole("img", { name: "Jese Leos" }).parentElement;
    expect(frame).toHaveClass("rounded-full", "bg-neutral-tertiary", "text-body", "font-medium");
    expect(frame?.parentElement).toHaveClass("size-10");
  });

  it("applies size and shape", () => {
    const { rerender } = render(<Avatar alt="Jese Leos" initials="JL" size="2xl" shape="square" />);
    let frame = screen.getByRole("img", { name: "Jese Leos" }).parentElement;
    expect(frame).toHaveClass("rounded-base");
    expect(frame?.parentElement).toHaveClass("size-16");
    rerender(<Avatar alt="Jese Leos" initials="JL" size="xs" shape="square" />);
    frame = screen.getByRole("img", { name: "Jese Leos" }).parentElement;
    expect(frame).toHaveClass("rounded-sm");
    expect(frame?.parentElement).toHaveClass("size-6");
  });

  it("draws Flowbite's bordered ring", () => {
    render(<Avatar alt="Jese Leos" initials="JL" bordered />);
    expect(screen.getByRole("img", { name: "Jese Leos" }).parentElement).toHaveClass(
      "p-1",
      "ring-2",
      "ring-default",
    );
  });

  it("renders a group with a counter link", () => {
    render(
      <AvatarGroup>
        <Avatar alt="A" initials="A" stacked />
        <AvatarGroupCounter href="/team" aria-label="99 more people">
          +99
        </AvatarGroupCounter>
      </AvatarGroup>,
    );
    expect(screen.getByRole("link", { name: "99 more people" })).toHaveAttribute("href", "/team");
    expect(screen.getByRole("img", { name: "A" }).parentElement).toHaveClass(
      "border-2",
      "border-buffer",
    );
  });
});
