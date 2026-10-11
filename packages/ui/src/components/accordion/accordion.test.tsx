import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

function Faq(props: Partial<Parameters<typeof Accordion>[0]>) {
  return (
    <Accordion defaultValue={["one"]} {...props}>
      <AccordionItem value="one">
        <AccordionTrigger>What is Stefan DS?</AccordionTrigger>
        <AccordionContent>A design system.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Is there a Figma file?</AccordionTrigger>
        <AccordionContent>Yes, there is.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="three" disabled>
        <AccordionTrigger>Coming soon</AccordionTrigger>
        <AccordionContent>Later.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="four">
        <AccordionTrigger>What are the differences?</AccordionTrigger>
        <AccordionContent>Some.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const trigger = (name: string) => screen.getByRole("button", { name });

describe("Accordion", () => {
  it("renders each trigger as a button inside a heading, wired to its region", () => {
    render(<Faq />);
    const button = trigger("What is Stefan DS?");
    expect(screen.getByRole("heading", { level: 3, name: "What is Stefan DS?" })).toContainElement(
      button,
    );
    expect(button).toHaveAttribute("aria-expanded", "true");
    const region = screen.getByRole("region", { name: "What is Stefan DS?" });
    expect(button).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveTextContent("A design system.");
  });

  it("hides closed panels", () => {
    render(<Faq />);
    expect(trigger("Is there a Figma file?")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Yes, there is.")).not.toBeVisible();
  });

  it("opens one item at a time by default", async () => {
    const user = userEvent.setup();
    render(<Faq />);
    await user.click(trigger("Is there a Figma file?"));
    expect(trigger("Is there a Figma file?")).toHaveAttribute("aria-expanded", "true");
    expect(trigger("What is Stefan DS?")).toHaveAttribute("aria-expanded", "false");
  });

  it("closes an open item when its trigger is pressed again", async () => {
    const user = userEvent.setup();
    render(<Faq />);
    await user.click(trigger("What is Stefan DS?"));
    expect(trigger("What is Stefan DS?")).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps several items open with multiple", async () => {
    const user = userEvent.setup();
    render(<Faq multiple />);
    await user.click(trigger("Is there a Figma file?"));
    expect(trigger("What is Stefan DS?")).toHaveAttribute("aria-expanded", "true");
    expect(trigger("Is there a Figma file?")).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles with Enter and Space", async () => {
    const user = userEvent.setup();
    render(<Faq defaultValue={[]} />);
    trigger("Is there a Figma file?").focus();
    await user.keyboard("{Enter}");
    expect(trigger("Is there a Figma file?")).toHaveAttribute("aria-expanded", "true");
    await user.keyboard(" ");
    expect(trigger("Is there a Figma file?")).toHaveAttribute("aria-expanded", "false");
  });

  it("moves focus with arrow keys, Home and End, skipping disabled items", async () => {
    const user = userEvent.setup();
    render(<Faq />);
    trigger("What is Stefan DS?").focus();
    await user.keyboard("{ArrowDown}");
    expect(trigger("Is there a Figma file?")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(trigger("What are the differences?")).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(trigger("What is Stefan DS?")).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(trigger("What are the differences?")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(trigger("What is Stefan DS?")).toHaveFocus();
    await user.keyboard("{End}");
    expect(trigger("What are the differences?")).toHaveFocus();
  });

  it("does not toggle disabled items", () => {
    render(<Faq />);
    expect(trigger("Coming soon")).toBeDisabled();
  });

  it("supports controlled state", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    function Controlled() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <Faq
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            setValue(next);
          }}
        />
      );
    }
    render(<Controlled />);
    expect(trigger("What is Stefan DS?")).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger("Is there a Figma file?"));
    expect(onValueChange).toHaveBeenCalledWith(["two"]);
    expect(trigger("Is there a Figma file?")).toHaveAttribute("aria-expanded", "true");
  });

  it("uses the heading level it is given", () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger headingLevel={2}>Section</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Section" })).toBeInTheDocument();
  });

  it("keeps keyboard focus inside its own accordion when nested", async () => {
    const user = userEvent.setup();
    render(
      <Accordion defaultValue={["outer"]}>
        <AccordionItem value="outer">
          <AccordionTrigger>Outer</AccordionTrigger>
          <AccordionContent>
            <Accordion>
              <AccordionItem value="inner">
                <AccordionTrigger>Inner</AccordionTrigger>
                <AccordionContent>Body</AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="next">
          <AccordionTrigger>Next</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    trigger("Outer").focus();
    await user.keyboard("{ArrowDown}");
    expect(trigger("Next")).toHaveFocus();
  });

  it("uses the box and open-title colours by default", () => {
    const { container } = render(<Faq />);
    expect(container.firstChild).toHaveClass("rounded-base", "border-default", "shadow-xs");
    expect(trigger("What is Stefan DS?")).toHaveClass(
      "p-5",
      "text-body",
      "data-[state=open]:bg-neutral-secondary-medium",
      "data-[state=open]:text-heading",
      "hover:bg-neutral-secondary-medium",
    );
  });

  it("applies the brand hover colour", () => {
    render(<Faq variant="brand" />);
    expect(trigger("What is Stefan DS?")).toHaveClass(
      "hover:bg-brand-softer",
      "hover:text-fg-brand",
    );
  });

  it("separates items into cards", () => {
    const { container } = render(<Faq separated />);
    expect(container.firstChild).toHaveClass("gap-4");
    expect(trigger("Is there a Figma file?")).toHaveClass("rounded-base", "border", "shadow-xs");
  });

  it("lays out a flush accordion without side padding", () => {
    render(<Faq flush />);
    expect(trigger("What is Stefan DS?")).toHaveClass("py-5", "border-b");
    expect(trigger("What is Stefan DS?")).not.toHaveClass("p-5");
  });

  it("replaces or removes the chevron with icon", () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger icon={null}>No icon</AccordionTrigger>
          <AccordionContent>A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger icon={<svg data-testid="custom" aria-hidden />}>
            Custom
          </AccordionTrigger>
          <AccordionContent>B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(trigger("No icon").querySelector("svg")).toBeNull();
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("throws a helpful error outside an Accordion", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <AccordionItem value="x">
          <AccordionTrigger>x</AccordionTrigger>
        </AccordionItem>,
      ),
    ).toThrow("<AccordionItem> must be used inside <Accordion>.");
    vi.restoreAllMocks();
  });
});
