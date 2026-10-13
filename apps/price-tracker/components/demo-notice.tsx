"use client";

import { Info } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";
import Link from "next/link";

import { useSession } from "@/lib/session";

/**
 * In the demo, says that prices are simulated, so nobody mistakes them for a store's real prices.
 */
export function DemoNotice() {
  const session = useSession();
  if (session.mode !== "demo") return null;
  return (
    <Alert variant="dark" role="note" icon={<Info />}>
      <span className="font-medium">Demo:</span> the product name comes from the link you paste, but
      prices, stock and other stores are simulated, and everything is saved in this browser only.{" "}
      <Link href="/sign-in" className="font-medium underline">
        Create an account
      </Link>{" "}
      to track real prices.
    </Alert>
  );
}
