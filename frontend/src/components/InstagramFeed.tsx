"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

// If NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN is configured on the backend,
// live posts can be fetched via /api/instagram (see backend/src/routes).
// Until then, these gallery placeholders are shown.
const PLACEHOLDER_POSTS = [
  "/gallery/wedding/placeholder-1.jpg",
  "/gallery/pre-wedding/placeholder-1.jpg",
  "/gallery/birthday/placeholder-1.jpg",
  "/gallery/baby/placeholder-1.jpg",
  "/gallery/maternity/placeholder-1.jpg",
  "/gallery/events/placeholder-1.jpg",
];

export default function InstagramFeed() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">Follow Along</span>
        <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
          @sharad.deore.180
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-3 md:grid-cols-6">
        {PLACEHOLDER_POSTS.map((src, i) => (
          <motion.a
            key={src + i}
            href="https://instagram.com/sharad.deore.180"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="image-zoom group relative aspect-square overflow-hidden rounded-xl shadow-soft"
          >
            <Image src={src} alt="Instagram post" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition group-hover:bg-charcoal/50">
              <Instagram className="text-warmwhite opacity-0 transition group-hover:opacity-100" size={22} />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://instagram.com/sharad.deore.180"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-charcoal shadow-gold"
        >
          <Instagram size={16} /> Follow on Instagram
        </a>
      </div>
    </section>
  );
}
