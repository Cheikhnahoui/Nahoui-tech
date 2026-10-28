import Logo from "./Logo";
import Year from "./Year";
import { EMAIL, FACEBOOK_PAGE_URL, NAV_LINKS, SITE, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/config";

const link = "text-mist transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-mist">{SITE.slogan}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-white">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((l) => <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white">Get in touch</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp: {WHATSAPP_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`} className={`${link} break-all`}>{EMAIL}</a></li>
            {FACEBOOK_PAGE_URL && <li><a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className={link}>Facebook</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © <Year /> NAHOUI TECH. All rights reserved.
      </div>
    </footer>
  );
}
