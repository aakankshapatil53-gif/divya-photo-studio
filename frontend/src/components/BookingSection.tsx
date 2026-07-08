import BookingForm from "./BookingForm";

export default function BookingSection() {
  return (
    <section id="booking" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">Reserve Your Date</span>
        <h2 className="gold-underline gold-underline-center mt-3 font-display text-3xl text-charcoal dark:text-warmwhite md:text-5xl">
          Book Your Shoot
        </h2>
        <p className="mt-4 text-sm text-charcoal/70 dark:text-warmwhite/70">
          Pick your event date — we&apos;ll instantly check availability before you send your inquiry.
        </p>
      </div>
      <div className="mt-12">
        <BookingForm />
      </div>
    </section>
  );
}
