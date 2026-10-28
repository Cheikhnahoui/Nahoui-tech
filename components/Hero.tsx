"use client";
import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { t, lang } = useLang();
  const otherLang = lang === "ar" ? "en" : "ar";
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <h1 className="hero-rise text-[2.6rem] font-semibold leading-[1.25] text-white sm:text-6xl lg:text-7xl">{t.slogan}</h1>
          <p lang={otherLang} dir={otherLang === "ar" ? "rtl" : "ltr"} className="hero-rise hero-rise-2 mt-3 text-xl text-glow sm:text-2xl">{t.sloganOther}</p>
          <p className="hero-rise hero-rise-2 mt-6 max-w-xl text-lg leading-loose text-mist">{t.heroText}</p>
          <div className="hero-rise hero-rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500">
              {t.exploreBtn} <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:border-glow hover:bg-white/5">
              <MessageCircle size={18} aria-hidden="true" /> {t.whatsappBtn}
            </a>
          </div>
        </div>
        <div className="hero-rise hero-rise-3 mx-auto w-full max-w-[300px] md:max-w-md">
          <Image src="/logo.webp" alt={t.logoAlt} width={720} height={729} priority sizes="(min-width: 768px) 448px, 300px"
            className="h-auto w-full rounded-3xl ring-1 ring-accent/30 shadow-[0_0_80px_-20px_rgba(59,130,246,.6)]" />
        </div>
      </div>
    </section>
  );
}
