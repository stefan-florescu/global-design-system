import { ArrowDownRight, ArrowRight, ArrowUpRight, Clock } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

import { availabilityLabels, type Availability } from "@/lib/model";
import { formatPercent, type Trend } from "@/lib/view";

const availabilityBadge = {
  in_stock: "success",
  preorder: "brand",
  out_of_stock: "danger",
  unknown: "gray",
} as const satisfies Record<Availability, string>;

export function AvailabilityBadge({ availability }: { availability: Availability }) {
  return (
    <Badge variant={availabilityBadge[availability]}>{availabilityLabels[availability]}</Badge>
  );
}

/** The best price against a week ago: down is good news, so it is green. */
export function TrendBadge({ trend }: { trend: Trend }) {
  if (trend.direction === "flat") {
    return (
      <Badge variant="gray">
        <ArrowRight aria-hidden />
        <span className="sr-only">Price </span>Unchanged
      </Badge>
    );
  }
  const down = trend.direction === "down";
  return (
    <Badge variant={down ? "success" : "danger"}>
      {down ? <ArrowDownRight aria-hidden /> : <ArrowUpRight aria-hidden />}
      <span className="sr-only">{down ? "Down" : "Up"} </span>
      {formatPercent(trend.change)}
      <span className="sr-only"> in 7 days</span>
    </Badge>
  );
}

/** Why the last check of a store failed, when the store refused or didn't answer. */
export function CheckErrorBadge({ error }: { error?: string }) {
  if (!error || error === "anomaly") return null;
  const text =
    error === "blocked"
      ? "Blocks price checks"
      : error === "not_found"
        ? "Page gone"
        : "Not reachable";
  return (
    <Badge
      variant="warning"
      title="The last price check of this store failed; the price shown is the last one we read."
    >
      <Clock aria-hidden />
      {text}
    </Badge>
  );
}

export function StaleBadge() {
  return (
    <Badge variant="warning">
      <Clock aria-hidden />
      Needs review
    </Badge>
  );
}
