"use client";
import { Phone, MessageCircle, MapPin, CalendarCheck } from "lucide-react";

const WHATSAPP = "919923124639";
const PHONE = "+919923124639";
const ADDRESS = "At Khordad, Taluka & District Dhule, Maharashtra, India";

export default function FloatingButtons() {
  return (
    <>
      {/* Desktop floating WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-8 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 md:flex"
      >
        <MessageCircle size={24} />
      </a>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Quick actions"
        className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-gold/20 bg-charcoal/95 text-warmwhite backdrop-blur md:hidden"
      >
        <a href={`tel:${PHONE}`} className="flex flex-col items-center gap-1 py-3 text-[11px]">
          <Phone size={18} className="text-gold" /> Call
        </a>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 text-[11px]">
          <MessageCircle size={18} className="text-gold" /> WhatsApp
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-[11px]"
        >
          <MapPin size={18} className="text-gold" /> Directions
        </a>
        <a href="#booking" className="flex flex-col items-center gap-1 py-3 text-[11px]">
          <CalendarCheck size={18} className="text-gold" /> Book Now
        </a>
      </nav>
    </>
  );
}
