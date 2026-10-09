import { CircleAlert } from "@stefan-florescu/icons";
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "@stefan-florescu/ui";

export default function ModalPopup() {
  return (
    <Modal size="md">
      <ModalTrigger>Toggle modal</ModalTrigger>
      {/* An alert dialog: it asks the user to confirm before continuing. */}
      <ModalContent role="alertdialog">
        <ModalClose label="Close modal" className="absolute end-2.5 top-3" />
        <div className="p-4 text-center md:p-5">
          <CircleAlert aria-hidden className="text-fg-disabled mx-auto mb-4 size-12" />
          <ModalTitle className="text-body mb-6 text-base font-normal">
            Are you sure you want to delete this product from your account?
          </ModalTitle>
          <div className="flex items-center justify-center gap-4">
            <ModalClose asChild>
              <Button variant="danger">Yes, I&apos;m sure</Button>
            </ModalClose>
            {/* Start on the safe choice: focus moves here when the modal opens. */}
            <ModalClose asChild>
              <Button variant="secondary" data-autofocus>
                No, cancel
              </Button>
            </ModalClose>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
