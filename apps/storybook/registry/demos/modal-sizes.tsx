import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  type ModalSize,
} from "@stefan-florescu/ui";

// Flowbite's four sizes: small, default, large and extra large.
const sizes: { size: ModalSize; label: string }[] = [
  { size: "md", label: "Small modal" },
  { size: "lg", label: "Default modal" },
  { size: "4xl", label: "Large modal" },
  { size: "7xl", label: "Extra large modal" },
];

export default function ModalSizes() {
  return (
    <div className="block space-y-4 md:flex md:gap-4 md:space-y-0">
      {sizes.map(({ size, label }) => (
        <Modal key={size} size={size}>
          <ModalTrigger>{label}</ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Terms of Service</ModalTitle>
              <ModalClose label="Close modal" />
            </ModalHeader>
            <ModalBody>
              <p className="leading-relaxed">
                With less than a month to go before the European Union enacts new consumer privacy
                laws for its citizens, companies around the world are updating their terms of
                service agreements to comply.
              </p>
              <p className="leading-relaxed">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect
                on May 25 and is meant to ensure a common set of data rights in the European Union.
                It requires organizations to notify users as soon as possible of high-risk data
                breaches that could personally affect them.
              </p>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button>I accept</Button>
              </ModalClose>
              <ModalClose asChild>
                <Button variant="secondary">Decline</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ))}
    </div>
  );
}
