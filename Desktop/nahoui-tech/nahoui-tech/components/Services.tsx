import { SERVICES } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Our Services</h2>
        <p className="mt-3 max-w-xl text-mist">From first idea to a finished digital product, here is what we can do for you.</p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, description, icon: Icon }) => (
            <li key={title} className="group rounded-xl border border-white/10 bg-panel/60 p-6 transition-colors hover:border-accent/60">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-glow">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
