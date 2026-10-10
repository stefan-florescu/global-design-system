import { Stepper, StepperItem } from "@stefan-florescu/ui";

export default function StepperBreadcrumb() {
  return (
    <Stepper variant="breadcrumb" aria-label="Registration progress">
      <StepperItem status="complete">
        Personal <span className="ms-2 hidden sm:inline-flex">Info</span>
      </StepperItem>
      <StepperItem>
        Account <span className="ms-2 hidden sm:inline-flex">Info</span>
      </StepperItem>
      <StepperItem>Review</StepperItem>
    </Stepper>
  );
}
