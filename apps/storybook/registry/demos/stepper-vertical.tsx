import { Stepper, StepperItem } from "@stefan-florescu/ui";

export default function StepperVertical() {
  return (
    <Stepper variant="vertical" aria-label="Registration progress">
      <StepperItem status="complete">User info</StepperItem>
      <StepperItem status="complete">Account info</StepperItem>
      <StepperItem status="current">Social accounts</StepperItem>
      <StepperItem>Review</StepperItem>
      <StepperItem>Confirmation</StepperItem>
    </Stepper>
  );
}
