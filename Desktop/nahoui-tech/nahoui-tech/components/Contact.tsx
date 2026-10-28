"use client";
import { useState, type FormEvent } from "react";
import { ExternalLink, Mail, MessageCircle, Send } from "lucide-react";
import { EMAIL, FACEBOOK_PAGE_URL, WHATSAPP_DISPLAY, WHATSAPP_URL, whatsappLink } from "@/lib/config";
import { SERVICES } from "@/lib/services";

type Errors = Partial<Record<"name" | "email" | "service" | "message", string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field = "mt-1.5 w-full rounded-lg border border-white/15 bg-ink px-3.5 py-3 text-white placeholder:text-slate-500 focus:border-accent";

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentLink, setSentLink] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const [name, email, service, message] = [v("name"), v("email"), v("service"), v("message")];

    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your full name.";
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address, like name@example.com.";
    if (!service) next.service = "Choose a service.";
    if (message.length < 10) next.message = "Write at least 10 characters so we understand your request.";
    setErrors(next);
    setSentLink(null);
    if (Object.keys(next).length) {
      (e.currentTarget.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus();
      return;
    }

    // No backend is configured, so inquiries are sent through WhatsApp.
    const text = `Hello NAHOUI TECH,\nName: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`;
    const link = whatsappLink(text);
    window.open(link, "_blank", "noopener,noreferrer");
    setSentLink(link);
  }

  const err = (id: keyof Errors) => errors[id] && (
    <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">{errors[id]}</p>
  );
  const aria = (id: keyof Errors) => ({ "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-error` : undefined });

  return (
    <section id="contact" className="border-t border-white/10 bg-navy">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Let’s Talk</h2>
          <p className="mt-3 max-w-md text-mist">WhatsApp is the fastest way to reach us. You can also email us or use the form.</p>

          <ul className="mt-9 space-y-4">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-white/10 bg-panel/60 p-4 transition-colors hover:border-accent/60">
                <MessageCircle className="text-glow" aria-hidden="true" />
                <span><span className="block text-sm text-mist">WhatsApp</span><span className="font-medium text-white">{WHATSAPP_DISPLAY}</span></span>
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-xl border border-white/10 bg-panel/60 p-4 transition-colors hover:border-accent/60">
                <Mail className="text-glow" aria-hidden="true" />
                <span className="min-w-0"><span className="block text-sm text-mist">Email</span><span className="break-all font-medium text-white">{EMAIL}</span></span>
              </a>
            </li>
            <li>
              {FACEBOOK_PAGE_URL ? (
                <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-white/10 bg-panel/60 p-4 transition-colors hover:border-accent/60">
                  <ExternalLink className="text-glow" aria-hidden="true" />
                  <span><span className="block text-sm text-mist">Facebook</span><span className="font-medium text-white">Visit our Facebook page</span></span>
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-white/15 p-4" role="note">
                  <ExternalLink className="text-slate-500" aria-hidden="true" />
                  <span><span className="block text-sm text-mist">Facebook</span><span className="text-sm text-slate-400">Page link not set yet. Add it to FACEBOOK_PAGE_URL in lib/config.ts.</span></span>
                </div>
              )}
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-white/10 bg-panel/60 p-6 sm:p-8">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-white">Full Name</label>
            <input id="name" name="name" type="text" autoComplete="name" className={field} {...aria("name")} />
            {err("name")}
          </div>
          <div className="mt-5">
            <label htmlFor="email" className="text-sm font-medium text-white">Email Address</label>
            <input id="email" name="email" type="email" autoComplete="email" className={field} {...aria("email")} />
            {err("email")}
          </div>
          <div className="mt-5">
            <label htmlFor="service" className="text-sm font-medium text-white">Service of Interest</label>
            <select id="service" name="service" defaultValue="" className={field} {...aria("service")}>
              <option value="" disabled>Select a service</option>
              {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
              <option value="Other">Other</option>
            </select>
            {err("service")}
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="text-sm font-medium text-white">Message</label>
            <textarea id="message" name="message" rows={5} className={field} {...aria("message")} />
            {err("message")}
          </div>

          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500">
            <Send size={18} aria-hidden="true" /> Send Message
          </button>
          <p className="mt-3 text-xs text-slate-400">Your message opens in WhatsApp, ready to send. It is delivered only after you press send there.</p>

          <div aria-live="polite">
            {sentLink && (
              <p className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm text-slate-100">
                WhatsApp should now be open with your message. If nothing opened,{" "}
                <a href={sentLink} target="_blank" rel="noopener noreferrer" className="font-medium text-glow underline">open WhatsApp here</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
