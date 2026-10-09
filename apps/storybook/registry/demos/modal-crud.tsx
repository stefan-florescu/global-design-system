"use client";

import { useId } from "react";

import { Plus } from "@stefan-florescu/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Select,
  Textarea,
  useModal,
} from "@stefan-florescu/ui";

function ProductForm() {
  const id = useId();
  const { setOpen } = useModal();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
    >
      <div className="grid grid-cols-2 gap-4 py-4 md:py-6">
        <div className="col-span-2">
          <Label htmlFor={`${id}-name`}>Name</Label>
          <Input id={`${id}-name`} name="name" placeholder="Type product name" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor={`${id}-price`}>Price</Label>
          <Input id={`${id}-price`} name="price" type="number" placeholder="$2999" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor={`${id}-category`}>Category</Label>
          <Select id={`${id}-category`} name="category" defaultValue="">
            <option value="">Select category</option>
            <option value="TV">TV/Monitors</option>
            <option value="PC">PC</option>
            <option value="GA">Gaming/Console</option>
            <option value="PH">Phones</option>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor={`${id}-description`}>Product Description</Label>
          <Textarea
            id={`${id}-description`}
            name="description"
            placeholder="Write product description here"
          />
        </div>
      </div>
      <div className="border-default flex items-center gap-4 border-t pt-4 md:pt-6">
        <Button type="submit">
          <Plus aria-hidden className="-ms-0.5" />
          Add new product
        </Button>
        <ModalClose asChild>
          <Button variant="secondary">Cancel</Button>
        </ModalClose>
      </div>
    </form>
  );
}

export default function ModalCrud() {
  return (
    <Modal size="md">
      <ModalTrigger>Toggle modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create new product</ModalTitle>
          <ModalClose label="Close modal" />
        </ModalHeader>
        <ProductForm />
      </ModalContent>
    </Modal>
  );
}
