import { requireAdmin } from "@/lib/auth";
import { listMessages, storeConfigured, type Message } from "@/lib/store";
import { deleteAction, logoutAction, toggleReadAction } from "./actions";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("ar", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Nouakchott" });

export default async function AdminPage() {
  await requireAdmin();

  let messages: Message[] = [];
  let failed = false;
  if (storeConfigured) {
    try { messages = await listMessages(); } catch { failed = true; }
  }
  const unread = messages.filter((m) => !m.read).length;

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">رسائل الموقع</h1>
          <p className="mt-1 text-sm text-mist">{messages.length} رسالة، منها {unread} غير مقروءة</p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:border-glow">تسجيل الخروج</button>
        </form>
      </header>

      {!storeConfigured && (
        <p role="alert" className="mt-8 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
          قاعدة البيانات غير موصولة بعد، لذلك لا تُحفظ الرسائل. أضف Upstash Redis من Vercel (Storage) ثم أعد النشر.
        </p>
      )}
      {failed && <p role="alert" className="mt-8 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">تعذّر تحميل الرسائل من قاعدة البيانات.</p>}
      {storeConfigured && !failed && messages.length === 0 && <p className="mt-10 text-mist">لا توجد رسائل بعد.</p>}

      <ul className="mt-8 space-y-4">
        {messages.map((m) => (
          <li key={m.id} className={`rounded-xl border p-5 ${m.read ? "border-white/10 bg-panel/40" : "border-accent/50 bg-panel/80"}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold text-white">
                  {!m.read && <span className="me-2 inline-block h-2 w-2 rounded-full bg-accent align-middle" aria-label="غير مقروءة" />}
                  {m.name}
                </h2>
                <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + m.service)}`} dir="ltr" className="text-sm text-glow underline">{m.email}</a>
              </div>
              <time dateTime={m.createdAt} className="text-sm text-mist">{fmt(m.createdAt)}</time>
            </div>
            <p className="mt-3 text-sm text-mist">الخدمة: <span className="text-white">{m.service}</span></p>
            <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed text-slate-100">{m.message}</p>
            <div className="mt-4 flex gap-2">
              <form action={toggleReadAction}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="read" value={m.read ? "0" : "1"} />
                <button type="submit" className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-white transition-colors hover:border-glow">
                  {m.read ? "تعليم كغير مقروءة" : "تعليم كمقروءة"}
                </button>
              </form>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={m.id} />
                <DeleteButton />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
