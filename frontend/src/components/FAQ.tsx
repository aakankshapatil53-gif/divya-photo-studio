"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-beige/40 py-24 dark:bg-charcoal/40 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Questions</span>
          <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
            Frequently Asked
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium text-charcoal dark:text-warmwhite">{f.q}</span>
                <ChevronDown className={`shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`} size={18} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal/70 dark:text-warmwhite/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
