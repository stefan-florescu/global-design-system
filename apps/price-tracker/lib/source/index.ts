import { createDemoSource } from "./demo";
import type { PriceSource } from "./types";

export * from "./types";

/** The source the app uses. Swap for the API client once the scraper worker is live. */
export const priceSource: PriceSource = createDemoSource();
