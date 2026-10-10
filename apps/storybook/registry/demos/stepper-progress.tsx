import { ClipboardCheck, IdCard } from "@stefan-florescu/icons";
import { Stepper, StepperItem } from "@stefan-florescu/ui";

export default function StepperProgress() {
  return (
    <Stepper variant="progress" aria-label="Registration progress">
      <StepperItem status="complete">Personal info</StepperItem>
      <StepperItem icon={<IdCard />}>Account info</StepperItem>
      <StepperItem icon={<ClipboardCheck />}>Confirmation</StepperItem>
    </Stepper>
  );
}
