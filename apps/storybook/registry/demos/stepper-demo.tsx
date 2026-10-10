import { Stepper, StepperItem } from "@stefan-florescu/ui";

export default function StepperDemo() {
  return (
    <Stepper aria-label="Registration progress">
      <StepperItem status="complete">
        Personal <span className="hidden sm:ms-2 sm:inline-flex">Info</span>
      </StepperItem>
      <StepperItem>
        Account <span className="hidden sm:ms-2 sm:inline-flex">Info</span>
      </StepperItem>
      <StepperItem>Confirmation</StepperItem>
    </Stepper>
  );
}
