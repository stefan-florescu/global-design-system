import type { Variant } from "./model";

/*
 * Product titles as shops write them ("Telefon mobil Apple iPhone 15, 128GB, 5G, Black – NOU!")
 * turned into brand, model and variant (plan T3.4), which discovery and matching rely on.
 */

// prettier-ignore
export const knownBrands = [
  "Apple", "Samsung", "Xiaomi", "Huawei", "Google", "OnePlus", "Motorola", "Nokia", "Oppo",
  "Realme", "Honor", "Sony", "LG", "Philips", "Panasonic", "TCL", "Hisense", "Lenovo", "Asus",
  "Acer", "HP", "Dell", "MSI", "Microsoft", "Logitech", "Razer", "Corsair", "SteelSeries",
  "HyperX", "JBL", "Bose", "Sennheiser", "Marshall", "Garmin", "Fitbit", "Amazfit", "Nintendo",
  "PlayStation", "Xbox", "Canon", "Nikon", "Fujifilm", "GoPro", "DJI", "Dyson", "Bosch",
  "Siemens", "Electrolux", "Whirlpool", "Beko", "Gorenje", "Rowenta", "Tefal", "DeLonghi",
  "Krups", "Braun", "Oral-B", "Nespresso", "iRobot", "Roborock", "Nike", "Adidas", "Puma",
  "Lego", "Kingston", "SanDisk", "Western Digital", "Seagate", "Crucial", "Intel", "AMD",
  "Nvidia", "Gigabyte", "Anker", "Ugreen", "Baseus", "TP-Link", "Netgear", "Tenda",
];

// prettier-ignore
const colors = [
  // English
  "black", "white", "silver", "gold", "blue", "red", "green", "purple", "pink", "gray", "grey",
  "graphite", "midnight", "starlight", "titanium", "natural titanium", "space gray", "space grey",
  "yellow", "orange", "beige", "navy", "rose gold", "cream", "lavender", "mint",
  // Romanian
  "negru", "alb", "argintiu", "auriu", "albastru", "rosu", "roșu", "verde", "mov", "roz", "gri",
  "galben", "portocaliu", "bej",
  // German, French
  "schwarz", "weiß", "weiss", "silber", "blau", "rot", "grün", "noir", "blanc", "argent", "bleu",
  "rouge", "vert",
];

/** Words shops add to titles that say nothing about the product. */
const marketingPatterns = [
  /\b(nou|new|neu|nouveau|oferta|ofertă|promo(?:tie|ție)?|sale|reducere|bestseller|best seller|hot deal|top|exclusiv(?:e)?|limited offer)\b!?/gi,
  /\b(livrare gratuit[aă]|free shipping|kostenloser versand|livraison gratuite)\b/gi,
  /\b(resigilat|refurbished|reconditionat|recondiționat)\b/gi,
  /!+/g,
];

/** Category words that come before the brand in many store titles. */
const categoryPrefix =
  /^(telefon mobil|smartphone|telefon|laptop|notebook|tableta|tabletă|tablet|televizor|tv|casti|căști|headphones|kopfhörer|consola|consolă|console|monitor|aspirator|espressor|ceas inteligent|smartwatch|boxa|boxă|frigider|masina de spalat|mașină de spălat)\s+/i;

export type NormalizedTitle = {
  /** The title without marketing words or category prefix. */
  title: string;
  brand?: string;
  model?: string;
  variant: Variant;
};

function clean(text: string) {
  return text
    .replace(/[–—|]/g, ",")
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/(,\s*)+/g, ", ")
    .replace(/^[\s,–-]+|[\s,–-]+$/g, "")
    .trim();
}

function capitalise(word: string) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

export function findBrand(title: string): string | undefined {
  const lower = ` ${title.toLowerCase()} `;
  let best: { brand: string; index: number } | undefined;
  for (const brand of knownBrands) {
    const index = lower.search(
      new RegExp(`[\\s,(]${brand.toLowerCase().replace(/[-.]/g, "\\$&")}[\\s,)]`),
    );
    if (index !== -1 && (!best || index < best.index)) best = { brand, index };
  }
  return best?.brand;
}

