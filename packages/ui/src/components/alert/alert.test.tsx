import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("is a polite status message by default", () => {
    render(<Alert>Changes saved.</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("Changes saved.");
  });

  it.each(["destructive", "warning"] as const)("interrupts with role=alert for %s", (variant) => {
    render(<Alert variant={variant}>Something went wrong.</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong.");
  });

  it("lets the role be overridden", () => {
    render(
      <Alert variant="destructive" role="note">
        Read me
      </Alert>,
    );
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it("hides its icon from assistive technology", () => {
    render(<Alert icon={<svg data-testid="icon" />}>Heads up</Alert>);
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a title and description", () => {
    render(
      <Alert>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>Restart to install.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Update availableRestart to install.");
  });

  it("dismisses itself and reports it", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Saved
      </Alert>,
    );
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("names the close button with dismissLabel", () => {
    render(
      <Alert dismissible dismissLabel="Close message">
        Saved
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Close message" })).toBeInTheDocument();
  });

  it("uses the intent's subtle tokens", () => {
    render(<Alert variant="success">Done</Alert>);
    expect(screen.getByRole("status")).toHaveClass(
      "bg-success-subtle",
      "text-success-subtle-foreground",
    );
  });
});
