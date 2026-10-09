"use client";

import { CornerDownLeft, FileText, Search } from "@stefan-florescu/icons";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { mainNav, sidebarNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type Result = { group: string; title: string; href: string };

const noopSubscribe = () => () => {};

const allResults: Result[] = [
  ...sidebarNav.flatMap((section) =>
    section.items.map((item) => ({ group: section.title, title: item.title, href: item.href })),
  ),
  ...mainNav.map((item) => ({ group: "Pages", title: item.title, href: item.href })),
];

/**
 * Header search (⌘K / Ctrl+K / "/"). Native <dialog> provides the focus trap and Esc;
 * the input + listbox follow the WAI-ARIA combobox pattern.
 */
export function SearchCommand() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /mac|iphone|ipad/i.test(navigator.userAgent),
    () => true,
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allResults;
    return allResults.filter(
      (r) => r.title.toLowerCase().includes(q) || r.group.toLowerCase().includes(q),
    );
  }, [query]);

  const open = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }, []);

  // Resolve the dialog from the event target so handlers never touch refs during render.
  const go = (result: Result | undefined, from: Element) => {
    if (!result) return;
    from.closest("dialog")?.close();
    router.push(result.href);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !typing)
      ) {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[activeIndex], event.currentTarget);
    }
  };

  const groups = [...new Set(results.map((r) => r.group))];
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-keyshortcuts="Meta+K Control+K"
        className="text-body hover:bg-neutral-tertiary hover:text-heading focus-visible:ring-ring/50 sm:bg-neutral-secondary-medium/50 sm:border-default inline-flex h-9 items-center gap-2 rounded-md text-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none max-sm:w-9 max-sm:justify-center sm:w-56 sm:border sm:px-3 lg:w-64"
      >
        <Search aria-hidden className="size-4 shrink-0 sm:hidden" />
        <span className="hidden sm:inline">Search components…</span>
        <span className="sr-only sm:hidden">Search components</span>
        <kbd className="bg-neutral-secondary-medium pointer-events-none ml-auto hidden h-5 items-center gap-0.5 rounded border px-1.5 font-mono text-[10px] font-medium select-none sm:inline-flex">
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>

      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events -- backdrop click; Esc is handled natively by <dialog> */}
      <dialog
        ref={dialogRef}
        aria-label="Search documentation"
        onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}
        className="bg-neutral-primary-medium text-heading fixed top-[12vh] mx-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border p-0 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search aria-hidden className="text-body size-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? optionId(activeIndex) : undefined}
            aria-label="Search components and pages"
            placeholder="Search components and pages…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            className="placeholder:text-body h-12 w-full bg-transparent text-sm outline-none"
          />
          <kbd className="bg-neutral-secondary-medium text-body rounded border px-1.5 font-mono text-[10px]">
            Esc
          </kbd>
        </div>

        <div
          id={listboxId}
          role="listbox"
          aria-label="Results"
          className="max-h-80 overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <p className="text-body py-8 text-center text-sm">No results for “{query}”.</p>
          ) : (
            groups.map((group) => (
              <div key={group} role="group" aria-label={group}>
                <div aria-hidden className="text-body px-2 pt-2 pb-1 text-xs font-medium">
                  {group}
                </div>
                {results.map((result, index) =>
                  result.group !== group ? null : (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- keyboard handled on the combobox input
                    <div
                      key={result.href}
                      id={optionId(index)}
                      role="option"
                      tabIndex={-1}
                      aria-selected={index === activeIndex}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={(event) => go(result, event.currentTarget)}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm",
                        index === activeIndex && "bg-neutral-tertiary text-heading",
                      )}
                    >
                      <FileText aria-hidden className="text-body size-4" />
                      {result.title}
                      {index === activeIndex ? (
                        <CornerDownLeft aria-hidden className="text-body ml-auto size-3.5" />
                      ) : null}
                    </div>
                  ),
                )}
              </div>
            ))
          )}
        </div>
      </dialog>
    </>
  );
}
