"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionWatermark from "./SectionWatermark";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-beige/40 py-24 dark:bg-charcoal/40 md:py-32">
      <SectionWatermark text="LOVED" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Kind Words</span>
          <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
            Testimonials
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass flex flex-col rounded-3xl p-6 shadow-soft"
            >
              <Quote className="mb-3 text-gold/50" size={26} />
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="flex-1 text-sm italic leading-relaxed text-charcoal/80 dark:text-warmwhite/80">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold">{t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
