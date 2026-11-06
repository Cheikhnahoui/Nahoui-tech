// Signed, expiring session tokens. Uses Web Crypto so it runs in middleware (edge) and Node.
export const COOKIE = "nt_admin";
export const SESSION_SECONDS = 8 * 60 * 60;

const enc = new TextEncoder();

function b64url(bytes: Uint8Array) {
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function hmac(data: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data))));
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

/** Returns the secret only if it is strong enough (32+ chars). */
export function sessionSecret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

export async function createToken(secret: string) {
  const payload = `v1.${Math.floor(Date.now() / 1000) + SESSION_SECONDS}`;
  return `${payload}.${await hmac(payload, secret)}`;
}

export async function verifyToken(token: string, secret: string) {
  const [v, exp, sig] = token.split(".");
  if (v !== "v1" || !exp || !sig) return false;
  const expires = Number(exp);
  if (!expires || expires < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(await hmac(`v1.${exp}`, secret), sig);
}

/** Constant-time password check (compares HMACs, so length never leaks). */
export async function passwordMatches(input: string, expected: string, secret: string) {
  return safeEqual(await hmac(input, secret), await hmac(expected, secret));
}
