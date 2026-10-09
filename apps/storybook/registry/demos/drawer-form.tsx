"use client";

import { CalendarPlus, UserPlus } from "@stefan-florescu/icons";
import {
  Avatar,
  AvatarGroup,
  Button,
  Datepicker,
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

export default function DrawerForm() {
  const id = useId();

  return (
    <Drawer>
      <DrawerTrigger>Show drawer form</DrawerTrigger>
      <DrawerContent className="w-80">
        <DrawerHeader>
          <DrawerTitle>New event</DrawerTitle>
          <DrawerClose label="Close event form" />
        </DrawerHeader>
        <form className="mb-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div>
            <Label htmlFor={`${id}-title`} required>
              Title
            </Label>
            <Input id={`${id}-title`} placeholder="Apple Keynote" required />
          </div>
          <div>
            <Label htmlFor={`${id}-description`}>Description</Label>
            <Textarea id={`${id}-description`} placeholder="Write your description here..." />
          </div>
          <Datepicker label="Event date" placeholder="Select date" className="max-w-sm" />
          <div>
            <Label htmlFor={`${id}-guests`} className="sr-only">
              Invite guests
            </Label>
            <div className="relative">
              <Input
                id={`${id}-guests`}
                type="email"
                placeholder="Add guest email"
                className="pe-20"
              />
              <Button
                variant="secondary"
                size="xs"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 rounded"
              >
                <UserPlus aria-hidden />
                Add
              </Button>
            </div>
          </div>
          <AvatarGroup>
            <Avatar src="/avatars/1.svg" alt="Jese Leos" size="sm" stacked />
            <Avatar src="/avatars/2.svg" alt="Roberta Casas" size="sm" stacked />
            <Avatar src="/avatars/3.svg" alt="Bonnie Green" size="sm" stacked />
            <Avatar src="/avatars/4.svg" alt="Michael Gough" size="sm" stacked />
          </AvatarGroup>
          <Button type="submit" fullWidth>
            <CalendarPlus aria-hidden />
            Create event
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
