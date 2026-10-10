import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toast, ToastIcon, ToastToggle } from "./toast";
import { ToastProvider, useToast, type ToastOptions } from "./toast-provider";

describe("Toast", () => {
  it("is a polite status message by default", () => {
    render(<Toast>Message sent.</Toast>);
    const toast = screen.getByRole("status");
    expect(toast).toHaveTextContent("Message sent.");
    expect(toast).toHaveClass("bg-neutral-primary-soft", "border-default", "max-w-xs");
  });

  it("interrupts with role=alert only for danger", () => {
    const { rerender } = render(<Toast variant="danger">Upload failed.</Toast>);
    expect(screen.getByRole("alert")).toHaveClass("bg-danger-soft");
    rerender(<Toast variant="warning">Check your invoice.</Toast>);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveClass("bg-warning-soft");
  });

  it("lets the role be overridden", () => {
    render(<Toast role="alert">Connection lost.</Toast>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("closes with the named × button and reports it", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Toast onDismiss={onDismiss}>
        Saved
        <ToastToggle />
      </Toast>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("names the × button with label", () => {
    render(
      <Toast>
        Saved
        <ToastToggle label="Close notification" />
      </Toast>,
    );
    expect(screen.getByRole("button", { name: "Close notification" })).toBeInTheDocument();
  });

  it("closes with your own button through asChild", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Toast>
        Update available
        <ToastToggle asChild>
          <button type="button" className="px-3" onClick={onClick}>
            Not now
          </button>
        </ToastToggle>
      </Toast>,
    );
    const button = screen.getByRole("button", { name: "Not now" });
    expect(button).toHaveClass("px-3");
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("stays open when the toggle's click is prevented", async () => {
    const user = userEvent.setup();
    render(
      <Toast>
        Saved
        <ToastToggle onClick={(event) => event.preventDefault()} />
      </Toast>,
    );
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("hides the icon and reads its label", () => {
    render(
      <ToastIcon variant="success" label="Success:">
        <svg data-testid="icon" />
      </ToastIcon>,
    );
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Success:")).toHaveClass("sr-only");
    expect(screen.getByText("Success:").parentElement).toHaveClass(
      "bg-success-soft",
      "text-fg-success",
      "size-7",
    );
  });
});

function Trigger({ options, label = "Show" }: { options?: ToastOptions; label?: string }) {
  const { toast, dismiss } = useToast();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          const id = toast(
            <Toast>
              Conversation archived.
              <ToastToggle />
            </Toast>,
            options,
          );
          (window as unknown as { lastToast: string }).lastToast = id;
        }}
      >
        {label}
      </button>
      <button
        type="button"
        onClick={() => dismiss((window as unknown as { lastToast: string }).lastToast)}
      >
        Dismiss last
      </button>
    </>
  );
}

describe("ToastProvider", () => {
  afterEach(() => vi.useRealTimers());

  it("renders a named region with a polite live list, before any toast", () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    const region = screen.getByRole("region", { name: "Notifications" });
    expect(region).toHaveClass("fixed", "z-toast", "bottom-5", "sm:end-5");
    const list = within(region).getByRole("list");
    expect(list).toHaveAttribute("aria-live", "polite");
    expect(within(list).queryAllByRole("listitem")).toHaveLength(0);
  });

  it("shows toasts from code without their own live role", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider position="top-start">
        <Trigger />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Show" }));
    await user.click(screen.getByRole("button", { name: "Show" }));
    const region = screen.getByRole("region", { name: "Notifications" });
    expect(region).toHaveClass("top-5", "sm:start-5");
    expect(within(region).getAllByRole("listitem")).toHaveLength(2);
    // The list is the live region; a nested status would be announced twice.
    expect(within(region).queryByRole("status")).not.toBeInTheDocument();
  });

  it("removes a toast when it is closed or dismissed by id", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    const region = screen.getByRole("region");
    await user.click(screen.getByRole("button", { name: "Show" }));
    await user.click(within(region).getByRole("button", { name: "Close" }));
    expect(within(region).queryAllByRole("listitem")).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Show" }));
    await user.click(screen.getByRole("button", { name: "Dismiss last" }));
    expect(within(region).queryAllByRole("listitem")).toHaveLength(0);
  });

  it("keeps toasts open by default", () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    act(() => screen.getByRole("button", { name: "Show" }).click());
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("closes after duration, pausing while hovered or focused", () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger options={{ duration: 5000 }} />
      </ToastProvider>,
    );
    act(() => screen.getByRole("button", { name: "Show" }).click());
    const item = screen.getByRole("listitem");

    act(() => vi.advanceTimersByTime(3000));
    act(() => {
      item.dispatchEvent(new Event("pointerenter"));
    });
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    act(() => {
      item.dispatchEvent(new Event("pointerleave"));
    });
    act(() => within(item).getByRole("button", { name: "Close" }).focus());
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    act(() => within(item).getByRole("button", { name: "Close" }).blur());
    act(() => vi.advanceTimersByTime(1900));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("stacks in its container with contained", () => {
    render(<ToastProvider contained position="bottom-center" />);
    const region = screen.getByRole("region");
    expect(region).toHaveClass("absolute", "sm:inset-x-0", "sm:mx-auto");
    expect(region).not.toHaveClass("fixed", "sm:inset-x-auto");
  });

  it("throws a helpful error outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow(/inside <ToastProvider>/);
    spy.mockRestore();
  });
});
