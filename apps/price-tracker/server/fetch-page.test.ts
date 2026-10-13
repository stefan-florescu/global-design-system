import { describe, expect, it, vi } from "vitest";

import { fetchPage, isChallenge } from "./fetch-page";

const html = (title: string) => `<html><head><title>${title}</title></head><body>ok</body></html>`;

function fakeFetch(routes: Record<string, () => Response>) {
  return vi.fn(async (input: string | URL | Request) => {
    const url = String(input);
    const route = routes[url];
    if (!route) throw new Error(`unexpected ${url}`);
    return route();
  }) as unknown as typeof fetch;
}

describe("fetchPage", () => {
  it("reads a page", async () => {
    const result = await fetchPage("https://shop.ro/p", {
      fetch: fakeFetch({ "https://shop.ro/p": () => new Response(html("Phone")) }),
    });
    expect(result).toMatchObject({ ok: true, url: "https://shop.ro/p" });
  });

  it("follows redirects, but never to a private address", async () => {
    const ok = await fetchPage("https://shop.ro/a", {
      fetch: fakeFetch({
        "https://shop.ro/a": () => new Response(null, { status: 301, headers: { location: "/b" } }),
        "https://shop.ro/b": () => new Response(html("B")),
      }),
    });
    expect(ok).toMatchObject({ ok: true, url: "https://shop.ro/b" });

    const unsafe = await fetchPage("https://shop.ro/a", {
      fetch: fakeFetch({
        "https://shop.ro/a": () =>
          new Response(null, {
            status: 302,
            headers: { location: "http://169.254.169.254/latest" },
          }),
      }),
    });
    expect(unsafe).toMatchObject({ ok: false, reason: "unsafe" });
  });

  it("refuses private addresses up front", async () => {
    const fetchSpy = fakeFetch({});
    expect(await fetchPage("http://localhost:8080/", { fetch: fetchSpy })).toMatchObject({
      ok: false,
      reason: "unsafe",
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("reports bot protection as blocked, and retries through a scraping service", async () => {
    const challenge = () => new Response(html("Just a moment..."), { status: 403 });
    expect(
      await fetchPage("https://shop.ro/p", {
        fetch: fakeFetch({ "https://shop.ro/p": challenge }),
      }),
    ).toMatchObject({ ok: false, reason: "blocked", status: 403 });

    const viaScraper = await fetchPage("https://shop.ro/p", {
      scraperUrlTemplate: "https://scraper.example/?url={url}",
      fetch: fakeFetch({
        "https://shop.ro/p": challenge,
        "https://scraper.example/?url=https%3A%2F%2Fshop.ro%2Fp": () => new Response(html("Phone")),
      }),
    });
    expect(viaScraper).toMatchObject({ ok: true, url: "https://shop.ro/p" });
  });

  it("reports missing pages and network errors", async () => {
    expect(
      await fetchPage("https://shop.ro/gone", {
        fetch: fakeFetch({ "https://shop.ro/gone": () => new Response("", { status: 404 }) }),
      }),
    ).toMatchObject({ ok: false, reason: "not_found" });
    expect(
      await fetchPage("https://shop.ro/down", {
        fetch: fakeFetch({
          "https://shop.ro/down": () => {
            throw new TypeError("network");
          },
        }),
      }),
    ).toMatchObject({ ok: false, reason: "error" });
  });
});

describe("isChallenge", () => {
  it("spots challenge pages but not ordinary ones", () => {
    expect(isChallenge(200, html("Just a moment..."))).toBe(true);
    expect(isChallenge(429, html("Shop"))).toBe(true);
    expect(isChallenge(200, html("Telefon Apple iPhone 15 | Shop"))).toBe(false);
  });
});
