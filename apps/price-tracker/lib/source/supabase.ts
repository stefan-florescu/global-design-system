"use client";

import { callFunction } from "../supabase";
import type { DiscoverResult, IdentifyResult, PriceSource } from "./types";

/*
 * The price-tracker Edge Function as a price source (ADR 0011): it reads real store pages. Price
 * checks of tracked products run on the server, by schedule or from "Check prices now".
 */
export const supabaseSource: PriceSource = {
  label: "Live prices",
  identify: (url) => callFunction<IdentifyResult>("identify", { url: url.href }),
  discover: (identity, { country, stores, excludeDomain }) =>
    callFunction<DiscoverResult>("discover", {
      identity,
      country,
      stores: stores.map((store) => store.domain),
      excludeDomain,
    }),
  check: () => Promise.reject(new Error("Signed-in prices are checked on the server.")),
};
