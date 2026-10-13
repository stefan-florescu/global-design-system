"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  Plus,
  SquareArrowOutUpRight,
  Eye,
  ThumbsDown,
} from "@stefan-florescu/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  buttonVariants,
  cn,
} from "@stefan-florescu/ui";
import { useId, useState, type FormEvent, type ReactNode } from "react";

import { addManualOffer } from "@/lib/actions";
import { bestOffer } from "@/lib/changes";
import { countries } from "@/lib/countries";
import type { Availability, Offer, Product } from "@/lib/model";
import { checkProductUrl } from "@/lib/url";
import { useNow } from "@/lib/use-now";
import { dispatch } from "@/lib/use-tracker";
import { formatPercent, money, timeAgo } from "@/lib/view";

import { AvailabilityBadge, CheckErrorBadge, StaleBadge } from "./badges";

type SortKey = "price" | "availability" | "name";
type Sort = { key: SortKey; direction: "ascending" | "descending" };

const availabilityOrder: Record<Availability, number> = {
  in_stock: 0,
  preorder: 1,
  unknown: 2,
  out_of_stock: 3,
};

function compare(a: Offer, b: Offer, key: SortKey): number {
  switch (key) {
    case "price":
      return (a.currentPrice ?? Infinity) - (b.currentPrice ?? Infinity);
    case "availability":
      return (
        availabilityOrder[a.availability] - availabilityOrder[b.availability] ||
        compare(a, b, "price")
      );
    case "name":
      return a.storeName.localeCompare(b.storeName);
  }
}

