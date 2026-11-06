import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, sessionSecret, verifyToken } from "./session";

export async function isAdmin() {
  const secret = sessionSecret();
  const token = (await cookies()).get(COOKIE)?.value;
  return Boolean(secret && token && (await verifyToken(token, secret)));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
