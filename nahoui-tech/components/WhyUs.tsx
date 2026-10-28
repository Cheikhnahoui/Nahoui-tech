import { BadgeCheck, Cpu, Lightbulb, MessagesSquare, ShieldCheck, Users, type LucideIcon } from "lucide-react";

const POINTS: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Modern Technology", text: "Current tools and frameworks chosen to fit your project.", icon: Cpu },
  { title: "Creative Solutions", text: "Fresh ideas applied to practical, real-world needs.", icon: Lightbulb },
  { title: "Professional Execution", text: "Organized work, clear steps, and clean delivery.", icon: BadgeCheck },
  { title: "Client-Focused Approach", text: "Your goals guide every decision we make.", icon: Users },
  { title: "Reliable Communication", text: "Clear updates and quick answers throughout the project.", icon: MessagesSquare },
  { title: "Commitment to Quality", text: "Careful attention to detail in design and code.", icon: ShieldCheck },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="border-t border-white/10 bg-navy">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Why Choose Us?</h2>
        <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map(({ title, text, icon: Icon }) => (
            <li key={title} className="flex gap-4">
              <Icon className="mt-1 shrink-0 text-accent" size={22} aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mist">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
