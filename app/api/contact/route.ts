import { NextResponse } from "next/server";
import { rateLimit, saveMessage, storeConfigured } from "@/lib/store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) =>
  String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  // Same-origin only.
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== req.headers.get("host")) throw new Error();
    } catch {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }

  if (clean(body.website, 50)) return NextResponse.json({ ok: true }); // honeypot: silently drop bots

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const service = clean(body.service, 100);
  const message = clean(body.message, 2000);
  if (name.length < 2 || !EMAIL_RE.test(email) || !service || message.length < 10) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (!storeConfigured) return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!(await rateLimit(`contact:${ip}`, 5, 3600))) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  try {
    await saveMessage({ name, email, service, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
  }
}
