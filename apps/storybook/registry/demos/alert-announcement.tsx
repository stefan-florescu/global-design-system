import { ChevronRight } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";

const ANNOUNCEMENTS = [
  { variant: "brand", tag: "bg-brand-soft" },
  { variant: "danger", tag: "bg-danger-medium" },
  { variant: "success", tag: "bg-success-medium" },
  { variant: "warning", tag: "bg-warning-medium" },
  { variant: "dark", tag: "bg-neutral-quaternary" },
] as const;

export default function AlertAnnouncement() {
  return (
    <div className="flex flex-col items-start gap-4">
      {ANNOUNCEMENTS.map(({ variant, tag }) => (
        <Alert
          key={variant}
          variant={variant}
          bordered
          className="inline-flex w-auto items-center gap-0 rounded-full p-1 pe-2"
        >
          <div className="flex items-center">
            <span className={`${tag} rounded-full px-2 py-0.5`}>New</span>
            <span className="ms-2">
              Great job! You&apos;ve acknowledged this{" "}
              <a href="/changelog" className="font-medium underline hover:no-underline">
                significant
              </a>{" "}
              alert message.
            </span>
            <ChevronRight aria-hidden className="ms-1 size-4 shrink-0" />
          </div>
        </Alert>
      ))}
    </div>
  );
}
