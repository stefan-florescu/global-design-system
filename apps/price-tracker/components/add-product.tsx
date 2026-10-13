"use client";

import { Check, CircleAlert, Link as LinkIcon, Search, Store } from "@stefan-florescu/icons";
import {
  Alert,
  Badge,
  Button,
  Card,
  HelperText,
  Input,
  Label,
  Select,
  Stepper,
  StepperItem,
  buttonVariants,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { addProduct, canAddMore, findTracked } from "@/lib/actions";
import { countries, countryCodes, isCountryCode, type CountryCode } from "@/lib/countries";
import type { RankedCandidate } from "@/lib/discovery";
import type { ProductIdentity } from "@/lib/model";
import { formatPrice } from "@/lib/price";
import { priceSource, type IdentifyResult } from "@/lib/source";
import { maxWatchedProducts } from "@/lib/tracker";
import { checkProductUrl } from "@/lib/url";
import { getState, useTracker } from "@/lib/use-tracker";

import { AvailabilityBadge } from "./badges";
import { DemoNotice } from "./demo-notice";
import { PageHeading } from "./page-shell";
import { ProductImage } from "./product-image";

type Phase =
  | { step: "form" }
  | { step: "identifying"; url: URL }
  | {
      step: "searching" | "confirm";
      url: URL;
      identified: IdentifyResult;
      identity: ProductIdentity;
      country: CountryCode;
      candidates: RankedCandidate[];
    };

const countrySources = {
  store: "from the store",
  domain: "from the web address",
  currency: "from the currency",
  language: "from the page language",
  default: "our launch country",
} as const;

/** Paste a link → identify → search other stores → confirm (plan screens 4 and 5). */
export function AddProduct() {
  const router = useRouter();
  const params = useSearchParams();
  const { state } = useTracker();
  const inputId = useId();
  const errorId = useId();
  const [value, setValue] = useState(params.get("url") ?? "");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>({ step: "form" });
  const [status, setStatus] = useState("");
  // Ignores results from a search the user has since replaced.
  const run = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const search = async (
    url: URL,
    identified: IdentifyResult,
    identity: ProductIdentity,
    country: CountryCode,
  ) => {
    const id = ++run.current;
    setPhase({ step: "searching", url, identified, identity, country, candidates: [] });
    setStatus(
      `Searching ${countries[country].stores.length} stores in ${countries[country].name}…`,
    );
    const candidates = await priceSource.discover(
      { ...identity, price: identified.snapshot.price },
      country,
      identified.store.domain,
    );
    if (id !== run.current) return;
    setPhase({ step: "confirm", url, identified, identity, country, candidates });
    const accepted = candidates.filter((c) => c.match.decision === "accept").length;
    setStatus(
      `Found ${accepted + 1} offers${candidates.length > accepted ? ` and ${candidates.length - accepted} possible ${candidates.length - accepted === 1 ? "match" : "matches"}` : ""}.`,
    );
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const start = async (input: string) => {
    const check = checkProductUrl(input);
    if (!check.ok) {
      setError(check.error);
      return;
    }
    setError(null);
    const id = ++run.current;
    setPhase({ step: "identifying", url: check.url });
    setStatus("Identifying product…");
    try {
      const identified = await priceSource.identify(check.url);
      if (id !== run.current) return;
      await search(check.url, identified, identified.identity, identified.identity.country);
    } catch (caught) {
      if (id !== run.current) return;
      setPhase({ step: "form" });
      setStatus("");
      setError(caught instanceof Error ? caught.message : "Something went wrong. Try again.");
    }
  };

  // Example links from the watchlist start straight away.
  const started = useRef(false);
  useEffect(() => {
    const url = params.get("url");
    if (url && !started.current) {
      started.current = true;
      void start(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, on arrival
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void start(value);
  };

  const reset = () => {
    run.current++;
    setPhase({ step: "form" });
    setStatus("");
  };

  const full = state !== null && !canAddMore(state);

  return (
    <>
      <PageHeading
        title="Add a product"
        description="Paste the link to a product page. We identify the product and find it in other stores in the same country."
      />
      <DemoNotice />

      {full ? (
        <Alert variant="warning" icon={<CircleAlert />}>
          You&apos;re tracking {maxWatchedProducts} products, the most the free plan allows. Remove
          one from your watchlist to add another.
        </Alert>
      ) : null}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
        <Label htmlFor={inputId}>Product link</Label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id={inputId}
            type="url"
            inputMode="url"
            size="lg"
            autoComplete="off"
            placeholder="https://www.emag.ro/…"
            startIcon={<LinkIcon />}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            invalid={error !== null}
            aria-describedby={error ? errorId : undefined}
            disabled={full}
          />
          <Button
            type="submit"
            size="lg"
            loading={phase.step === "identifying" || phase.step === "searching"}
            disabled={full}
          >
            <Search aria-hidden />
            Find product
          </Button>
        </div>
        {error ? (
          <HelperText id={errorId} variant="danger">
            {error}
          </HelperText>
        ) : (
          <HelperText>
            Works with links from any online store; Romanian stores have the best coverage.
          </HelperText>
        )}
      </form>

      <div role="status" aria-live="polite" className="sr-only">
        {status}
      </div>

      {phase.step !== "form" ? (
        <Card className="*:flex *:flex-col *:gap-6">
          <Stepper aria-label="Progress">
            <StepperItem status={phase.step === "identifying" ? "current" : "complete"}>
              Identify product
            </StepperItem>
            <StepperItem
              status={
                phase.step === "identifying"
                  ? "upcoming"
                  : phase.step === "searching"
                    ? "current"
                    : "complete"
              }
            >
              Search stores
            </StepperItem>
            <StepperItem status={phase.step === "confirm" ? "current" : "upcoming"}>
              Confirm
            </StepperItem>
          </Stepper>
          <p className="text-heading font-medium" aria-hidden>
            {status}
          </p>

          {phase.step === "searching" || phase.step === "confirm" ? (
            <ConfirmMatch
              phase={phase}
              headingRef={headingRef}
              onVariant={(identity) =>
                void search(phase.url, phase.identified, identity, phase.country)
              }
              onCountry={(country) =>
                void search(phase.url, phase.identified, { ...phase.identity, country }, country)
              }
              onCancel={reset}
              onConfirm={() => {
                const tracked = findTracked(getState(), phase.identity, phase.url);
                const id = tracked
                  ? tracked.id
                  : addProduct({
                      url: phase.url,
                      identified: phase.identified,
                      identity: phase.identity,
                      country: phase.country,
                      candidates: phase.candidates,
                    });
                router.push(`/product?id=${encodeURIComponent(id)}`);
              }}
            />
          ) : null}
        </Card>
      ) : null}
    </>
  );
}

function ConfirmMatch({
  phase,
  headingRef,
  onVariant,
  onCountry,
  onCancel,
  onConfirm,
}: {
  phase: Extract<Phase, { step: "searching" | "confirm" }>;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onVariant: (identity: ProductIdentity) => void;
  onCountry: (country: CountryCode) => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { identified, identity, country, candidates } = phase;
  const { state } = useTracker();
  const variantId = useId();
  const countryId = useId();
  const tracked = state ? findTracked(state, identity, phase.url) : undefined;
  const searching = phase.step === "searching";
  const currency = countries[country].currency;
  const locale = countries[country].locale;
  const accepted = candidates.filter((c) => c.match.decision === "accept");
  const possible = candidates.filter((c) => c.match.decision === "possible");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <ProductImage src={identity.imageUrl} className="size-24" />
        <div className="flex min-w-0 flex-col gap-2">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-heading text-xl font-semibold focus:outline-none"
          >
            Is this your product?
          </h2>
          <p className="text-heading text-lg break-words">{identity.title}</p>
          <dl className="text-body grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {identity.brand ? (
              <>
                <dt>Brand</dt>
                <dd className="text-heading">{identity.brand}</dd>
              </>
            ) : null}
            {identity.model ? (
              <>
                <dt>Model</dt>
                <dd className="text-heading">{identity.model}</dd>
              </>
            ) : null}
            {identity.gtin ? (
              <>
                <dt>EAN</dt>
                <dd className="text-heading font-mono">{identity.gtin}</dd>
              </>
            ) : null}
            <dt>At {identified.store.name}</dt>
            <dd className="text-heading flex flex-wrap items-center gap-2">
              {formatPrice(identified.snapshot.price, currency, locale)}
              <AvailabilityBadge availability={identified.snapshot.availability} />
            </dd>
          </dl>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {phase.identified.variants.length > 1 ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor={variantId}>Variant</Label>
            <Select
              id={variantId}
              value={identity.variant.storage ?? ""}
              disabled={searching}
              onChange={(event) => {
                const next = phase.identified.variants.find((v) => v.label === event.target.value);
                if (next) onVariant({ ...next.identity, country });
              }}
            >
              {phase.identified.variants.map((v) => (
                <option key={v.label} value={v.label}>
                  {v.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <Label htmlFor={countryId}>Compare prices in</Label>
          <Select
            id={countryId}
            value={country}
            disabled={searching}
            aria-describedby={`${countryId}-help`}
            onChange={(event) => {
              if (isCountryCode(event.target.value)) onCountry(event.target.value);
            }}
          >
            {countryCodes.map((code) => (
              <option key={code} value={code}>
                {countries[code].name}
              </option>
            ))}
          </Select>
          <HelperText id={`${countryId}-help`}>
            {country === identified.countryGuess.country
              ? `Detected ${countrySources[identified.countryGuess.source]}.`
              : "Changed by you."}
          </HelperText>
        </div>
      </div>

      {searching ? null : (
        <div className="flex flex-col gap-3">
          <h3 className="text-heading font-semibold">
            {accepted.length + 1} {accepted.length === 0 ? "store" : "stores"} sell it
            {possible.length > 0 ? `, ${possible.length} more to check` : ""}
          </h3>
          {candidates.length === 0 ? (
            <p className="text-body text-sm">
              No other stores in {countries[country].name} were found. We&apos;ll keep tracking{" "}
              {identified.store.name}, and you can add other stores&apos; links from the product
              page.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              <li>
                <Badge variant="alternative" size="lg" bordered>
                  <Store aria-hidden />
                  {identified.store.name}
                </Badge>
              </li>
              {candidates.map((c) => (
                <li key={c.url}>
                  <Badge
                    variant={c.match.decision === "accept" ? "alternative" : "warning"}
                    size="lg"
                    bordered
                  >
                    <Store aria-hidden />
                    {storeName(c.domain, country)}
                    {c.match.decision === "possible" ? <span> · possible match</span> : null}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tracked ? (
        <Alert variant="brand">
          You already track this product.{" "}
          <Link
            href={`/product?id=${encodeURIComponent(tracked.id)}`}
            className="font-medium underline"
          >
            Open it
          </Link>
        </Alert>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onConfirm}
          disabled={searching || (!tracked && state !== null && !canAddMore(state))}
        >
          <Check aria-hidden />
          {tracked ? "Open product" : "Yes, track it"}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          No, try another link
        </Button>
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          Cancel
        </Link>
      </div>
    </div>
  );
}

function storeName(domain: string, country: CountryCode) {
  return countries[country].stores.find((s) => s.domain === domain)?.name ?? domain;
}
