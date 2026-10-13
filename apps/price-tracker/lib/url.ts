/*
 * Checks a pasted product link before anything fetches it (plan T7.2): web links only, and never
 * an address on the user's own machine or private network, so a worker fetching it can't be
 * pointed at internal services (SSRF).
 */

export type UrlCheck = { ok: true; url: URL } | { ok: false; error: string };

const blockedHostnames = new Set(["localhost", "localhost.localdomain", "0.0.0.0", "[::]"]);
const blockedSuffixes = [
  ".localhost",
  ".local",
  ".internal",
  ".lan",
  ".home",
  ".corp",
  ".intranet",
];

function isPrivateIPv4(host: string) {
  const parts = host.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) {
    return false;
  }
  const [a = 0, b = 0] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

/** Store pages are reached by name: any IP address, public or not, is refused. */
function isIpAddress(host: string) {
  return /^\d+(\.\d+){3}$/.test(host) || host.startsWith("[");
}

export function checkProductUrl(input: string): UrlCheck {
  const text = input.trim();
  if (!text) return { ok: false, error: "Paste the link to a product page." };

  let url: URL;
  try {
    // People often paste "emag.ro/…" without the scheme.
    const hasScheme =
      /^[a-z][a-z\d+.-]*:\/\//i.test(text) || /^(javascript|data|mailto|file|blob):/i.test(text);
    url = new URL(hasScheme ? text : `https://${text}`);
  } catch {
    return {
      ok: false,
      error: "That doesn't look like a link. Copy it from the browser's address bar.",
    };
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return { ok: false, error: "Only web links (https://…) can be tracked." };
  }
  if (url.username || url.password) {
    return { ok: false, error: "Links with a user name or password can't be tracked." };
  }

  const host = url.hostname.toLowerCase();
  if (
    blockedHostnames.has(host) ||
    blockedSuffixes.some((suffix) => host.endsWith(suffix)) ||
    isPrivateIPv4(host) ||
    isIpAddress(host)
  ) {
    return {
      ok: false,
      error: "That address isn't a public store. Use the link to a shop's product page.",
    };
  }
  if (!host.includes(".")) {
    return {
      ok: false,
      error: "That address isn't a public store. Use the link to a shop's product page.",
    };
  }
  if (url.port && url.port !== "80" && url.port !== "443") {
    return { ok: false, error: "Links to unusual ports can't be tracked." };
  }

  return { ok: true, url };
}

/**
 * The same page with tracking parameters and the fragment removed, so one product added from
 * two shared links is recognised as the same.
 */
export function canonicalUrl(url: URL) {
  const clean = new URL(url.href);
  clean.hash = "";
  for (const key of [...clean.searchParams.keys()]) {
    if (/^(utm_|fbclid|gclid|ref|ref_|tag|aff|affiliate|mc_)/i.test(key)) {
      clean.searchParams.delete(key);
    }
  }
  clean.hostname = clean.hostname.toLowerCase();
  return clean.href;
}
