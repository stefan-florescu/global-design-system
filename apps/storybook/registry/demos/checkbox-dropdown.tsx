"use client";

import { Search, UserMinus } from "@stefan-florescu/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  Input,
} from "@stefan-florescu/ui";
import { useId, useState } from "react";

const users = [
  "Bonnie Green",
  "Jese Leos",
  "Michael Gough",
  "Robert Wall",
  "Joseph Mcfall",
  "Leslie Livingston",
  "Roberta Casas",
];

export default function CheckboxDropdown() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const [query, setQuery] = useState("");
  // Kept here, so a choice survives while the search hides its row.
  const [checked, setChecked] = useState<string[]>(["Jese Leos"]);
  const matches = users.filter((user) => user.toLowerCase().includes(query.toLowerCase()));

  return (
    <Dropdown>
      <DropdownTrigger>Dropdown search</DropdownTrigger>
      {/* Holds a search field and checkboxes, so a dialog: focus moves to the search field. */}
      <DropdownContent role="dialog" aria-label="Users" className="w-60 p-0">
        <div className="px-2 pt-2">
          <Input
            type="search"
            aria-label="Search user"
            placeholder="Search user"
            startIcon={<Search />}
            className="rounded"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <ul className="h-48 overflow-y-auto p-2 select-none">
          {matches.map((user) => (
            <li key={user}>
              <Checkbox
                id={`${id}-${users.indexOf(user)}`}
                label={user}
                checked={checked.includes(user)}
                onChange={(event) =>
                  setChecked((current) =>
                    event.target.checked
                      ? [...current, user]
                      : current.filter((name) => name !== user),
                  )
                }
                className="hover:bg-neutral-tertiary-medium w-full rounded-md p-2 [&_label]:w-full"
              />
            </li>
          ))}
          {matches.length === 0 ? <li className="p-2">No users found.</li> : null}
        </ul>
        <div className="p-2">
          <Button variant="danger" size="xs" fullWidth className="rounded">
            <UserMinus aria-hidden className="size-4" />
            Delete user
          </Button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