export function extractVariant(title: string): Variant {
  const variant: Variant = {};
  const lower = title.toLowerCase();

  // "8GB RAM, 256GB" names memory and storage: storage is the larger amount.
  const amounts = [...lower.matchAll(/(\d+(?:[.,]\d+)?)\s?(gb|tb)\b/g)].map((m) => ({
    text: `${m[1]}${(m[2] ?? "").toUpperCase()}`,
    gb: Number.parseFloat((m[1] ?? "0").replace(",", ".")) * (m[2] === "tb" ? 1024 : 1),
  }));
  if (amounts.length > 0) {
    variant.storage = amounts.reduce((a, b) => (b.gb > a.gb ? b : a)).text;
  }

  const color = [...colors]
    .sort((a, b) => b.length - a.length)
    .find((c) => new RegExp(`(^|[\\s,(/-])${c}($|[\\s,)/-])`, "i").test(lower));
  if (color) variant.color = color.split(" ").map(capitalise).join(" ");

  const screen = lower.match(/(\d{2}(?:[.,]\d)?)\s?(?:"|”|''|inch|inches|inci|toli|zoll)/);
  const shoe = lower.match(/\b(?:eu|marime|mărime|size|gr(?:ö|oe)sse)\s?(\d{2}(?:[.,]5)?)\b/);
  if (screen?.[1]) variant.size = `${screen[1].replace(",", ".")}"`;
  else if (shoe?.[1]) variant.size = `EU ${shoe[1]}`;

  return variant;
}

/** Splits a normalized title into brand, model and variant. */
export function normalizeTitle(raw: string): NormalizedTitle {
  let title = raw;
  for (const pattern of marketingPatterns) title = title.replace(pattern, " ");
  title = clean(title.replace(/\((?:[^)]*\b(?:nou|new|promo|oferta|sale)\b[^)]*)\)/gi, " "));
  title = clean(title.replace(categoryPrefix, ""));

  const brand = findBrand(title);
  const variant = extractVariant(title);

  let model: string | undefined;
  if (brand) {
    // "128 GB" is one variant word.
    const after = title
      .slice(title.toLowerCase().indexOf(brand.toLowerCase()) + brand.length)
      .replace(/(\d)\s+(gb|tb)\b/gi, "$1$2");
    const words: string[] = [];
    for (const word of after.split(/[\s,]+/).filter(Boolean)) {
      const lower = word.toLowerCase();
      const isVariant =
        /^\d+(?:[.,]\d+)?(gb|tb)$/i.test(word) ||
        /^(\d+g|5g|4g|lte|wifi|wi-fi|dual|sim|nfc|ram|eu|ce|ue)$/i.test(word) ||
        colors.includes(lower) ||
        /^\d{2}(?:[.,]\d)?("|”|inch|inci)$/i.test(word);
      if (isVariant || words.length >= 5) break;
      words.push(word);
    }
    if (words.length > 0) model = words.join(" ");
  }

  return { title, brand, model, variant };
}

/** Lowercase words with "128 GB" joined into "128gb", for comparing titles. */
export function titleTokens(title: string): string[] {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(\d)\s+(gb|tb|mb|mah|w|hz|mm|cm|kg|l)\b/g, "$1$2")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 1 || /\d/.test(word));
}

/**
 * A readable title from a product link's path, for stores whose pages we can't read yet:
 * `/telefon-mobil-apple-iphone-15-128gb-black/pd/DMC4NBYBM/` → "Telefon Mobil Apple iPhone 15 128GB Black".
 */
export function titleFromPath(pathname: string): string | undefined {
  const segments = decodeURIComponent(pathname)
    .split("/")
    .map((s) => s.replace(/\.(html?|php|aspx?)$/i, ""))
    .filter((s) => /[-_]/.test(s) && /[a-z]{3}/i.test(s));
  const slug = segments.sort((a, b) => b.length - a.length)[0];
  if (!slug) return undefined;

  const words = slug
    .split(/[-_+]+/)
    .filter(Boolean)
    // Product codes such as "DMC4NBYBM" or "p12345678" are not part of the name.
    .filter((w) => !/^(?=.*\d)(?=.*[a-z])[a-z\d]{8,}$/i.test(w) && !/^\d{6,}$/.test(w));
  if (words.length < 2) return undefined;

  return words
    .map((w) => {
      const lower = w.toLowerCase();
      if (/^\d+(gb|tb|g)$/.test(lower) || /^(gb|tb|mb)$/.test(lower)) return lower.toUpperCase();
      // Model codes such as "1000xm5" or "qe55q60c" are written in capitals.
      if (/\d/.test(lower) && /[a-z]/.test(lower)) return lower.toUpperCase();
      return wordCasing.get(lower) ?? capitalise(lower);
    })
    .join(" ");
}

/** Brand and product names whose casing a slug loses. */
const wordCasing = new Map(
  [
    ...knownBrands,
    "iPhone",
    "iPad",
    "iMac",
    "AirPods",
    "MacBook",
    "PlayStation",
    "PS5",
    "OLED",
    "QLED",
  ].map((word) => [word.toLowerCase(), word]),
);
