import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Calendar } from "./calendar";
import { Datepicker } from "./datepicker";

const OCT_8 = new Date(2026, 9, 8);
const day = (name: RegExp | string) => screen.getByRole("button", { name });

describe("Calendar", () => {
  it("shows a labelled month grid with weekday headers", () => {
    render(<Calendar defaultMonth={OCT_8} locale="en-US" />);
    const grid = screen.getByRole("grid", { name: "October 2026" });
    expect(within(grid).getAllByRole("columnheader")).toHaveLength(7);
    expect(within(grid).getAllByRole("row")).toHaveLength(7);
  });

  it("selects a day and marks it selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Calendar defaultMonth={OCT_8} locale="en-US" onChange={onChange} />);
    await user.click(day("Thursday, October 15, 2026"));
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 9, 15));
    expect(day("Thursday, October 15, 2026").parentElement).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("has a single tab stop on the focused day", () => {
    render(<Calendar defaultValue={OCT_8} locale="en-US" />);
    const focusable = screen
      .getAllByRole("button")
      .filter((button) => button.dataset.date && button.tabIndex === 0);
    expect(focusable).toHaveLength(1);
    expect(focusable[0]).toHaveAccessibleName("Thursday, October 8, 2026");
  });

  it("moves focus with arrows, Home/End and Page Up/Down", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={OCT_8} locale="en-US" />);
    day("Thursday, October 8, 2026").focus();
    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(day("Friday, October 9, 2026")).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(day("Friday, October 16, 2026")).toHaveFocus());
    await user.keyboard("{Home}");
    await waitFor(() => expect(day("Sunday, October 11, 2026")).toHaveFocus());
    await user.keyboard("{End}");
    await waitFor(() => expect(day("Saturday, October 17, 2026")).toHaveFocus());
    await user.keyboard("{PageDown}");
    await waitFor(() => expect(day("Tuesday, November 17, 2026")).toHaveFocus());
    expect(screen.getByRole("grid", { name: "November 2026" })).toBeInTheDocument();
  });

  it("changes month with the navigation buttons", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={OCT_8} locale="en-US" />);
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("grid", { name: "November 2026" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByRole("grid", { name: "September 2026" })).toBeInTheDocument();
  });

  it("disables days outside min and max", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Calendar
        defaultMonth={OCT_8}
        min={new Date(2026, 9, 5)}
        max={new Date(2026, 9, 20)}
        locale="en-US"
        onChange={onChange}
      />,
    );
    expect(day("Sunday, October 4, 2026")).toHaveAttribute("aria-disabled", "true");
    await user.click(day("Sunday, October 4, 2026"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it("selects a range", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Calendar mode="range" defaultMonth={OCT_8} locale="en-US" onChange={onChange} />);
    await user.click(day("Monday, October 12, 2026"));
    await user.click(day("Friday, October 16, 2026"));
    expect(onChange).toHaveBeenLastCalledWith({
      from: new Date(2026, 9, 12),
      to: new Date(2026, 9, 16),
    });
    expect(day("Wednesday, October 14, 2026").parentElement).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("grid")).toHaveAttribute("aria-multiselectable", "true");
  });
});

describe("Datepicker", () => {
  it("opens a calendar dialog, picks a day and returns focus", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Datepicker defaultValue={OCT_8} locale="en-US" onChange={onChange} />);
    const trigger = screen.getByRole("button", { name: "Date, Oct 8, 2026" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const dialog = screen.getByRole("dialog", { name: "Choose date" });
    await waitFor(() =>
      expect(within(dialog).getByRole("button", { name: /October 8, 2026/ })).toHaveFocus(),
    );
    await user.click(within(dialog).getByRole("button", { name: "Friday, October 23, 2026" }));
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 9, 23));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Date, Oct 23, 2026" })).toHaveFocus(),
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Datepicker locale="en-US" />);
    await user.click(screen.getByRole("button", { name: "Date, Select date" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on a click outside", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Datepicker locale="en-US" />
        <p>Outside</p>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Date, Select date" }));
    await user.click(screen.getByText("Outside"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("clears the value and submits it with a form", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Datepicker
        defaultValue={OCT_8}
        name="departure"
        label="Departure"
        showClearButton
        locale="en-US"
        onChange={onChange}
      />,
    );
    expect(container.querySelector('input[name="departure"]')).toHaveValue("2026-10-08");
    await user.click(screen.getByRole("button", { name: "Departure, Oct 8, 2026" }));
    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenCalledWith(null);
    expect(container.querySelector('input[name="departure"]')).toHaveValue("");
  });
});
