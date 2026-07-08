"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Instagram, Facebook, MapPin, Clock, QrCode } from "lucide-react";

const ADDRESS = "At Khordad, Taluka & District Dhule, Maharashtra, India";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">Get In Touch</span>
        <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
          Contact Us
        </h2>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square overflow-hidden rounded-3xl shadow-soft md:aspect-auto"
        >
          {/* Replace this iframe src with your Google Maps embed link once available */}
          <div className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-3 bg-beige/60 dark:bg-charcoal/60">
            <MapPin size={36} className="text-gold" />
            <p className="text-sm text-charcoal/60 dark:text-warmwhite/60">Google Map placeholder — add your embed link later</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-3xl p-8 shadow-soft"
        >
          <h3 className="font-display text-2xl text-charcoal dark:text-warmwhite">Divya Photo Studio</h3>
          <p className="mt-1 text-sm text-gold">Sharad Gulabrao Deore</p>

          <div className="mt-6 space-y-4 text-sm text-charcoal/80 dark:text-warmwhite/80">
            <p className="flex items-center gap-3"><Phone size={16} className="text-gold" /> 9923124639 · 8208965839</p>
            <p className="flex items-center gap-3"><Mail size={16} className="text-gold" /> divyahdphotostudio@gmail.com</p>
            <p className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> {ADDRESS}</p>
            <p className="flex items-center gap-3"><Clock size={16} className="text-gold" /> Open 24×7</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://wa.me/919923124639" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="mailto:divyahdphotostudio@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-charcoal">
              <Mail size={16} /> Email
            </a>
            <a href="https://instagram.com/sharad.deore.180" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-charcoal dark:text-warmwhite">
              <Instagram size={16} className="text-gold" /> Instagram
            </a>
            <a href="https://www.facebook.com/share/18oeQmu5rT/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-charcoal dark:text-warmwhite">
              <Facebook size={16} className="text-gold" /> Facebook
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-gold/20 p-4">
            <QrCode size={32} className="text-gold" />
            <p className="text-xs text-charcoal/60 dark:text-warmwhite/60">
              Scan a QR code linking to this contact card at your studio — generate one with any free QR tool and print it at the counter.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
