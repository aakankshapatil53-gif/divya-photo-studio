"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import SectionWatermark from "./SectionWatermark";

// Bento-style asymmetric sizing — repeats every 6 cards so any number of
// services still tiles cleanly, but no two neighbouring cards look alike.
const SIZE_PATTERN = [
  "md:col-span-4 md:row-span-2 aspect-[4/5] md:aspect-auto",
  "md:col-span-2 md:row-span-1 aspect-square",
  "md:col-span-2 md:row-span-1 aspect-square",
  "md:col-span-3 md:row-span-1 aspect-[4/3]",
  "md:col-span-3 md:row-span-1 aspect-[4/3]",
  "md:col-span-2 md:row-span-2 aspect-[3/5] md:aspect-auto",
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-beige/40 py-24 dark:bg-charcoal/40 md:py-32">
      <SectionWatermark text="SERVICES" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">What We Offer</span>
            <h2 className="gold-underline mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
              Our Services
            </h2>
          </div>
          <p className="max-w-xs text-sm text-charcoal/60 dark:text-warmwhite/60">
            From intimate portraits to full wedding productions — every service, one studio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-6 md:auto-rows-[160px] md:gap-5">
          {services.map((s, i) => {
            const size = SIZE_PATTERN[i % SIZE_PATTERN.length];
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                className={`image-zoom group relative overflow-hidden rounded-3xl shadow-soft ${size}`}
              >
                <Image src={s.image} alt={s.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent transition-opacity" />

                <div className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-warmwhite/10 text-gold backdrop-blur">
                  <Camera size={16} />
                </div>

                <a
                  href="#booking"
                  className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-gold-gradient text-charcoal opacity-0 shadow-gold transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  aria-label={`Book ${s.title}`}
                >
                  <ArrowUpRight size={16} />
                </a>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-lg text-warmwhite md:text-xl">{s.title}</h3>
                  <p className="mt-1 line-clamp-2 max-w-xs text-xs leading-relaxed text-warmwhite/70 opacity-0 transition group-hover:opacity-100">
                    {s.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
