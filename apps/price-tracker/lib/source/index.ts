import { getSession } from "../session";

import { createDemoSource } from "./demo";
import { supabaseSource } from "./supabase";
import type { PriceSource } from "./types";

export * from "./types";

const demoSource = createDemoSource();

/** Live store pages when signed in, simulated prices in the demo. */
export function getPriceSource(): PriceSource {
  return getSession().mode === "account" ? supabaseSource : demoSource;
}

export { demoSource };
