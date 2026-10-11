import { cn } from "@/lib/utils";

/** The Stefan DS mark: a rounded square with an "S". Decorative; name it where it is used. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6", className)}>
      <rect width="24" height="24" rx="6" className="fill-heading" />
      <path
        d="M15.5 8.2c-.6-.9-1.8-1.5-3.3-1.5-2 0-3.4 1-3.4 2.6 0 3.4 6.9 2 6.9 5.4 0 1.6-1.5 2.7-3.6 2.7-1.6 0-3-.7-3.7-1.8"
        className="stroke-neutral-primary fill-none"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
