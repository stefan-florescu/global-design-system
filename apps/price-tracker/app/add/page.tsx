import type { Metadata } from "next";
import { Suspense } from "react";

import { AddProduct } from "@/components/add-product";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Add a product" };

export default function AddProductPage() {
  return (
    <PageShell>
      {/* Reads ?url= from the address, which a static page only knows in the browser. */}
      <Suspense>
        <AddProduct />
      </Suspense>
    </PageShell>
  );
}
