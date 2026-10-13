import type { Metadata } from "next";
import { Suspense } from "react";

import { PageShell } from "@/components/page-shell";
import { ProductDetail } from "@/components/product-detail";

export const metadata: Metadata = { title: "Product" };

export default function ProductPage() {
  return (
    <PageShell>
      {/* Reads ?id= from the address: one static page serves every product. */}
      <Suspense>
        <ProductDetail />
      </Suspense>
    </PageShell>
  );
}
