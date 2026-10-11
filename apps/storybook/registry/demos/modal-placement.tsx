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
  type ModalPlacement as Placement,
} from "@stefan-florescu/ui";

// The four corner placements; `placement` also takes the centre of each edge.
const placements: { placement: Placement; label: string }[] = [
  { placement: "top-left", label: "Top left" },
  { placement: "top-right", label: "Top right" },
  { placement: "bottom-left", label: "Bottom left" },
  { placement: "bottom-right", label: "Bottom right" },
];

export default function ModalPlacement() {
  return (
    <div className="block space-y-4 md:flex md:gap-4 md:space-y-0">
      {placements.map(({ placement, label }) => (
        <Modal key={placement} placement={placement}>
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
