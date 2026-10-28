import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";

export default function CTA() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 to-panel px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready to Build Something Great?</h2>
          <p className="mx-auto mt-4 max-w-lg text-mist">Let’s turn your ideas into practical digital solutions.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 font-medium text-white transition-colors hover:bg-blue-500">
            <MessageCircle size={18} aria-hidden="true" /> Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
