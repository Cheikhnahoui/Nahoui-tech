"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { COOKIE, SESSION_SECONDS, createToken, passwordMatches, sessionSecret } from "@/lib/session";
import { deleteMessage, rateLimit, setRead } from "@/lib/store";

export async function loginAction(_prev: { error?: string } | undefined, fd: FormData) {
  const secret = sessionSecret();
  const expected = process.env.ADMIN_PASSWORD;
  if (!secret || !expected) return { error: "لوحة الإدارة غير مهيأة بعد: أضف ADMIN_PASSWORD و ADMIN_SESSION_SECRET (32 حرفاً على الأقل)." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!(await rateLimit(`login:${ip}`, 5, 900))) return { error: "محاولات كثيرة. حاول مرة أخرى بعد 15 دقيقة." };

  const ok = await passwordMatches(String(fd.get("password") ?? ""), expected, secret);
  await new Promise((r) => setTimeout(r, 500)); // slow down guessing
  if (!ok) return { error: "كلمة المرور غير صحيحة." };

  (await cookies()).set(COOKIE, await createToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logoutAction() {
  (await cookies()).delete(COOKIE);
  redirect("/admin/login");
}

export async function toggleReadAction(fd: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  await setRead(String(fd.get("id")), fd.get("read") === "1");
  revalidatePath("/admin");
}

export async function deleteAction(fd: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  await deleteMessage(String(fd.get("id")));
  revalidatePath("/admin");
}
