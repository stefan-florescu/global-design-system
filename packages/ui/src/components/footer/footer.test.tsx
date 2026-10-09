import { render, screen, within } from "@testing-library/react";

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterIcons,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "./footer";

function Mark() {
  return <svg data-testid="mark" />;
}

function Sitemap(props: Parameters<typeof Footer>[0]) {
  return (
    <Footer {...props}>
      <FooterBrand href="/" name="Stefan" logo={<Mark />} />
      <FooterLinkGroup title="Resources" vertical>
        <FooterLink href="/docs">Docs</FooterLink>
        <FooterLink href="/blog">Blog</FooterLink>
      </FooterLinkGroup>
      <FooterLinkGroup title="Legal" vertical>
        <FooterLink href="/privacy">Privacy Policy</FooterLink>
      </FooterLinkGroup>
      <FooterDivider />
      <FooterCopyright href="/" by="Stefan™" year={2023}>
        . All Rights Reserved.
      </FooterCopyright>
      <FooterIcons aria-label="Social media">
        <FooterIcon href="https://example.com/a" icon={<Mark />} label="Community" />
        <FooterIcon href="https://example.com/b" icon={<Mark />} label="Code repository" />
      </FooterIcons>
    </Footer>
  );
}

describe("Footer", () => {
  it("is a contentinfo landmark", () => {
    render(<Sitemap />);
    expect(screen.getByRole("contentinfo")).toHaveAttribute("data-slot", "footer");
  });

  it("names each link group's navigation landmark after its title heading", () => {
    render(<Sitemap />);
    const resources = screen.getByRole("navigation", { name: "Resources" });
    expect(within(resources).getByRole("heading", { level: 2, name: "Resources" })).toBeVisible();
    expect(within(resources).getAllByRole("listitem")).toHaveLength(2);
    expect(within(resources).getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("navigation", { name: "Legal" })).toBeInTheDocument();
  });

  it("names an untitled link group Footer unless given a label", () => {
    const { rerender } = render(
      <FooterLinkGroup>
        <FooterLink href="/about">About</FooterLink>
      </FooterLinkGroup>,
    );
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeInTheDocument();
    rerender(
      <FooterLinkGroup aria-label="Company">
        <FooterLink href="/about">About</FooterLink>
      </FooterLinkGroup>,
    );
    expect(screen.getByRole("navigation", { name: "Company" })).toBeInTheDocument();
  });

  it("lays links out in a row or a column", () => {
    const { rerender } = render(
      <FooterLinkGroup>
        <FooterLink href="/about">About</FooterLink>
      </FooterLinkGroup>,
    );
    expect(screen.getByRole("list")).toHaveClass("flex", "flex-wrap", "text-sm");
    rerender(
      <FooterLinkGroup vertical>
        <FooterLink href="/about">About</FooterLink>
      </FooterLinkGroup>,
    );
    expect(screen.getByRole("list")).not.toHaveClass("flex");
  });

  it("links the brand, named by its text, with a decorative mark", () => {
    render(<Sitemap />);
    const brand = screen.getByRole("link", { name: "Stefan" });
    expect(brand).toHaveAttribute("href", "/");
    expect(within(brand).getByTestId("mark").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a brand image with empty alt by default", () => {
    render(<FooterBrand href="/" name="Stefan" src="/logo.svg" />);
    const link = screen.getByRole("link", { name: "Stefan" });
    expect(link.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("writes the copyright notice with a linked holder", () => {
    render(<Sitemap />);
    const notice = screen.getByText(/All Rights Reserved/);
    expect(notice).toHaveTextContent("© 2023 Stefan™. All Rights Reserved.");
    expect(within(notice).getByRole("link", { name: "Stefan™" })).toHaveAttribute("href", "/");
  });

  it("names icon links with their visually hidden label", () => {
    render(<Sitemap />);
    const icons = screen.getByRole("list", { name: "Social media" });
    const link = within(icons).getByRole("link", { name: "Community" });
    expect(link).toHaveAttribute("href", "https://example.com/a");
    expect(within(link).getByText("Community")).toHaveClass("sr-only");
  });

  it("draws a divider", () => {
    render(<Sitemap />);
    expect(screen.getByRole("separator")).toHaveClass("border-default");
  });

  it("applies the card and sticky variants", () => {
    const { rerender } = render(<Footer variant="card" />);
    expect(screen.getByRole("contentinfo")).toHaveClass(
      "bg-neutral-primary-soft",
      "rounded-base",
      "border",
      "shadow-xs",
    );
    rerender(<Footer variant="sticky" />);
    expect(screen.getByRole("contentinfo")).toHaveClass("fixed", "bottom-0", "z-fixed", "border-t");
  });

  it("renders a standalone title heading", () => {
    render(<FooterTitle>Company</FooterTitle>);
    expect(screen.getByRole("heading", { level: 2, name: "Company" })).toHaveClass("uppercase");
  });

  it("gives links the keyboard focus outline", () => {
    render(<Sitemap />);
    for (const link of screen.getAllByRole("link"))
      expect(link).toHaveClass("focus-visible:outline-ring");
  });
});
