"use client";

import { useId } from "react";

import {
  Button,
  Checkbox,
  Input,
  Label,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@stefan-florescu/ui";

export default function ModalForm() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <Modal size="md">
      <ModalTrigger>Toggle modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Sign in to our platform</ModalTitle>
          <ModalClose label="Close modal" />
        </ModalHeader>
        <form className="pt-4 md:pt-6" onSubmit={(event) => event.preventDefault()}>
          <div className="mb-4">
            <Label htmlFor={`${id}-email`}>Your email</Label>
            <Input id={`${id}-email`} type="email" placeholder="example@company.com" required />
          </div>
          <div>
            <Label htmlFor={`${id}-password`}>Your password</Label>
            <Input id={`${id}-password`} type="password" placeholder="•••••••••" required />
          </div>
          <div className="my-6 flex items-start">
            <Checkbox id={`${id}-remember`} label="Remember me" />
            <a href="/" className="text-fg-brand ms-auto text-sm font-medium hover:underline">
              Lost Password?
            </a>
          </div>
          <Button type="submit" fullWidth className="mb-3">
            Login to your account
          </Button>
          <div className="text-body text-sm font-medium">
            Not registered?{" "}
            <a href="/" className="text-fg-brand hover:underline">
              Create account
            </a>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
}
