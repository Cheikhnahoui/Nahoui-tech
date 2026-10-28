"use client";
import { BadgeCheck, Cpu, Lightbulb, MessagesSquare, ShieldCheck, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";

const ICONS = [Cpu, Lightbulb, BadgeCheck, Users, MessagesSquare, ShieldCheck];

export default function WhyUs() {
  const { t } = useLang();
  return (
    <section id="why-us" className="border-t border-white/10 bg-navy">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t.whyTitle}</h2>
        <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.map(({ title, text }, i) => {
            const Icon = ICONS[i];
            return (
              <li key={i} className="flex gap-4">
                <Icon className="mt-1 shrink-0 text-accent" size={22} aria-hidden="true" />
                <div><h3 className="font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-relaxed text-mist">{text}</p></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
