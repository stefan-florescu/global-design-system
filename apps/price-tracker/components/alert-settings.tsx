"use client";

import { Bell } from "@stefan-florescu/icons";
import { Button, Card, HelperText, Label, NumberInput, Toggle } from "@stefan-florescu/ui";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

import { countries } from "@/lib/countries";
import type { Product, Watch } from "@/lib/model";
import { dispatch } from "@/lib/use-tracker";
import { money } from "@/lib/view";

/** A product's alert preferences, edited in place (plan screen 6, T6.5). */
export function AlertSettings({
  product,
  watch,
  bestPrice,
}: {
  product: Product;
  watch: Watch;
  bestPrice: number | null;
}) {
  const targetId = useId();
  const helpId = useId();
  const [target, setTarget] = useState<number | null>(watch.targetPrice);
  const [saved, setSaved] = useState("");
  const currency = countries[product.country].currency;

  const update = (patch: Partial<Watch>, message: string) => {
    dispatch({ type: "updateWatch", productId: product.id, patch });
    setSaved(message);
  };

  const saveTarget = (event: FormEvent) => {
    event.preventDefault();
    update(
      { targetPrice: target },
      target === null
        ? "Target price removed."
        : `We'll alert you at ${money(product, target)} or less.`,
    );
  };

  return (
    <Card className="*:flex *:flex-col *:gap-5 *:p-5">
      <div className="flex items-center gap-2">
        <Bell aria-hidden className="text-fg-brand size-5" />
        <h2 className="text-heading text-lg font-semibold">Alerts</h2>
      </div>

      <form onSubmit={saveTarget} className="flex flex-col gap-2">
        <Label htmlFor={targetId}>Target price</Label>
        <div className="flex gap-2">
          <NumberInput
            id={targetId}
            min={0}
            step={1}
            value={target}
            onValueChange={setTarget}
            addon={currency}
            aria-describedby={helpId}
          />
          <Button type="submit" variant="secondary">
            Save
          </Button>
        </div>
        <HelperText id={helpId}>
          {bestPrice !== null
            ? `Alert me when the best price is at or below this. It's ${money(product, bestPrice)} now.`
            : "Alert me when the best price is at or below this."}
        </HelperText>
      </form>

      <div className="flex flex-col gap-4">
        <Toggle
          label="Price drops"
          description="Any store lowers its price."
          checked={watch.notifyOnDrop}
          disabled={!watch.active}
          onChange={(event) =>
            update(
              { notifyOnDrop: event.target.checked },
              `Price drop alerts ${event.target.checked ? "on" : "off"}.`,
            )
          }
        />
        <Toggle
          label="Stock changes"
          description="A store sells out, or has it back in stock."
          checked={watch.notifyOnStock}
          disabled={!watch.active}
          onChange={(event) =>
            update(
              { notifyOnStock: event.target.checked },
              `Stock alerts ${event.target.checked ? "on" : "off"}.`,
            )
          }
        />
        <Toggle
          label="Pause all alerts"
          description="Prices are still checked and recorded."
          checked={!watch.active}
          onChange={(event) =>
            update(
              { active: !event.target.checked },
              event.target.checked ? "Alerts paused." : "Alerts on.",
            )
          }
        />
      </div>

      <p className="text-body text-sm">
        Alerts show under{" "}
        <Link href="/notifications" className="text-fg-brand font-medium underline">
          Alerts
        </Link>
        . Email delivery is set up in{" "}
        <Link href="/settings" className="text-fg-brand font-medium underline">
          Settings
        </Link>
        .
      </p>
      <div role="status" aria-live="polite" className="sr-only">
        {saved}
      </div>
    </Card>
  );
}
