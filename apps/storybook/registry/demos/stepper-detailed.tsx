import { CreditCard, IdCard } from "@stefan-florescu/icons";
import { Stepper, StepperItem } from "@stefan-florescu/ui";

export default function StepperDetailed() {
  return (
    <Stepper variant="detailed" aria-label="Checkout progress">
      <StepperItem status="complete" description="Step details here">
        User info
      </StepperItem>
      <StepperItem icon={<IdCard />} description="Step details here">
        Company info
      </StepperItem>
      <StepperItem icon={<CreditCard />} description="Step details here">
        Payment info
      </StepperItem>
    </Stepper>
  );
}
