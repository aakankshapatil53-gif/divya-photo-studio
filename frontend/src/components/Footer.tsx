import Image from "next/image";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#packages", label: "Packages" },
  { href: "#booking", label: "Booking" },
  { href: "#", label: "Privacy Policy" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal px-5 pb-28 pt-16 text-warmwhite md:px-10 md:pb-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative h-10 w-10 shrink-0">
              <Image src="/brand/logo-mark.png" alt="Divya Photo Studio logo" fill className="object-contain" />
            </span>
            <p className="font-display text-2xl">Divya <span className="text-gold">Photo Studio</span></p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-warmwhite/60">
            Capturing love, creating memories, preserving forever — premium photography in Dhule, Maharashtra.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com/sharad.deore.180" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold hover:bg-gold/10">
              <Instagram size={16} />
            </a>
            <a href="https://www.facebook.com/share/18oeQmu5rT/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold hover:bg-gold/10">
              <Facebook size={16} />
            </a>
            <a href="tel:+919923124639" aria-label="Call" className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold hover:bg-gold/10">
              <Phone size={16} />
            </a>
            <a href="mailto:divyahdphotostudio@gmail.com" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold hover:bg-gold/10">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-warmwhite/70">
            {LINKS.map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-gold">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Studio</p>
          <p className="mt-4 text-sm text-warmwhite/70">
            At Khordad, Taluka &amp; District Dhule, Maharashtra, India
          </p>
          <p className="mt-2 text-sm text-warmwhite/70">Open 24×7</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-warmwhite/10 pt-6 text-center text-xs text-warmwhite/40">
        © 2026 Divya Photo Studio. All rights reserved.
      </div>
    </footer>
  );
}
