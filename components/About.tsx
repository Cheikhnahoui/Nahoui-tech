"use client";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="border-t border-white/10 bg-navy">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-24 md:grid-cols-[.8fr_1.2fr] md:gap-16">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t.aboutTitle}</h2>
        <p className="max-w-prose text-lg leading-loose text-mist">{t.aboutText}</p>
      </div>
    </section>
  );
}
