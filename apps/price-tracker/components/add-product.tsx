"use client";

import {
  ArrowLeft,
  Check,
  CircleAlert,
  Link as LinkIcon,
  Search,
  Store,
} from "@stefan-florescu/icons";
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
import {
  countries,
  countryCodes,
  hostMatches,
  isCountryCode,
  type CountryCode,
} from "@/lib/countries";
import type { RankedCandidate } from "@/lib/discovery";
import type { ProductIdentity } from "@/lib/model";
import { formatPrice } from "@/lib/price";
import { priceSource, type IdentifyResult } from "@/lib/source";
import { storeOptions, suggestedStores, type StoreChoice } from "@/lib/store-choice";
import { maxWatchedProducts } from "@/lib/tracker";
import { checkProductUrl } from "@/lib/url";
import { dispatch, getState, useTracker } from "@/lib/use-tracker";

import { AvailabilityBadge } from "./badges";
import { DemoNotice } from "./demo-notice";
import { PageHeading } from "./page-shell";
import { ProductImage } from "./product-image";
import { StorePicker } from "./store-picker";

/** The product as identified, and where to look for it. */
type Choice = {
  url: URL;
  identified: IdentifyResult;
  identity: ProductIdentity;
  country: CountryCode;
  /** Domains of the stores to search. */
  selected: string[];
  /** Websites typed in during this search, saved when it runs. */
  added: StoreChoice[];
  /** Whether `selected` came from the user's last product. */
  remembered: boolean;
};

type Phase =
  | { step: "form" }
  | { step: "identifying"; url: URL }
  | ({ step: "choose" } & Choice)
  | ({ step: "searching" | "confirm"; candidates: RankedCandidate[] } & Choice);

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

  /** The choose step for a country, with the stores suggested from the user's last choice. */
  const choose = (
    base: Pick<Choice, "url" | "identified" | "identity">,
    country: CountryCode,
  ): Phase => {
    const settings = getState().settings;
    return {
      step: "choose",
      ...base,
      identity: { ...base.identity, country },
      country,
      selected: suggestedStores(settings, country, base.identified.store.domain),
      added: [],
      remembered: settings.storeLists[country] !== undefined,
    };
  };

  const search = async (choice: Choice) => {
    const id = ++run.current;
    const { country, selected, added } = choice;
    const options = [...storeOptions(getState().settings, country), ...added];
    const stores = options.filter((store) => selected.includes(store.domain));
    // The link's own store counts as chosen too, so it is ticked for the next product.
    const source = choice.identified.store;
    const sourceKnown = options.some((store) => hostMatches(source.domain, store.domain));
    dispatch({
      type: "rememberStores",
      country,
      domains: [...selected, source.domain],
      added: sourceKnown ? added : [...added, { name: source.name, domain: source.domain }],
    });
    setPhase({ ...choice, step: "searching", candidates: [] });
    setStatus(
      `Searching ${stores.length} ${stores.length === 1 ? "website" : "websites"} in ${countries[country].name}…`,
    );
    const candidates =
      stores.length === 0
        ? []
        : await priceSource.discover(
            { ...choice.identity, price: choice.identified.snapshot.price },
            { country, stores, excludeDomain: choice.identified.store.domain },
          );
    if (id !== run.current) return;
    setPhase({ ...choice, step: "confirm", candidates });
    const accepted = candidates.filter((c) => c.match.decision === "accept").length;
    const possible = candidates.length - accepted;
    setStatus(
      `Found ${accepted + 1} ${accepted === 0 ? "offer" : "offers"}${possible > 0 ? ` and ${possible} possible ${possible === 1 ? "match" : "matches"}` : ""}.`,
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
      setPhase(
        choose(
          { url: check.url, identified, identity: identified.identity },
          identified.identity.country,
        ),
      );
      setStatus("Product found. Choose the websites to search.");
      requestAnimationFrame(() => headingRef.current?.focus());
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
            {steps.map((step, index) => (
              <StepperItem
                key={step.id}
                status={
                  index < stepIndex(phase.step)
                    ? "complete"
                    : index === stepIndex(phase.step)
                      ? "current"
                      : "upcoming"
                }
              >
                {step.label}
              </StepperItem>
            ))}
          </Stepper>
          <p className="text-heading font-medium" aria-hidden>
            {status}
          </p>

          {phase.step === "identifying" ? null : (
            <ConfirmMatch
              phase={phase}
              headingRef={headingRef}
              onChoice={(patch) => setPhase({ ...phase, ...patch, step: "choose" })}
              onCountry={(country) => setPhase(choose(phase, country))}
              onSearch={() => void search(phase)}
              onCancel={reset}
              onConfirm={() => {
                if (phase.step !== "confirm") return;
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
          )}
        </Card>
      ) : null}
    </>
  );
}

