"use client";
import { motion } from "framer-motion";
import { CalendarCheck, MessagesSquare, Camera, Wand2, BookImage } from "lucide-react";

const STEPS = [
  { icon: CalendarCheck, label: "Book" },
  { icon: MessagesSquare, label: "Discussion" },
  { icon: Camera, label: "Shoot" },
  { icon: Wand2, label: "Editing" },
  { icon: BookImage, label: "Album Delivery" },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-charcoal py-24 text-warmwhite md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">How It Works</span>
          <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl md:text-5xl">Our Process</h2>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-charcoal shadow-gold">
                <s.icon size={26} />
              </div>
              <p className="text-sm font-medium tracking-wide">{s.label}</p>
              {i < STEPS.length - 1 && <span className="hidden text-gold md:-mt-2 md:block md:translate-x-24">— — —</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
