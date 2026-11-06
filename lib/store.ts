// Tiny Upstash/Vercel-KV Redis client over REST (no extra dependency).
const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
export const storeConfigured = Boolean(URL_ && TOKEN);

async function run(cmd: (string | number)[]): Promise<unknown> {
  const res = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error ?? "Store error");
  return json.result;
}

export type Message = { id: string; name: string; email: string; service: string; message: string; createdAt: string; read: boolean };

const DATA = "messages:data";
const INDEX = "messages:index";

export async function saveMessage(m: Pick<Message, "name" | "email" | "service" | "message">) {
  const rec: Message = { ...m, id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false };
  await run(["HSET", DATA, rec.id, JSON.stringify(rec)]);
  await run(["ZADD", INDEX, Date.now(), rec.id]);
}

export async function listMessages(limit = 200): Promise<Message[]> {
  const ids = (await run(["ZRANGE", INDEX, 0, limit - 1, "REV"])) as string[];
  if (!ids?.length) return [];
  const vals = (await run(["HMGET", DATA, ...ids])) as (string | null)[];
  return vals.flatMap((v) => {
    try { return v ? [JSON.parse(v) as Message] : []; } catch { return []; }
  });
}

export async function setRead(id: string, read: boolean) {
  const v = (await run(["HGET", DATA, id])) as string | null;
  if (!v) return;
  await run(["HSET", DATA, id, JSON.stringify({ ...JSON.parse(v), read })]);
}

export async function deleteMessage(id: string) {
  await run(["ZREM", INDEX, id]);
  await run(["HDEL", DATA, id]);
}

// Rate limiting: Redis when available, in-memory (per instance) as a fallback.
const mem = new Map<string, { n: number; reset: number }>();
export async function rateLimit(key: string, limit: number, windowSec: number) {
  if (storeConfigured) {
    try {
      const n = (await run(["INCR", `rl:${key}`])) as number;
      if (n === 1) await run(["EXPIRE", `rl:${key}`, windowSec]);
      return n <= limit;
    } catch {}
  }
  const now = Date.now();
  const e = mem.get(key);
  if (!e || e.reset < now) { mem.set(key, { n: 1, reset: now + windowSec * 1000 }); return true; }
  e.n++;
  return e.n <= limit;
}
