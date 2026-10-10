import { ClipboardCheck, ClipboardList, IdCard } from "@stefan-florescu/icons";
import { Stepper, StepperItem } from "@stefan-florescu/ui";

export default function StepperTimeline() {
  return (
    <div className="p-4">
      <Stepper variant="timeline" aria-label="Registration progress">
        <StepperItem status="complete" description="Step details here">
          Personal Info
        </StepperItem>
        <StepperItem icon={<IdCard />} description="Step details here">
          Account Info
        </StepperItem>
        <StepperItem icon={<ClipboardList />} description="Step details here">
          Review
        </StepperItem>
        <StepperItem icon={<ClipboardCheck />} description="Step details here">
          Confirmation
        </StepperItem>
      </Stepper>
    </div>
  );
}
