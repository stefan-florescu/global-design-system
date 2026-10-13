import { createClient } from "@supabase/supabase-js";

import { isCountryCode } from "../lib/countries";
import type { ProductIdentity } from "../lib/model";

import {
  addOffer,
  checkDue,
  checkNow,
  deleteAccount,
  discover,
  identify,
  track,
  UserError,
  type Context,
  type TrackInput,
} from "./service";

/*
 * The price-tracker Edge Function (ADR 0011). Bundled by `pnpm build:function` into
 * supabase/functions/price-tracker/index.ts and deployed to Supabase. Every action but
 * `check-due` (the scheduler, which only checks products already due) needs a signed-in user.
 */

declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

type Body = { action?: string } & Record<string, unknown>;

const asString = (value: unknown) => (typeof value === "string" ? value : "");

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return json({ error: "Use POST." }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) return json({ error: "The function is not configured." }, 500);

  const db = createClient(url, serviceKey, { auth: { persistSession: false } });
  const ctx: Context = {
    db,
    fetch: { scraperUrlTemplate: Deno.env.get("SCRAPER_URL_TEMPLATE") || undefined },
    now: () => Date.now(),
    random: () => Math.random(),
  };

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: "Send a JSON body." }, 400);
  }

  try {
    if (body.action === "check-due") return json(await checkDue(ctx));

    const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
    const { data } = token ? await db.auth.getUser(token) : { data: { user: null } };
    const user = data.user;
    if (!user) return json({ error: "Sign in to use the price tracker." }, 401);

    switch (body.action) {
      case "identify":
        return json(await identify(ctx, asString(body.url)));
      case "discover": {
        const country = body.country;
        if (!isCountryCode(country)) throw new UserError("Choose a country.");
        const identity = body.identity as ProductIdentity & { price: number | null };
        const stores = Array.isArray(body.stores) ? body.stores.map(asString).filter(Boolean) : [];
        return json(await discover(ctx, identity, country, stores, asString(body.excludeDomain)));
      }
      case "track":
        return json(await track(ctx, user.id, body.input as TrackInput));
      case "add-offer":
        return json(await addOffer(ctx, user.id, asString(body.productId), asString(body.url)));
      case "check":
        return json(await checkNow(ctx, user.id, asString(body.productId)));
      case "delete-account":
        return json(await deleteAccount(ctx, user.id));
      default:
        return json({ error: "Unknown action." }, 400);
    }
  } catch (error) {
    if (error instanceof UserError) return json({ error: error.message }, 400);
    console.error(error);
    return json({ error: "Something went wrong. Try again in a minute." }, 500);
  }
});
