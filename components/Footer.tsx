"use client";
import Logo from "./Logo";
import Year from "./Year";
import { EMAIL, FACEBOOK_PAGE_URL, NAV_LINKS, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/config";
import { useLang } from "@/lib/i18n";

const link = "text-mist transition-colors hover:text-white";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div><Logo /><p className="mt-3 text-sm text-mist">{t.slogan}</p></div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-white">{t.footerLinks}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((l, i) => <li key={l.href}><a href={l.href} className={link}>{t.nav[i]}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white">{t.footerTouch}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={link}>{t.whatsapp}: <span dir="ltr">{WHATSAPP_DISPLAY}</span></a></li>
            <li><a href={`mailto:${EMAIL}`} dir="ltr" className={`${link} inline-block break-all`}>{EMAIL}</a></li>
            {FACEBOOK_PAGE_URL && <li><a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className={link}>{t.facebook}</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">© <Year /> NAHOUI TECH. {t.rights}</div>
    </footer>
  );
}
