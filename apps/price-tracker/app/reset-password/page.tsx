import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { ResetPasswordForm } from "@/components/reset-password-form";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </PageShell>
  );
}
