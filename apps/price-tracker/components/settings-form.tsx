"use client";

import { Download, Info, Mail, Trash2 } from "@stefan-florescu/icons";
import {
  Alert,
  Button,
  Card,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  SkeletonBlock,
  Toggle,
} from "@stefan-florescu/ui";
import { useId, useState, type FormEvent } from "react";

import { emptyState, serialize } from "@/lib/tracker";
import { dispatch, useTracker } from "@/lib/use-tracker";

import { PageHeading } from "./page-shell";

const dedupeOptions = [6, 12, 24, 48];

/** Notification settings and the user's data (plan T4.4, T7.5). */
export function SettingsForm() {
  const { state } = useTracker();
  const emailId = useId();
  const emailHelpId = useId();
  const dedupeId = useId();
  const [email, setEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState("");

  if (state === null) {
    return <SkeletonBlock className="h-96" aria-busy="true" aria-label="Loading settings" />;
  }

  const { settings } = state;
  const emailValue = email ?? settings.email;

  const saveEmail = (event: FormEvent) => {
    event.preventDefault();
    const value = emailValue.trim();
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Enter an email address like name@example.com.");
      return;
    }
    setEmailError(null);
    dispatch({ type: "updateSettings", patch: { email: value } });
    setSaved(value ? "Email saved." : "Email removed.");
  };

  const exportData = () => {
    const blob = new Blob([serialize(state)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `price-tracker-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    setSaved("Your data was downloaded.");
  };

  return (
    <>
      <PageHeading
        title="Settings"
        description="How you're alerted, and the data this app keeps."
      />

      <Card className="*:flex *:flex-col *:gap-5 *:p-6">
        <h2 className="text-heading text-xl font-semibold">Notifications</h2>
        <Alert variant="brand" role="note" icon={<Info />}>
          Email alerts start once the email service is connected. Until then, alerts show on the
          Alerts page.
        </Alert>
        <form onSubmit={saveEmail} noValidate className="flex flex-col gap-2">
          <Label htmlFor={emailId}>Email for alerts</Label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              startIcon={<Mail />}
              value={emailValue}
              onChange={(event) => setEmail(event.target.value)}
              invalid={emailError !== null}
              aria-describedby={emailHelpId}
            />
            <Button type="submit" variant="secondary">
              Save
            </Button>
          </div>
          <HelperText id={emailHelpId} variant={emailError ? "danger" : undefined}>
            {emailError ?? "Every email has a one-click unsubscribe link."}
          </HelperText>
        </form>
        <Toggle
          label="Daily digest"
          description="One email a day with every change, instead of one per change."
          checked={settings.dailyDigest}
          onChange={(event) => {
            dispatch({ type: "updateSettings", patch: { dailyDigest: event.target.checked } });
            setSaved(`Daily digest ${event.target.checked ? "on" : "off"}.`);
          }}
        />
        <Toggle
          label="Price rises"
          description="Also alert me when a price goes up."
          checked={settings.notifyOnIncrease}
          onChange={(event) => {
            dispatch({ type: "updateSettings", patch: { notifyOnIncrease: event.target.checked } });
            setSaved(`Price rise alerts ${event.target.checked ? "on" : "off"}.`);
          }}
        />
        <div className="flex flex-col gap-2 sm:max-w-xs">
          <Label htmlFor={dedupeId}>Don&apos;t repeat an alert within</Label>
          <Select
            id={dedupeId}
            value={settings.dedupeHours}
            onChange={(event) => {
              dispatch({
                type: "updateSettings",
                patch: { dedupeHours: Number(event.target.value) },
              });
              setSaved("Saved.");
            }}
          >
            {dedupeOptions.map((hours) => (
              <option key={hours} value={hours}>
                {hours} hours
              </option>
            ))}
          </Select>
        </div>
      </Card>

      <Card className="*:flex *:flex-col *:gap-5 *:p-6">
        <h2 className="text-heading text-xl font-semibold">Your data</h2>
        <p className="text-body">
          Your watchlist, price history and alerts are stored in this browser only. Nothing is sent
          to a server.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={exportData}>
            <Download aria-hidden />
            Download my data
          </Button>
          <Button variant="danger" onClick={() => setDeleting(true)}>
            <Trash2 aria-hidden />
            Delete everything
          </Button>
        </div>
      </Card>

      <div role="status" aria-live="polite" className="sr-only">
        {saved}
      </div>

      <Modal open={deleting} onOpenChange={setDeleting} size="md">
        <ModalContent role="alertdialog">
          <ModalHeader>
            <ModalTitle>Delete everything?</ModalTitle>
            <ModalClose label="Close" />
          </ModalHeader>
          <ModalBody>
            <p className="text-body">
              Every tracked product, its price history, your alerts and settings will be deleted
              from this browser. This can&apos;t be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="danger"
              onClick={() => {
                dispatch({ type: "replace", state: emptyState });
                setDeleting(false);
                setEmail(null);
                setSaved("Everything was deleted.");
              }}
            >
              Delete everything
            </Button>
            <ModalClose asChild>
              <Button variant="secondary" data-autofocus>
                Cancel
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
