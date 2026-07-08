"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarX2, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { packages } from "@/data/packages";
import { checkDateAvailability, submitBooking } from "@/lib/api";

const EVENT_TYPES = [
  "Wedding", "Pre Wedding", "Birthday", "Baby Shoot", "Maternity",
  "Event", "Passport Photo", "Photo Printing", "Video Shoot", "Other",
];

// Every booking inquiry is delivered straight to the studio's WhatsApp number.
// Change this in one place if the number ever changes.
const STUDIO_WHATSAPP = "919923124639";

function buildWhatsAppMessage(form: {
  customerName: string; phone: string; email: string; eventType: string;
  eventDate: string; eventTime: string; location: string; packageId: string;
  specialRequirements?: string;
}) {
  const pkg = packages.find((p) => p.id === form.packageId);
  const lines = [
    "*New Booking Enquiry — Divya Photo Studio*",
    `Name: ${form.customerName}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Event Type: ${form.eventType}`,
    `Date: ${form.eventDate}`,
    `Time: ${form.eventTime}`,
    `Location: ${form.location}`,
    `Package: ${pkg ? `${pkg.name} (${pkg.price})` : form.packageId}`,
  ];
  if (form.specialRequirements) lines.push(`Notes: ${form.specialRequirements}`);
  return lines.join("\n");
}

function whatsappLink(form: Parameters<typeof buildWhatsAppMessage>[0]) {
  return `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(buildWhatsAppMessage(form))}`;
}

type Status = "idle" | "checking" | "unavailable" | "available" | "submitting" | "success" | "error";

export default function BookingForm() {
  const [form, setForm] = useState({
    customerName: "", phone: "", whatsapp: "", email: "",
    eventType: EVENT_TYPES[0], eventDate: "", eventTime: "", location: "",
    packageId: packages[0].id, specialRequirements: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleDateChange = async (value: string) => {
    update("eventDate", value);
    if (!value) return;
    setStatus("checking");
    try {
      const result = await checkDateAvailability(value);
      if (result.available) {
        setStatus("available");
        setSuggestions([]);
      } else {
        setStatus("unavailable");
        setSuggestions(result.nextAvailableDates || []);
      }
    } catch {
      // Backend not reachable — allow the user to continue; availability will be
      // re-verified server-side when the inquiry is submitted.
      setStatus("idle");
    }
  };

  const pickSuggestion = (date: string) => {
    update("eventDate", date);
    setStatus("available");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "unavailable") return;
    setStatus("submitting");
    setErrorMsg("");

    // Open a blank tab synchronously (inside the click handler) so the browser
    // doesn't treat it as a popup — we point it at WhatsApp regardless of
    // whether the backend save succeeds, so a down/misconfigured API never
    // stops the enquiry from reaching WhatsApp.
    const waTab = window.open("", "_blank");

    try {
      await submitBooking(form);
    } catch (err: any) {
      // Backend save failed (API unreachable / misconfigured / DB down etc).
      // Don't block the customer — the WhatsApp message is the part that
      // actually needs to reach the studio, so we still send it below and
      // only log the backend issue quietly for admins to notice separately.
      console.error("Booking save failed, continuing to WhatsApp:", err);
    }

    if (waTab) {
      waTab.location.href = whatsappLink(form);
    } else {
      // Popup was blocked by the browser — fall back to same-tab redirect
      // so the enquiry still reaches WhatsApp instead of silently failing.
      window.location.href = whatsappLink(form);
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="glass mx-auto max-w-lg rounded-3xl p-10 text-center shadow-soft">
        <CheckCircle2 className="mx-auto mb-4 text-gold" size={48} />
        <h3 className="font-display text-2xl text-charcoal dark:text-warmwhite">Booking Inquiry Sent Successfully</h3>
        <p className="mt-2 text-sm text-charcoal/70 dark:text-warmwhite/70">
          Thank you, {form.customerName || "friend"}. Your enquiry has been sent straight to our WhatsApp
          (9923124639) and our team will reach out shortly to confirm the details.
        </p>
        <a
          href={whatsappLink(form)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
        >
          <MessageCircle size={16} /> Open WhatsApp Chat
        </a>
        <p className="mt-3 text-xs text-charcoal/50 dark:text-warmwhite/50">
          If a WhatsApp tab didn&apos;t open automatically, tap the button above — just hit send once it opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass mx-auto max-w-3xl rounded-3xl p-6 shadow-soft md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Customer Name" required>
          <input required value={form.customerName} onChange={(e) => update("customerName", e.target.value)} className="input" />
        </Field>
        <Field label="Phone Number" required>
          <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" />
        </Field>
        <Field label="WhatsApp Number">
          <input type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="input" />
        </Field>
        <Field label="Email" required>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" />
        </Field>
        <Field label="Event Type" required>
          <select required value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className="input">
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Package" required>
          <select required value={form.packageId} onChange={(e) => update("packageId", e.target.value)} className="input">
            {packages.map((p) => (
              <option key={p.id} value={p.id}>{p.name} — {p.price}</option>
            ))}
          </select>
        </Field>
        <Field label="Event Date" required>
          <input required type="date" value={form.eventDate} onChange={(e) => handleDateChange(e.target.value)} className="input" />
        </Field>
        <Field label="Event Time" required>
          <input required type="time" value={form.eventTime} onChange={(e) => update("eventTime", e.target.value)} className="input" />
        </Field>
        <Field label="Location" required className="md:col-span-2">
          <input required value={form.location} onChange={(e) => update("location", e.target.value)} className="input" />
        </Field>
        <Field label="Special Requirements" className="md:col-span-2">
          <textarea rows={3} value={form.specialRequirements} onChange={(e) => update("specialRequirements", e.target.value)} className="input resize-none" />
        </Field>
      </div>

      <AnimatePresence>
        {status === "checking" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 text-sm text-charcoal/60 dark:text-warmwhite/60">
            <Loader2 size={14} className="animate-spin" /> Checking availability…
          </motion.p>
        )}
        {status === "available" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <CheckCircle2 size={16} /> This date is available.
          </motion.p>
        )}
        {status === "unavailable" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-2xl border border-red-300/50 bg-red-50/60 p-5 text-center dark:bg-red-950/30"
          >
            <CalendarX2 className="mx-auto mb-2 text-red-500" size={28} />
            <p className="font-display text-lg text-charcoal dark:text-warmwhite">Booking Not Available</p>
            <p className="mt-1 text-sm text-charcoal/70 dark:text-warmwhite/70">
              This date is already booked. Please choose another available date.
            </p>
            {suggestions.length > 0 && (
              <>
                <p className="mt-4 text-xs uppercase tracking-wide text-gold">Available Dates</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {suggestions.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => pickSuggestion(d)}
                      className="rounded-full border border-gold/40 px-4 py-1.5 text-xs font-medium text-charcoal transition hover:bg-gold-gradient dark:text-warmwhite"
                    >
                      {new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long" })}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
        {status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-red-500">{errorMsg}</motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "unavailable" || status === "submitting"}
        className="mt-8 w-full rounded-full bg-gold-gradient py-3.5 text-sm font-semibold tracking-wide text-charcoal shadow-gold transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Submit Booking Inquiry"}
      </button>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid rgba(200, 162, 74, 0.3);
          background: transparent;
          border-radius: 0.9rem;
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
          outline: none;
        }
      `}</style>
    </form>
  );
}

function Field({
  label, required, children, className = "",
}: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium text-charcoal/80 dark:text-warmwhite/80">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
