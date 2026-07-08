"use client";
import { motion } from "framer-motion";
import { Users, Image as ImageIcon, Wallet, Zap, Wand2, Camera, Clock, Wrench } from "lucide-react";

const ITEMS = [
  { icon: Users, label: "Professional Team" },
  { icon: ImageIcon, label: "High Resolution Images" },
  { icon: Wallet, label: "Affordable Packages" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: Wand2, label: "Premium Editing" },
  { icon: Camera, label: "Creative Photography" },
  { icon: Clock, label: "24×7 Support" },
  { icon: Wrench, label: "Latest Equipment" },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">Our Promise</span>
        <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
          Why Choose Us
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass flex flex-col items-center gap-3 rounded-2xl p-6 text-center shadow-soft"
          >
            <item.icon className="text-gold" size={28} />
            <p className="text-sm font-medium text-charcoal dark:text-warmwhite">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
