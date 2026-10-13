import { checkProductUrl } from "../lib/url";

/*
 * Fetches a store page for the price-tracker Edge Function (plan T3.1). Every hop of a redirect
 * is checked like a pasted link, so a store can't send us to a private address (SSRF, T7.2).
 * Stores that refuse automated requests are reported as `blocked`, and retried through a
 * scraping service when one is configured (ADR 0011).
 */

export type PageResult =
  | { ok: true; html: string; url: string; status: number }
  | {
      ok: false;
      reason: "blocked" | "not_found" | "timeout" | "unsafe" | "error";
      status?: number;
      url: string;
    };

export type FetchOptions = {
  /** `fetch` to use; injected in tests. */
  fetch?: typeof fetch;
  /** A scraping service URL with `{url}` for the encoded page address, e.g. its API endpoint. */
  scraperUrlTemplate?: string;
  timeoutMs?: number;
};

const maxRedirects = 5;
const maxBytes = 4_000_000;

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "ro-RO,ro;q=0.9,en;q=0.8",
};

/** A bot-protection page rather than the store's own. */
export function isChallenge(status: number, html: string) {
  if ([401, 403, 429, 503, 511].includes(status)) return true;
  const title = html.match(/<title[^>]*>([^<]*)/i)?.[1]?.toLowerCase() ?? "";
  return /just a moment|attention required|access denied|eroare temporar/.test(title);
}

async function readCapped(response: Response) {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let html = "";
  let bytes = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    html += decoder.decode(value, { stream: true });
    if (bytes > maxBytes) {
      await reader.cancel();
      break;
    }
  }
  return html + decoder.decode();
}

async function direct(start: URL, options: FetchOptions): Promise<PageResult> {
  const doFetch = options.fetch ?? fetch;
  let url = start;
  for (let hop = 0; hop <= maxRedirects; hop++) {
    let response: Response;
    try {
      response = await doFetch(url.href, {
        headers,
        redirect: "manual",
        signal: AbortSignal.timeout(options.timeoutMs ?? 12_000),
      });
    } catch (error) {
      const timedOut = error instanceof Error && error.name === "TimeoutError";
      return { ok: false, reason: timedOut ? "timeout" : "error", url: url.href };
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location) return { ok: false, reason: "error", status: response.status, url: url.href };
      const next = checkProductUrl(new URL(location, url).href);
      if (!next.ok) return { ok: false, reason: "unsafe", url: url.href };
      url = next.url;
      continue;
    }

    const html = await readCapped(response);
    if (response.status === 404 || response.status === 410) {
      return { ok: false, reason: "not_found", status: response.status, url: url.href };
    }
    if (isChallenge(response.status, html)) {
      return { ok: false, reason: "blocked", status: response.status, url: url.href };
    }
    if (!response.ok) {
      return { ok: false, reason: "error", status: response.status, url: url.href };
    }
    return { ok: true, html, url: url.href, status: response.status };
  }
  return { ok: false, reason: "error", url: start.href };
}

/** Fetches a page, through the scraping service if the store blocks us and one is set up. */
export async function fetchPage(input: string, options: FetchOptions = {}): Promise<PageResult> {
  const check = checkProductUrl(input);
  if (!check.ok) return { ok: false, reason: "unsafe", url: input };

  const result = await direct(check.url, options);
  if (result.ok || result.reason !== "blocked" || !options.scraperUrlTemplate) return result;

  const viaScraper = options.scraperUrlTemplate.replace(
    "{url}",
    encodeURIComponent(check.url.href),
  );
  const doFetch = options.fetch ?? fetch;
  try {
    const response = await doFetch(viaScraper, {
      signal: AbortSignal.timeout(options.timeoutMs ? options.timeoutMs * 3 : 45_000),
    });
    const html = await readCapped(response);
    if (!response.ok || isChallenge(response.status, html)) return result;
    return { ok: true, html, url: check.url.href, status: response.status };
  } catch {
    return result;
  }
}
