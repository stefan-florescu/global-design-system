"use client";

import { Mail } from "@stefan-florescu/icons";
import {
  Alert,
  Button,
  Card,
  HelperText,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@stefan-florescu/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState, type FormEvent } from "react";

import { appUrl, startDemo, useSession } from "@/lib/session";
import { authErrorMessage, getSupabase } from "@/lib/supabase";
import { supabaseConfig } from "@/lib/supabase-config";

type Mode = "sign-in" | "sign-up";

const minPassword = 8;

/** Sign in, create an account, or ask for a password reset email (plan T2.1, T2.3, T2.6). */
export function SignInForm() {
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "sign-up" ? "sign-up" : "sign-in");
  const [forgot, setForgot] = useState(false);
  const [sentTo, setSentTo] = useState<{ email: string; reason: "confirm" | "reset" } | null>(null);

  useEffect(() => {
    if (session.mode === "account") router.replace("/");
  }, [session.mode, router]);

  if (sentTo) {
    return (
      <Card className="*:flex *:flex-col *:items-start *:gap-4 *:p-8">
        <Mail aria-hidden className="text-fg-brand size-8" />
        <h1 className="text-heading text-2xl font-bold">Check your email</h1>
        <p className="text-body">
          {sentTo.reason === "confirm"
            ? `We sent a link to ${sentTo.email}. Open it to confirm your address and sign in.`
            : `If ${sentTo.email} has an account, we sent it a link to choose a new password.`}
        </p>
        <p className="text-body-subtle text-sm">
          Nothing there after a few minutes? Check your spam folder, or go back and try again.
        </p>
        <Button variant="secondary" onClick={() => setSentTo(null)}>
          Back
        </Button>
      </Card>
    );
  }

  return (
    <Card className="*:flex *:flex-col *:gap-6 *:p-6 md:*:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-heading text-2xl font-bold">
          {forgot ? "Reset your password" : mode === "sign-in" ? "Sign in" : "Create your account"}
        </h1>
        <p className="text-body">
          {forgot
            ? "Enter your email and we'll send you a link to choose a new password."
            : "Your watchlist, prices and alerts follow you to any device."}
        </p>
      </div>

      {forgot ? (
        <ForgotPassword
          onSent={(email) => setSentTo({ email, reason: "reset" })}
          onBack={() => setForgot(false)}
        />
      ) : (
        <Tabs value={mode} onValueChange={(value) => setMode(value as Mode)} variant="full-width">
          <TabsList aria-label="Account">
            <TabsTrigger value="sign-in">Sign in</TabsTrigger>
            <TabsTrigger value="sign-up">Create account</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="pt-6">
            <PasswordForm
              mode="sign-in"
              onForgot={() => setForgot(true)}
              onSent={() => undefined}
            />
          </TabsContent>
          <TabsContent value="sign-up" className="pt-6">
            <PasswordForm
              mode="sign-up"
              onForgot={() => setForgot(true)}
              onSent={(email) => setSentTo({ email, reason: "confirm" })}
            />
          </TabsContent>
        </Tabs>
      )}

      {supabaseConfig.googleSignIn && !forgot ? (
        <Button
          variant="secondary"
          onClick={() =>
            void getSupabase().auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: appUrl("/") },
            })
          }
        >
          Continue with Google
        </Button>
      ) : null}

      <p className="text-body-subtle text-sm">
        Just looking?{" "}
        <button
          type="button"
          className="text-fg-brand font-medium underline"
          onClick={() => {
            startDemo();
            router.push("/");
          }}
        >
          Try the demo
        </button>{" "}
        with simulated prices.
      </p>
    </Card>
  );
}

function PasswordForm({
  mode,
  onForgot,
  onSent,
}: {
  mode: Mode;
  onForgot: () => void;
  onSent: (email: string) => void;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter an email address like name@example.com.");
      return;
    }
    if (mode === "sign-up" && password.length < minPassword) {
      setError(`Use at least ${minPassword} characters for your password.`);
      return;
    }
    setBusy(true);
    setError(null);
    const auth = getSupabase().auth;
    try {
      const result =
        mode === "sign-in"
          ? await auth.signInWithPassword({ email: email.trim(), password })
          : await auth.signUp({
              email: email.trim(),
              password,
              options: { emailRedirectTo: appUrl("/") },
            });
      if (result.error) {
        setError(authErrorMessage(result.error));
        return;
      }
      // Sign-up needs the email confirmed before there is a session.
      if (mode === "sign-up" && !result.data.session) onSent(email.trim());
    } catch (failure) {
      setError(authErrorMessage(failure));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {error ? (
        <Alert variant="danger" id={`${id}-error`}>
          {error}
        </Alert>
      ) : null}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-email`}>Email</Label>
        <Input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={error ? `${id}-error` : undefined}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-password`}>Password</Label>
        <Input
          id={`${id}-password`}
          type="password"
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-describedby={`${id}-password-help`}
          required
        />
        {mode === "sign-up" ? (
          <HelperText id={`${id}-password-help`}>At least {minPassword} characters.</HelperText>
        ) : (
          <button
            type="button"
            id={`${id}-password-help`}
            onClick={onForgot}
            className="text-fg-brand w-fit text-sm font-medium underline"
          >
            Forgot your password?
          </button>
        )}
      </div>
      <Button type="submit" loading={busy}>
        {mode === "sign-in" ? "Sign in" : "Create account"}
      </Button>
    </form>
  );
}

function ForgotPassword({
  onSent,
  onBack,
}: {
  onSent: (email: string) => void;
  onBack: () => void;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter an email address like name@example.com.");
      return;
    }
    setBusy(true);
    try {
      const { error: failure } = await getSupabase().auth.resetPasswordForEmail(email.trim(), {
        redirectTo: appUrl("/reset-password"),
      });
      if (failure) {
        setError(authErrorMessage(failure));
        return;
      }
      onSent(email.trim());
    } catch (failure) {
      setError(authErrorMessage(failure));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-email`}>Email</Label>
        <Input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          invalid={error !== null}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error ? (
          <HelperText id={`${id}-error`} variant="danger">
            {error}
          </HelperText>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" loading={busy}>
          Send reset link
        </Button>
        <Button variant="ghost" onClick={onBack}>
          Back to sign in
        </Button>
      </div>
    </form>
  );
}
