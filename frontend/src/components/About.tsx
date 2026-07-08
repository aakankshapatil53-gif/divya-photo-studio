"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="image-zoom relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft"
        >
          <Image src="/owner/sharad-deore.jpg" alt="Sharad Gulabrao Deore, owner of Divya Photo Studio" fill className="object-cover" />
          <div className="absolute bottom-5 left-5 glass rounded-2xl px-5 py-3">
            <p className="font-display text-sm text-charcoal dark:text-warmwhite">Sharad Gulabrao Deore</p>
            <p className="text-[11px] uppercase tracking-wide text-gold">Founder & Lead Photographer</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold">About the Studio</span>
          <h2 className="gold-underline mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
            A Timeless Story, <br /> In Every Photograph.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/75 dark:text-warmwhite/75">
            Divya Photo Studio believes every photograph should tell a timeless story. From weddings and
            pre-wedding shoots to baby photography and family events, we capture emotions with creativity and
            perfection.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold/30 px-5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-sm font-medium text-charcoal dark:text-warmwhite">Trusted Photography Studio</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
