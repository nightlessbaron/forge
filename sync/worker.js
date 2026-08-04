/* Forge sync — one user, one log, one password.
   GET  /  -> the stored log as JSON ("null" if nothing stored yet)
   PUT  /  -> replace the stored log
   Both require the x-forge-pass header to match the FORGE_PASSWORD secret. */

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type,x-forge-pass",
  "access-control-allow-methods": "GET,PUT,OPTIONS",
  "access-control-max-age": "86400",
};

/* Length-independent compare so a wrong password leaks nothing via timing.
   ponytail: fine for one user behind Cloudflare; add rate limiting only if
   this ever stops being a single-person app. */
function same(a, b) {
  const x = new TextEncoder().encode(a), y = new TextEncoder().encode(b);
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return d === 0;
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    const secret = env.FORGE_PASSWORD;
    if (!secret) return new Response("FORGE_PASSWORD secret is not set", { status: 500, headers: cors });
    if (!same(req.headers.get("x-forge-pass") || "", secret))
      return new Response("wrong password", { status: 401, headers: cors });

    if (req.method === "GET") {
      const v = await env.FORGE.get("log");
      return new Response(v ?? "null", { headers: { ...cors, "content-type": "application/json" } });
    }

    if (req.method === "PUT") {
      const body = await req.text();
      /* Never let a malformed or empty body replace a good log. */
      let p;
      try { p = JSON.parse(body); } catch (e) { return new Response("not json", { status: 400, headers: cors }); }
      if (!p || typeof p !== "object" || !p.days) return new Response("not a forge log", { status: 400, headers: cors });
      await env.FORGE.put("log", body);
      return new Response("ok", { headers: cors });
    }

    return new Response("use GET or PUT", { status: 405, headers: cors });
  },
};
