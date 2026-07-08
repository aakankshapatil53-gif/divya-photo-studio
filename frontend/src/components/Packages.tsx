"use client";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { packages } from "@/data/packages";
import SectionWatermark from "./SectionWatermark";

export default function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-charcoal py-24 text-warmwhite md:py-32">
      <SectionWatermark text="PACKAGES" variant="onDark" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Investment</span>
          <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl md:text-5xl">Packages</h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {packages.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                p.highlighted
                  ? "bg-gold-gradient text-charcoal shadow-gold md:-translate-y-4 md:scale-105"
                  : "glass shadow-soft"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-charcoal px-4 py-1.5 text-xs font-semibold tracking-wide text-gold">
                  <Sparkles size={12} /> Most Popular
                </span>
              )}
              <h3 className={`font-display text-2xl ${p.highlighted ? "text-charcoal" : "text-warmwhite"}`}>{p.name}</h3>
              <p className={`mt-3 font-display text-4xl ${p.highlighted ? "text-charcoal" : "text-gold"}`}>{p.price}</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={16} className={p.highlighted ? "text-charcoal" : "text-gold"} />
                    <span className={p.highlighted ? "text-charcoal/85" : "text-warmwhite/80"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold tracking-wide transition ${
                  p.highlighted
                    ? "bg-charcoal text-gold hover:bg-charcoal/90"
                    : "bg-gold-gradient text-charcoal hover:brightness-105"
                }`}
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-warmwhite/50">
          Edit pricing anytime in <code className="text-gold/80">src/data/packages.ts</code>
        </p>
      </div>
    </section>
  );
}
