"use client";

import {
  Button,
  Card,
  HelperText,
  Input,
  Label,
  SkeletonBlock,
  buttonVariants,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

import { useSession } from "@/lib/session";
import { authErrorMessage, getSupabase } from "@/lib/supabase";

const minPassword = 8;

/** Choosing a new password from the reset email's link (plan T2.3). */
export function ResetPasswordForm() {
  const session = useSession();
  const id = useId();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (session.mode === "loading")
    return <SkeletonBlock className="h-56" aria-busy="true" aria-label="Loading" />;

  if (session.mode !== "account") {
    return (
      <Card className="*:flex *:flex-col *:items-start *:gap-4 *:p-8">
        <h1 className="text-heading text-2xl font-bold">This link has expired</h1>
        <p className="text-body">
          Password reset links work once and for a short time. Ask for a new one.
        </p>
        <Link href="/sign-in" className={buttonVariants()}>
          Back to sign in
        </Link>
      </Card>
    );
  }

  if (done) {
    return (
      <Card className="*:flex *:flex-col *:items-start *:gap-4 *:p-8">
        <h1 className="text-heading text-2xl font-bold">Password changed</h1>
        <p className="text-body">You&apos;re signed in with your new password.</p>
        <Link href="/" className={buttonVariants()}>
          Go to your watchlist
        </Link>
      </Card>
    );
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (password.length < minPassword) {
      setError(`Use at least ${minPassword} characters.`);
      return;
    }
    setBusy(true);
    try {
      const { error: failure } = await getSupabase().auth.updateUser({ password });
      if (failure) {
        setError(authErrorMessage(failure));
        return;
      }
      setDone(true);
    } catch (failure) {
      setError(authErrorMessage(failure));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="*:flex *:flex-col *:gap-6 *:p-8">
      <h1 className="text-heading text-2xl font-bold">Choose a new password</h1>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-password`}>New password</Label>
          <Input
            id={`${id}-password`}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            invalid={error !== null}
            aria-describedby={`${id}-help`}
          />
          <HelperText id={`${id}-help`} variant={error ? "danger" : undefined}>
            {error ?? `At least ${minPassword} characters.`}
          </HelperText>
        </div>
        <Button type="submit" loading={busy} className="w-fit">
          Save password
        </Button>
      </form>
    </Card>
  );
}