function SortHeader({
  label,
  sortKey,
  sort,
  onSort,
  className,
}: {
  label: string;
  sortKey: SortKey;
  sort: Sort;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const active = sort.key === sortKey;
  const Icon = !active ? ArrowUpDown : sort.direction === "ascending" ? ArrowUp : ArrowDown;
  return (
    <TableHeadCell aria-sort={active ? sort.direction : undefined} className={className}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="focus-visible:outline-brand hover:text-heading -mx-1 inline-flex items-center gap-1 rounded-sm px-1 uppercase focus-visible:outline-2"
      >
        {label}
        <Icon aria-hidden className={cn("size-3.5", !active && "opacity-60")} />
      </button>
    </TableHeadCell>
  );
}

function StoreLink({ offer, children }: { offer: Offer; children: ReactNode }) {
  return (
    <a
      href={offer.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={buttonVariants({ variant: "secondary", size: "xs" })}
    >
      {children}
      <SquareArrowOutUpRight aria-hidden />
      <span className="sr-only"> at {offer.storeName} (opens in a new tab)</span>
    </a>
  );
}

/** Every store selling the product, sortable, with possible matches to confirm (plan screen 6). */
export function OffersTable({ product, offers }: { product: Product; offers: Offer[] }) {
  const [sort, setSort] = useState<Sort>({ key: "price", direction: "ascending" });
  const [adding, setAdding] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const now = useNow();

  const accepted = offers.filter((o) => o.status === "accepted");
  const possible = offers.filter((o) => o.status === "possible");
  const rejected = offers.filter((o) => o.status === "rejected");
  const best = bestOffer(offers);

  const sorted = [...accepted].sort((a, b) => {
    const result = compare(a, b, sort.key);
    return sort.direction === "ascending" ? result : -result;
  });

  const onSort = (key: SortKey) =>
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "ascending" ? "descending" : "ascending",
    }));

  const setStatus = (offer: Offer, status: Offer["status"], message: string) => {
    dispatch({ type: "setOfferStatus", offerId: offer.id, status });
    setAnnouncement(message);
  };

  return (
    <section aria-labelledby="offers-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="offers-heading" className="text-heading text-xl font-semibold">
            Stores
          </h2>
          <p className="text-body text-sm">
            {accepted.length} {accepted.length === 1 ? "store sells" : "stores sell"} this product
            in {countries[product.country].name}.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setAdding(true)}>
          <Plus aria-hidden />
          Add a store link
        </Button>
      </div>

      <Table hoverable containerClassName="overflow-x-auto">
        <TableCaption className="sr-only">
          Stores selling {product.title}, sorted by {sort.key} ({sort.direction})
        </TableCaption>
        <TableHead>
          <TableRow>
            <SortHeader label="Store" sortKey="name" sort={sort} onSort={onSort} />
            <SortHeader label="Price" sortKey="price" sort={sort} onSort={onSort} />
            <SortHeader label="Availability" sortKey="availability" sort={sort} onSort={onSort} />
            <TableHeadCell>Checked</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Actions</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((offer) => {
            const diff =
              best?.currentPrice && offer.currentPrice !== null && offer.id !== best.id
                ? (offer.currentPrice - best.currentPrice) / best.currentPrice
                : null;
            return (
              <TableRow key={offer.id}>
                <TableHeadCell
                  scope="row"
                  className="text-heading font-medium whitespace-nowrap normal-case"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {offer.storeName}
                    {offer.id === best?.id ? <Badge variant="success">Best price</Badge> : null}
                    {offer.manual ? <Badge variant="gray">Added by you</Badge> : null}
                    {offer.stale ? <StaleBadge /> : <CheckErrorBadge error={offer.lastError} />}
                  </div>
                </TableHeadCell>
                <TableCell className="whitespace-nowrap">
                  <span className="text-heading font-semibold tabular-nums">
                    {money(product, offer.currentPrice)}
                  </span>
                  {diff !== null && diff > 0 ? (
                    <span className="text-body-subtle ms-2 text-xs">{formatPercent(diff)}</span>
                  ) : null}
                </TableCell>
                <TableCell>
                  <AvailabilityBadge availability={offer.availability} />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {timeAgo(offer.lastCheckedAt, now)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <StoreLink offer={offer}>Visit</StoreLink>
                    {offers.length > 1 ? (
                      <Button
                        variant="ghost"
                        size="xs"
                        iconOnly
                        aria-label={`Not the same product at ${offer.storeName}`}
                        title="Not the same product"
                        onClick={() =>
                          setStatus(
                            offer,
                            "rejected",
                            `${offer.storeName} hidden: not the same product.`,
                          )
                        }
                      >
                        <ThumbsDown aria-hidden />
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {possible.length > 0 || rejected.length > 0 ? (
        <Accordion multiple flush>
          {possible.length > 0 ? (
            <AccordionItem value="possible">
              <AccordionTrigger>
                Possible matches ({possible.length}) — check these are the same product
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-3">
                  {possible.map((offer) => (
                    <li
                      key={offer.id}
                      className="rounded-base border-default flex flex-col gap-3 border p-3 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className="text-heading font-medium">{offer.storeName}</p>
                        <p className="text-body text-sm break-words">“{offer.title}”</p>
                        <p className="text-body-subtle text-xs">
                          {money(product, offer.currentPrice)} ·{" "}
                          {Math.round(offer.matchConfidence * 100)}% match
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <StoreLink offer={offer}>View</StoreLink>
                        <Button
                          size="xs"
                          onClick={() =>
                            setStatus(offer, "accepted", `${offer.storeName} added to the stores.`)
                          }
                        >
                          <Check aria-hidden />
                          Same product
                        </Button>
                        <Button
                          variant="secondary"
                          size="xs"
                          onClick={() =>
                            setStatus(
                              offer,
                              "rejected",
                              `${offer.storeName} hidden: not the same product.`,
                            )
                          }
                        >
                          <ThumbsDown aria-hidden />
                          Not the same
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ) : null}
          {rejected.length > 0 ? (
            <AccordionItem value="rejected">
              <AccordionTrigger>Hidden stores ({rejected.length})</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2">
                  {rejected.map((offer) => (
                    <li
                      key={offer.id}
                      className="flex flex-wrap items-center justify-between gap-2"
                    >
                      <span className="text-body text-sm">
                        <span className="text-heading font-medium">{offer.storeName}</span> · “
                        {offer.title}”
                      </span>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() =>
                          setStatus(offer, "accepted", `${offer.storeName} shown again.`)
                        }
                      >
                        <Eye aria-hidden />
                        Show again
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ) : null}
        </Accordion>
      ) : null}

      <AddStoreModal
        product={product}
        open={adding}
        onOpenChange={setAdding}
        onAdded={(message) => setAnnouncement(message)}
      />
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </section>
  );
}

function AddStoreModal({
  product,
  open,
  onOpenChange,
  onAdded,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: (message: string) => void;
}) {
  const inputId = useId();
  const errorId = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const check = checkProductUrl(value);
    if (!check.ok) {
      setError(check.error);
      return;
    }
    setBusy(true);
    const failure = await addManualOffer(product, check.url);
    setBusy(false);
    if (failure) {
      setError(failure);
      return;
    }
    onAdded(`${check.url.hostname.replace(/^www\./, "")} added to the stores.`);
    setValue("");
    setError(null);
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) setError(null);
        onOpenChange(next);
      }}
      size="lg"
    >
      <ModalContent>
        <form onSubmit={submit} noValidate>
          <ModalHeader>
            <ModalTitle>Add a store link</ModalTitle>
            <ModalClose label="Close" />
          </ModalHeader>
          <ModalBody className="flex flex-col gap-2">
            <p className="text-body">
              Know a store we missed? Paste the link to this product on its page and we&apos;ll
              track its price too.
            </p>
            <Label htmlFor={inputId}>Store link</Label>
            <Input
              id={inputId}
              type="url"
              inputMode="url"
              placeholder="https://"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              invalid={error !== null}
              aria-describedby={error ? errorId : undefined}
              data-autofocus
            />
            {error ? (
              <HelperText id={errorId} variant="danger">
                {error}
              </HelperText>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button type="submit" loading={busy}>
              Add store
            </Button>
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
