"use client";
import { SERVICE_ICONS } from "@/lib/services";
import { useLang } from "@/lib/i18n";

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t.servicesTitle}</h2>
        <p className="mt-3 max-w-xl text-mist">{t.servicesIntro}</p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map(({ title, description }, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <li key={i} className="rounded-xl border border-white/10 bg-panel/60 p-6 transition-colors hover:border-accent/60">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-glow"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
