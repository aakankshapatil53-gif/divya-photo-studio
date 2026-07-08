"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#packages", label: "Packages" },
  { href: "#booking", label: "Booking" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-warmwhite/85 backdrop-blur-lg shadow-soft dark:bg-charcoal/85" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative h-11 w-11 shrink-0 md:h-12 md:w-12">
            <Image
              src={solid ? "/brand/logo-mark-dark.png" : "/brand/logo-mark.png"}
              alt="Divya Photo Studio logo"
              fill
              className="object-contain dark:hidden"
              priority
            />
            <Image
              src="/brand/logo-mark.png"
              alt=""
              fill
              className="hidden object-contain dark:block"
              aria-hidden="true"
            />
          </span>
          <span className={`hidden font-display text-lg tracking-wide sm:block ${solid ? "text-charcoal dark:text-warmwhite" : "text-warmwhite"}`}>
            Divya <span className="text-gold">Photo Studio</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium tracking-wide transition hover:text-gold ${
                solid ? "text-charcoal dark:text-warmwhite" : "text-warmwhite"
              }`}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#booking"
            className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-semibold text-charcoal shadow-gold transition hover:brightness-105"
          >
            Book Your Shoot
          </a>
        </nav>

        <button
          className={`md:hidden ${solid ? "text-charcoal dark:text-warmwhite" : "text-warmwhite"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="glass mx-4 mb-4 rounded-2xl p-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-charcoal dark:text-warmwhite">
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />
              <a href="#booking" onClick={() => setOpen(false)} className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-semibold text-charcoal">
                Book Your Shoot
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
