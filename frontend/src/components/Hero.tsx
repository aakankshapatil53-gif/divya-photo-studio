"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SLIDES = ["/hero/slide-1.jpg", "/hero/slide-2.jpg", "/hero/slide-3.jpg", "/hero/slide-4.jpg"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-charcoal pt-28 md:pt-0">
      {/* Giant faint outline word behind everything — editorial / Pinterest board-title feel */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none text-warmwhite/[0.04] md:text-[15vw]"
      >
        DIVYA
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:gap-8 md:px-10 md:py-28">
        {/* Left: editorial text block, asymmetric, left-aligned not centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <span className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" /> Divya Photo Studio
          </span>

          <h1 className="font-display text-4xl leading-[1.08] text-warmwhite sm:text-5xl md:text-6xl lg:text-7xl">
            Capturing
            <br />
            <span className="italic text-gold">Love,</span> Creating
            <br />
            Memories.
          </h1>

          <p className="mt-7 max-w-md text-sm leading-relaxed text-warmwhite/60 md:text-base">
            Preserving forever, one frame at a time — premium wedding, pre-wedding,
            and portrait photography based in Dhule, Maharashtra.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#booking"
              className="rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-semibold tracking-wide text-charcoal shadow-gold transition hover:brightness-105"
            >
              Book Your Shoot
            </a>
            <a
              href="#gallery"
              className="group flex items-center gap-2 text-sm font-medium tracking-wide text-warmwhite transition hover:text-gold"
            >
              View Gallery
              <span className="inline-block transition group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-14 flex gap-10 border-t border-warmwhite/10 pt-6">
            <div>
              <p className="font-display text-2xl text-gold">5000+</p>
              <p className="text-[11px] uppercase tracking-wide text-warmwhite/50">Happy Clients</p>
            </div>
            <div>
              <p className="font-display text-2xl text-gold">10+</p>
              <p className="text-[11px] uppercase tracking-wide text-warmwhite/50">Years Experience</p>
            </div>
            <div>
              <p className="font-display text-2xl text-gold">24×7</p>
              <p className="text-[11px] uppercase tracking-wide text-warmwhite/50">Available</p>
            </div>
          </div>
        </motion.div>

        {/* Right: tilted photo-stack collage — the distinctly Pinterest-board touch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm md:max-w-none"
        >
          {SLIDES.slice(0, 3).map((src, i) => {
            const rotations = [-6, 4, -2];
            const offsets = [
              "inset-0",
              "left-8 top-10 md:left-14 md:top-16",
              "left-4 top-20 md:left-6 md:top-28",
            ];
            const sizes = ["h-[78%] w-[78%]", "h-[62%] w-[62%]", "h-[50%] w-[50%]"];
            const z = [10, 20, 30];
            return (
              <motion.div
                key={src}
                className={`image-zoom absolute ${offsets[i]} ${sizes[i]} overflow-hidden rounded-[1.75rem] border-4 border-warmwhite/10 shadow-soft`}
                style={{ zIndex: z[i] }}
                initial={{ rotate: rotations[i] }}
                animate={{ rotate: index % 3 === i ? rotations[i] + 2 : rotations[i] }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                transition={{ duration: 0.6 }}
              >
                <Image src={src} alt="Wedding photography by Divya Photo Studio" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              </motion.div>
            );
          })}

          {/* Pin-style floating badge, like a saved Pinterest pin */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="glass absolute -bottom-4 right-2 z-40 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-soft md:right-6"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            <span className="text-xs font-medium text-charcoal dark:text-warmwhite">Preserving Forever ✦</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 md:px-10 md:pb-16">
        <div className="flex justify-center gap-2 md:justify-start">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-1.5 bg-warmwhite/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
