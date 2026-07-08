"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Heart, Share2 } from "lucide-react";
import { galleryImages, galleryCategories, GalleryCategory } from "@/data/gallery";
import Lightbox from "./Lightbox";
import SectionWatermark from "./SectionWatermark";

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return galleryImages.filter((img) => {
      const matchesCategory = filter === "all" || img.category === filter;
      const matchesQuery = query.trim() === "" || img.category.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="gallery" className="relative overflow-hidden py-24 md:py-32">
      <SectionWatermark text="GALLERY" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Featured Work</span>
          <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
            Our Pinboard
          </h2>
          <p className="mt-3 text-sm text-charcoal/60 dark:text-warmwhite/60">
            A living board of moments we&apos;ve captured — tap the heart to save your favourites.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-warmwhite/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gallery (e.g. wedding)"
              className="w-full rounded-full border border-gold/30 bg-transparent py-2.5 pl-11 pr-4 text-sm outline-none placeholder:text-charcoal/40 dark:placeholder:text-warmwhite/40"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {galleryCategories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition ${
                  filter === c.key
                    ? "bg-gold-gradient text-charcoal shadow-gold"
                    : "border border-gold/30 text-charcoal/70 hover:border-gold dark:text-warmwhite/70"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* True Pinterest-style waterfall masonry via CSS columns — each pin can be
            any height, cards tilt slightly and lift on hover like a real pinboard. */}
        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, rotate: 0 }}
              transition={{ duration: 0.45, delay: (i % 8) * 0.04 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[1.4rem] shadow-soft"
            >
              <button onClick={() => setLightboxIndex(i)} className="image-zoom relative block w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={img.span === "tall" ? 800 : img.span === "wide" ? 420 : 600}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 text-xs font-medium capitalize text-warmwhite opacity-0 transition group-hover:opacity-100">
                  {img.category.replace("-", " ")}
                </span>
              </button>

              {/* Pin actions — save + share, the unmistakable Pinterest gesture */}
              <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(img.id);
                  }}
                  aria-label="Save to favourites"
                  className={`grid h-9 w-9 place-items-center rounded-full shadow-soft backdrop-blur transition ${
                    saved.has(img.id) ? "bg-gold text-charcoal" : "bg-charcoal/60 text-warmwhite hover:bg-charcoal/80"
                  }`}
                >
                  <Heart size={15} className={saved.has(img.id) ? "fill-charcoal" : ""} />
                </button>
                <button
                  aria-label="Share"
                  className="grid h-9 w-9 place-items-center rounded-full bg-charcoal/60 text-warmwhite shadow-soft backdrop-blur transition hover:bg-charcoal/80"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-charcoal/60 dark:text-warmwhite/60">
            No photos in this category yet — add some to <code>public/gallery/{filter}</code>.
          </p>
        )}

        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={(dir) =>
            setLightboxIndex((cur) => {
              if (cur === null) return cur;
              const next = (cur + dir + filtered.length) % filtered.length;
              return next;
            })
          }
        />
      </div>
    </section>
  );
}
