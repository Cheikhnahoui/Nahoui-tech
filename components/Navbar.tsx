"use client";
import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, toggle } = useLang();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white">{t.skip}</a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
          <a href="#home" aria-label="NAHOUI TECH" onClick={() => setOpen(false)}><Logo /></a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}><a href={l.href} className="text-sm text-mist transition-colors hover:text-white">{t.nav[i]}</a></li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button type="button" onClick={toggle} aria-label={t.switchAria} lang={t.switchShort === "EN" ? "en" : "ar"}
              className="rounded-lg border border-white/15 px-2.5 py-2 text-sm text-white transition-colors hover:border-glow">{t.switchShort}</button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={t.contactBtn}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 sm:px-4">
              <MessageCircle size={16} aria-hidden="true" /> <span className="hidden min-[430px]:inline">{t.contactBtn}</span>
            </a>
            <button type="button" className="rounded-lg p-2 text-white md:hidden" aria-expanded={open} aria-controls="mobile-menu"
              aria-label={open ? t.closeMenu : t.openMenu} onClick={() => setOpen((v) => !v)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <ul id="mobile-menu" className="border-t border-white/10 bg-ink px-5 pb-4 md:hidden">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/5 py-3 text-mist hover:text-white">{t.nav[i]}</a></li>
            ))}
          </ul>
        )}
      </header>
    </>
  );
}
