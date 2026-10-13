import type { Metadata } from "next";
import { Suspense } from "react";

import { PageShell } from "@/components/page-shell";
import { SignInForm } from "@/components/sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-md">
        {/* Reads ?mode= from the address. */}
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </PageShell>
  );
}
