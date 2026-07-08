"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 p-4"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <button
            aria-label="Close preview"
            onClick={onClose}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-warmwhite/10 text-warmwhite hover:bg-warmwhite/20"
          >
            <X size={20} />
          </button>

          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onNav(-1);
            }}
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-warmwhite/10 text-warmwhite hover:bg-warmwhite/20 md:left-8"
          >
            <ChevronLeft size={22} />
          </button>

          <motion.div
            key={images[index].src}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative h-[75vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={images[index].src} alt={images[index].alt} fill className="object-contain" />
          </motion.div>

          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNav(1);
            }}
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-warmwhite/10 text-warmwhite hover:bg-warmwhite/20 md:right-8"
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
