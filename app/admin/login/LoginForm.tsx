"use client";
import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="w-full max-w-sm rounded-2xl border border-white/10 bg-panel/60 p-8">
      <h1 className="text-2xl font-semibold text-white">دخول الإدارة</h1>
      <label htmlFor="password" className="mt-6 block text-sm font-medium text-white">كلمة المرور</label>
      <input id="password" name="password" type="password" required autoComplete="current-password" dir="ltr"
        className="mt-1.5 w-full rounded-lg border border-white/15 bg-ink px-3.5 py-3 text-white focus:border-accent" />
      {state?.error && <p role="alert" className="mt-3 text-sm text-red-400">{state.error}</p>}
      <button type="submit" disabled={pending}
        className="mt-6 w-full rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-60">
        {pending ? "جارٍ التحقق…" : "دخول"}
      </button>
    </form>
  );
}
