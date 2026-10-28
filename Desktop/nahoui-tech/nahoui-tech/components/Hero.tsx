import { ArrowDown, MessageCircle } from "lucide-react";
import { SITE, WHATSAPP_URL } from "@/lib/config";

function Blueprint() {
  return (
    <svg viewBox="0 0 480 480" className="h-full w-full text-glow" fill="none" aria-hidden="true">
      <defs>
        <pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" stroke="currentColor" strokeOpacity=".12" />
        </pattern>
      </defs>
      <rect width="480" height="480" fill="url(#g)" />
      <g stroke="currentColor" strokeOpacity=".55" strokeWidth="1.5">
        <circle className="draw" cx="240" cy="240" r="150" />
        <circle cx="240" cy="240" r="90" strokeOpacity=".25" />
        <path className="draw" d="M90 240H390M240 90V390" strokeOpacity=".3" />
        <path className="draw" d="M120 360L240 240L360 120" stroke="#3B82F6" strokeOpacity="1" strokeWidth="2.5" />
      </g>
      {[[120, 360], [240, 240], [360, 120]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="6" fill="#050A16" stroke="#3B82F6" strokeWidth="2.5" />
      ))}
      <g stroke="currentColor" strokeOpacity=".4">
        <path d="M60 430H420M60 422V438M420 422V438" />
      </g>
      <text x="240" y="456" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity=".6" fontFamily="monospace">design · build · scale</text>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <h1 className="hero-rise text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {SITE.slogan}
          </h1>
          <p lang="ar" dir="rtl" className="hero-rise hero-rise-2 mt-4 font-arabic text-2xl text-glow">{SITE.sloganAr}</p>
          <p className="hero-rise hero-rise-2 mt-6 max-w-xl text-lg leading-relaxed text-mist">
            We build digital experiences, develop innovative solutions, and help businesses grow through technology.
          </p>
          <div className="hero-rise hero-rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500">
              Explore Our Services <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:border-glow hover:bg-white/5">
              <MessageCircle size={18} aria-hidden="true" /> Contact Us on WhatsApp
            </a>
          </div>
        </div>
        <div className="mx-auto hidden aspect-square w-full max-w-md md:block"><Blueprint /></div>
      </div>
    </section>
  );
}
