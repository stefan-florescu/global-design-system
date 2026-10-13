"use client";

import { Plus } from "@stefan-florescu/icons";
import { Button, Checkbox, Fieldset, HelperText, Input, Label } from "@stefan-florescu/ui";
import { useId, useState, type KeyboardEvent } from "react";

import { countries, hostMatches, type CountryCode } from "@/lib/countries";
import { parseStoreInput, type StoreChoice } from "@/lib/store-choice";

export type StorePickerProps = {
  country: CountryCode;
  /** Every store the user can pick. */
  options: StoreChoice[];
  /** Domains of the ticked stores. */
  selected: string[];
  /** The store the pasted link is from: always tracked, so shown ticked and locked. */
  source: StoreChoice;
  /** Whether the ticks come from the user's last product. */
  remembered: boolean;
  onChange: (selected: string[]) => void;
  /** A website the user typed in; it is added to the list, ticked. */
  onAdd: (store: StoreChoice) => void;
};

/** Ticks the websites to search for the product, with a field to add one (decision D1). */
export function StorePicker({
  country,
  options,
  selected,
  source,
  remembered,
  onChange,
  onAdd,
}: StorePickerProps) {
  const inputId = useId();
  const helpId = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const choices = options.filter((store) => !hostMatches(source.domain, store.domain));

  const add = () => {
    const parsed = parseStoreInput(value);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    if (hostMatches(parsed.store.domain, source.domain)) {
      setError(`${source.name} is where your link is from, so it's already tracked.`);
      return;
    }
    const known = choices.find((store) => hostMatches(parsed.store.domain, store.domain));
    if (known) {
      if (!selected.includes(known.domain)) onChange([...selected, known.domain]);
    } else {
      onAdd(parsed.store);
    }
    setValue("");
    setError(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      add();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Fieldset
        legend={`Websites to search in ${countries[country].name}`}
        contentClassName="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Checkbox label={source.name} description="Your link" checked disabled readOnly />
        {choices.map((store) => (
          <Checkbox
            key={store.domain}
            label={store.name}
            description={store.name === store.domain ? "Added by you" : store.domain}
            checked={selected.includes(store.domain)}
            onChange={(event) =>
              onChange(
                event.target.checked
                  ? [...selected, store.domain]
                  : selected.filter((domain) => domain !== store.domain),
              )
            }
          />
        ))}
      </Fieldset>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="xs"
          onClick={() => onChange(choices.map((store) => store.domain))}
        >
          Select all
        </Button>
        <Button variant="secondary" size="xs" onClick={() => onChange([])}>
          Clear
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={inputId}>Add a website</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={inputId}
            inputMode="url"
            autoComplete="off"
            placeholder="shop.ro"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            invalid={error !== null}
            aria-describedby={helpId}
          />
          <Button variant="secondary" onClick={add}>
            <Plus aria-hidden />
            Add
          </Button>
        </div>
        <HelperText id={helpId} variant={error ? "danger" : undefined}>
          {error ??
            (remembered
              ? "Ticked as you chose for your last product. Your choice is remembered for the next one."
              : "Your choice is remembered and suggested for your next product.")}
        </HelperText>
      </div>
    </div>
  );
}
