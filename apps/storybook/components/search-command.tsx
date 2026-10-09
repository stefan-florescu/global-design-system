"use client";

import { CornerDownLeft, FileText, Search } from "@stefan-florescu/icons";
import { Kbd, Modal, ModalContent, ModalTrigger } from "@stefan-florescu/ui";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";

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
 * Header search (⌘K / Ctrl+K / "/"). A `Modal` (native <dialog>) provides the focus trap, Esc,
 * the backdrop and focus return; the input + listbox follow the WAI-ARIA combobox pattern.
 */
export function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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

  // Start every search afresh. The modal moves focus to the combobox, its first focusable element.
  const reset = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
  }, []);

  const go = (result: Result | undefined) => {
    if (!result) return;
    setOpen(false);
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
        if (!open) reset();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, reset]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[activeIndex]);
    }
  };

  const groups = [...new Set(results.map((r) => r.group))];
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  return (
    <Modal open={open} onOpenChange={setOpen} placement="top-center" size="lg">
      <ModalTrigger asChild>
        <button
          type="button"
          onClick={reset}
          aria-keyshortcuts="Meta+K Control+K"
          className="text-body hover:bg-neutral-tertiary hover:text-heading focus-visible:ring-ring/50 sm:bg-neutral-secondary-medium/50 sm:border-default inline-flex h-9 items-center gap-2 rounded-md text-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none max-sm:w-9 max-sm:justify-center sm:w-56 sm:border sm:px-3 lg:w-64"
        >
          <Search aria-hidden className="size-4 shrink-0 sm:hidden" />
          <span className="hidden sm:inline">Search components…</span>
          <span className="sr-only sm:hidden">Search components</span>
          <Kbd size="sm" className="pointer-events-none ms-auto hidden select-none sm:inline-block">
            {isMac ? "⌘" : "Ctrl"} K
          </Kbd>
        </button>
      </ModalTrigger>

      {/* Opens near the top, like a command palette; the panel keeps its own look. */}
      <ModalContent
        aria-label="Search documentation"
        className="bg-neutral-primary-medium text-heading mt-[12vh] overflow-hidden rounded-xl p-0 shadow-2xl md:p-0"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search aria-hidden className="text-body size-4 shrink-0" />
          <input
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
          <Kbd size="sm">Esc</Kbd>
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
                      onClick={() => go(result)}
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
      </ModalContent>
    </Modal>
  );
}
