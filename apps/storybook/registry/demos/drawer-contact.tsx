"use client";

import { Contact, Mail } from "@stefan-florescu/icons";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
  Textarea,
} from "@stefan-florescu/ui";
import { useId } from "react";

export default function DrawerContact() {
  const id = useId();

  return (
    <Drawer>
      <DrawerTrigger>Show contact form</DrawerTrigger>
      <DrawerContent className="w-80">
        <DrawerHeader>
          <DrawerTitle>
            <Contact aria-hidden />
            Contact us
          </DrawerTitle>
          <DrawerClose label="Close contact form" />
        </DrawerHeader>
        <form className="mb-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div>
            <Label htmlFor={`${id}-email`} required>
              Your email
            </Label>
            <Input
              id={`${id}-email`}
              type="email"
              placeholder="name@company.com"
              startIcon={<Mail />}
              required
            />
          </div>
          <div>
            <Label htmlFor={`${id}-subject`} required>
              Subject
            </Label>
            <Input
              id={`${id}-subject`}
              placeholder="Let us know how we can help you"
              startIcon={<Mail />}
              required
            />
          </div>
          <div>
            <Label htmlFor={`${id}-message`}>Your message</Label>
            <Textarea id={`${id}-message`} placeholder="Write your thoughts here..." />
          </div>
          <Button type="submit" fullWidth>
            Send message
          </Button>
        </form>
        <p className="text-body mb-2 text-sm">
          <a href="mailto:info@company.com" className="hover:underline">
            info@company.com
          </a>
        </p>
        <p className="text-body text-sm">
          <a href="tel:2124567890" className="hover:underline">
            212-456-7890
          </a>
        </p>
      </DrawerContent>
    </Drawer>
  );
}
