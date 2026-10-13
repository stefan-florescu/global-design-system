import { Info } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";

import { priceSource } from "@/lib/source";

/**
 * Says that prices are simulated, so nobody mistakes them for a store's real prices. Remove once
 * the scraper worker backs `priceSource`.
 */
export function DemoNotice() {
  return (
    <Alert variant="dark" role="note" icon={<Info />}>
      <span className="font-medium">{priceSource.label}:</span> the product name comes from the link
      you paste, but prices, stock and other stores are simulated until the price-checking service
      is connected. Your watchlist is saved in this browser only.
    </Alert>
  );
}
