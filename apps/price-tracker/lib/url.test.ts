import { describe, expect, it } from "vitest";

import { canonicalUrl, checkProductUrl } from "./url";

describe("checkProductUrl", () => {
  it("accepts store links, adding https:// when missing", () => {
    const result = checkProductUrl("emag.ro/telefon-apple-iphone-15/pd/D1/");
    expect(result.ok && result.url.href).toBe("https://emag.ro/telefon-apple-iphone-15/pd/D1/");
  });

  it("explains why an address on this machine is refused", () => {
    expect(checkProductUrl("localhost:3000/x")).toMatchObject({
      ok: false,
      error: expect.stringMatching(/public store/),
    });
  });

  it.each([
    "",
    "ftp://emag.ro/file",
    "javascript:alert(1)",
    "http://localhost:3000/admin",
    "localhost:3000/admin",
    "http://127.0.0.1/",
    "http://10.0.0.5/",
    "http://192.168.1.1/",
    "http://169.254.169.254/latest/meta-data",
    "http://[::1]/",
    "http://8.8.8.8/",
    "http://printer.local/",
    "http://intranet/",
    "https://user:pass@emag.ro/",
    "https://emag.ro:8443/",
  ])("refuses %s", (input) => {
    expect(checkProductUrl(input).ok).toBe(false);
  });
});

describe("canonicalUrl", () => {
  it("drops tracking parameters and the fragment", () => {
    const url = new URL("https://WWW.Emag.ro/p/1?utm_source=x&color=black&fbclid=1#reviews");
    expect(canonicalUrl(url)).toBe("https://www.emag.ro/p/1?color=black");
  });

  it("drops Google Ads parameters", () => {
    const url = new URL(
      "https://www.emag.ro/joc-ps5/pd/DVZ4HM2BM/?cmpid=147828&gad_source=1&gad_campaignid=97&gbraid=0AAA",
    );
    expect(canonicalUrl(url)).toBe("https://www.emag.ro/joc-ps5/pd/DVZ4HM2BM/");
  });
});
