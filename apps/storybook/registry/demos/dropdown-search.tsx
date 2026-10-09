"use client";

import { Trash2 } from "@stefan-florescu/icons";
import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  Input,
} from "@stefan-florescu/ui";
import { useId, useState } from "react";

const users = [
  { name: "Jese Leos", avatar: "/avatars/1.svg" },
  { name: "Robert Gough", avatar: "/avatars/2.svg" },
  { name: "Bonnie Green", avatar: "/avatars/3.svg" },
  { name: "Leslie Livingston", avatar: "/avatars/4.svg" },
  { name: "Michael Gough", avatar: "/avatars/5.svg" },
  { name: "Joseph Mcfall", avatar: "/avatars/2.svg" },
  { name: "Roberta Casas", avatar: "/avatars/3.svg" },
  { name: "Neil Sims", avatar: "/avatars/1.svg" },
];

export default function DropdownSearch() {
  const id = useId();
  const [query, setQuery] = useState("");
  const matches = users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <Dropdown>
      <DropdownTrigger>Dropdown button</DropdownTrigger>
      {/* Holds a text field, so a dialog: focus moves to the search field when it opens. */}
      <DropdownContent role="dialog" aria-label="Users" className="w-54 p-0">
        <div className="rounded-t-base border-default-medium border-b p-2">
          <Input
            type="search"
            size="sm"
            aria-label="Search for users"
            placeholder="Search for users"
            className="rounded"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <ul className="h-48 overflow-y-auto p-2">
          {matches.map((user, index) => (
            <li
              key={user.name}
              className="hover:bg-neutral-tertiary-medium hover:text-heading flex w-full items-center rounded p-2"
            >
              <label
                htmlFor={`${id}-${index}`}
                className="flex w-full items-center justify-between"
              >
                <span className="inline-flex items-center gap-2 font-medium">
                  <Avatar src={user.avatar} alt="" size="2xs" className="size-5" />
                  {user.name}
                </span>
                <Checkbox id={`${id}-${index}`} />
              </label>
            </li>
          ))}
          {matches.length === 0 ? <li className="p-2">No users found.</li> : null}
        </ul>
        <div className="rounded-b-base border-default-medium border-t p-2">
          <Button variant="danger" size="xs" fullWidth className="rounded">
            <Trash2 aria-hidden className="-ms-0.5 size-3.5" />
            Delete user
          </Button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
