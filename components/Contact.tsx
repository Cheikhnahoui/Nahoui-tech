"use client";
import { useState, type FormEvent } from "react";
import { ExternalLink, Mail, MessageCircle, Send } from "lucide-react";
import { EMAIL, FACEBOOK_PAGE_URL, WHATSAPP_DISPLAY, WHATSAPP_URL, whatsappLink } from "@/lib/config";
import { useLang } from "@/lib/i18n";

type Key = "name" | "email" | "service" | "message";
type Errors = Partial<Record<Key, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const field = "mt-1.5 w-full rounded-lg border border-white/15 bg-ink px-3.5 py-3 text-white placeholder:text-slate-500 focus:border-accent";
const card = "flex items-center gap-4 rounded-xl border border-white/10 bg-panel/60 p-4 transition-colors hover:border-accent/60";

export default function Contact() {
  const { t } = useLang();
  const f = t.form;
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const [name, email, svc, message] = [v("name"), v("email"), v("service"), v("message")];

    const next: Errors = {};
    if (name.length < 2) next.name = f.eName;
    if (!EMAIL_RE.test(email)) next.email = f.eEmail;
    if (!svc) next.service = f.eService;
    if (message.length < 10) next.message = f.eMessage;
    setErrors(next);
    setSentLink(null);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => (form.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus());
      return;
    }

    // No backend is configured, so inquiries are sent through WhatsApp.
    const service = svc === "other" ? f.other : t.services[Number(svc)].title;
    const text = `${f.waHello}\n${f.waName}: ${name}\n${f.waEmail}: ${email}\n${f.waService}: ${service}\n\n${message}`;
    const link = whatsappLink(text);
    window.open(link, "_blank", "noopener,noreferrer");
    setSentLink(link);
  }

  const err = (id: Key) => errors[id] && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">{errors[id]}</p>;
  const aria = (id: Key) => ({ "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-error` : undefined });

  return (
    <section id="contact" className="border-t border-white/10 bg-navy">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t.contactTitle}</h2>
          <p className="mt-3 max-w-md leading-relaxed text-mist">{t.contactIntro}</p>
          <ul className="mt-9 space-y-4">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={card}>
                <MessageCircle className="text-glow" aria-hidden="true" />
                <span><span className="block text-sm text-mist">{t.whatsapp}</span><span dir="ltr" className="block font-medium text-white">{WHATSAPP_DISPLAY}</span></span>
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={card}>
                <Mail className="text-glow" aria-hidden="true" />
                <span className="min-w-0"><span className="block text-sm text-mist">{t.email}</span><span dir="ltr" className="block break-all font-medium text-white">{EMAIL}</span></span>
              </a>
            </li>
            <li>
              {FACEBOOK_PAGE_URL ? (
                <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className={card}>
                  <ExternalLink className="text-glow" aria-hidden="true" />
                  <span><span className="block text-sm text-mist">{t.facebook}</span><span className="font-medium text-white">{t.fbVisit}</span></span>
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-white/15 p-4" role="note">
                  <ExternalLink className="text-slate-500" aria-hidden="true" />
                  <span><span className="block text-sm text-mist">{t.facebook}</span><span className="text-sm text-slate-400">{t.fbMissing}</span></span>
                </div>
              )}
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-white/10 bg-panel/60 p-6 sm:p-8">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-white">{f.name}</label>
            <input id="name" name="name" type="text" autoComplete="name" className={field} {...aria("name")} />
            {err("name")}
          </div>
          <div className="mt-5">
            <label htmlFor="email" className="text-sm font-medium text-white">{f.email}</label>
            <input id="email" name="email" type="email" dir="ltr" autoComplete="email" className={`${field} text-start`} {...aria("email")} />
            {err("email")}
          </div>
          <div className="mt-5">
            <label htmlFor="service" className="text-sm font-medium text-white">{f.service}</label>
            <select id="service" name="service" defaultValue="" className={field} {...aria("service")}>
              <option value="" disabled>{f.select}</option>
              {t.services.map((s, i) => <option key={i} value={String(i)}>{s.title}</option>)}
              <option value="other">{f.other}</option>
            </select>
            {err("service")}
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="text-sm font-medium text-white">{f.message}</label>
            <textarea id="message" name="message" rows={5} className={field} {...aria("message")} />
            {err("message")}
          </div>
          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500">
            <Send size={18} aria-hidden="true" className="rtl:-scale-x-100" /> {f.send}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{f.note}</p>
          <div aria-live="polite">
            {sentLink && (
              <p className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm leading-relaxed text-slate-100">
                {f.sent}{" "}<a href={sentLink} target="_blank" rel="noopener noreferrer" className="font-medium text-glow underline">{f.sentLink}</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