const steps = [
  { id: "identify", label: "Identify product" },
  { id: "choose", label: "Choose stores" },
  { id: "search", label: "Search" },
  { id: "confirm", label: "Confirm" },
] as const;

function stepIndex(step: Phase["step"]) {
  return { form: -1, identifying: 0, choose: 1, searching: 2, confirm: 3 }[step];
}

function ConfirmMatch({
  phase,
  headingRef,
  onChoice,
  onCountry,
  onSearch,
  onCancel,
  onConfirm,
}: {
  phase: Exclude<Phase, { step: "form" } | { step: "identifying" }>;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  /** Changes the variant or the stores, going back to the choose step. */
  onChoice: (patch: Partial<Choice>) => void;
  onCountry: (country: CountryCode) => void;
  onSearch: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { identified, identity, country } = phase;
  const { state } = useTracker();
  const variantId = useId();
  const countryId = useId();
  const tracked = state ? findTracked(state, identity, phase.url) : undefined;
  const choosing = phase.step === "choose";
  const searching = phase.step === "searching";
  const currency = countries[country].currency;
  const locale = countries[country].locale;
  const candidates = phase.step === "choose" ? [] : phase.candidates;
  const accepted = candidates.filter((c) => c.match.decision === "accept");
  const possible = candidates.filter((c) => c.match.decision === "possible");
  const options = state ? [...storeOptions(state.settings, country), ...phase.added] : [];
  const nameOf = (domain: string) =>
    options.find((store) => store.domain === domain)?.name ?? domain;

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
            {choosing ? "Is this your product?" : "Track this product?"}
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
        {identified.variants.length > 1 ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor={variantId}>Variant</Label>
            <Select
              id={variantId}
              value={identity.variant.storage ?? ""}
              disabled={searching}
              onChange={(event) => {
                const next = identified.variants.find((v) => v.label === event.target.value);
                if (next) onChoice({ identity: { ...next.identity, country } });
              }}
            >
              {identified.variants.map((v) => (
                <option key={v.label} value={v.label}>
                  {v.label}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <Label htmlFor={countryId}>Country</Label>
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
              ? `Detected ${countrySources[identified.countryGuess.source]}. Prices are compared in this country's stores.`
              : "Chosen by you. Prices are compared in this country's stores."}
          </HelperText>
        </div>
      </div>

      {choosing ? (
        <StorePicker
          country={country}
          options={options}
          selected={phase.selected}
          source={{ name: identified.store.name, domain: identified.store.domain }}
          remembered={phase.remembered}
          onChange={(selected) => onChoice({ selected })}
          onAdd={(store) =>
            onChoice({
              added: [...phase.added, store],
              selected: [...phase.selected, store.domain],
            })
          }
        />
      ) : searching ? null : (
        <div className="flex flex-col gap-3">
          <h3 className="text-heading font-semibold">
            {accepted.length + 1} {accepted.length === 0 ? "store sells" : "stores sell"} it
            {possible.length > 0 ? `, ${possible.length} more to check` : ""}
          </h3>
          {candidates.length === 0 ? (
            <p className="text-body text-sm">
              {phase.selected.length === 0
                ? `No other websites were searched. We'll track ${identified.store.name}; you can add other stores' links from the product page.`
                : `None of the websites you chose sells it. We'll track ${identified.store.name}; you can add other stores' links from the product page.`}
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
                    {nameOf(c.domain)}
                    {c.match.decision === "possible" ? <span> · possible match</span> : null}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          {phase.selected.length > candidates.length ? (
            <p className="text-body-subtle text-sm">
              Not found on:{" "}
              {phase.selected
                .filter((domain) => !candidates.some((c) => c.domain === domain))
                .map(nameOf)
                .join(", ")}
              .
            </p>
          ) : null}
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
        {choosing ? (
          <Button onClick={onSearch} disabled={Boolean(tracked)}>
            <Search aria-hidden />
            {phase.selected.length === 0
              ? "Continue without searching"
              : `Search ${phase.selected.length} ${phase.selected.length === 1 ? "website" : "websites"}`}
          </Button>
        ) : (
          <>
            <Button
              onClick={onConfirm}
              disabled={searching || (!tracked && state !== null && !canAddMore(state))}
            >
              <Check aria-hidden />
              {tracked ? "Open product" : "Yes, track it"}
            </Button>
            <Button variant="secondary" onClick={() => onChoice({})} disabled={searching}>
              <ArrowLeft aria-hidden />
              Change stores
            </Button>
          </>
        )}
        {tracked && choosing ? (
          <Link
            href={`/product?id=${encodeURIComponent(tracked.id)}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            Open product
          </Link>
        ) : null}
        <Button variant="ghost" onClick={onCancel}>
          No, try another link
        </Button>
      </div>
    </div>
  );
}
