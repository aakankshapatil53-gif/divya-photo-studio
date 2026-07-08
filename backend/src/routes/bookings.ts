import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { sendBookingNotification, sendCustomerConfirmation } from "../lib/email";

const router = Router();

const bookingSchema = z.object({
  customerName: z.string().min(1),
  phone: z.string().min(6),
  whatsapp: z.string().optional(),
  email: z.string().email(),
  eventType: z.string().min(1),
  eventDate: z.string().min(1), // YYYY-MM-DD
  eventTime: z.string().min(1),
  location: z.string().min(1),
  packageId: z.string().min(1),
  specialRequirements: z.string().optional(),
});

// ── Public: submit a new booking inquiry ──────────────────────────
// Re-checks availability server-side so two people can't double-book
// the same date even if their forms loaded at the same time.
router.post("/", async (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Please fill in all required fields correctly." });
  }
  const data = parsed.data;

  const alreadyBooked = await prisma.bookedDate.findUnique({ where: { date: data.eventDate } });
  if (alreadyBooked) {
    return res.status(409).json({ message: "This date is already booked. Please choose another available date." });
  }

  const booking = await prisma.booking.create({ data });

  // Fire-and-forget notification emails; failures here should not block the booking.
  sendBookingNotification(data).catch((e) => console.error("[email] notify failed:", e));
  sendCustomerConfirmation(data.email, data.customerName).catch((e) => console.error("[email] confirm failed:", e));

  res.status(201).json({ message: "Booking Inquiry Sent Successfully", booking });
});

// ── Admin: list all bookings ───────────────────────────────────────
router.get("/", requireAuth, async (_req, res) => {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  res.json(bookings);
});

// ── Admin: approve / reject a booking ─────────────────────────────
const statusSchema = z.object({ status: z.enum(["APPROVED", "REJECTED"]) });
router.patch("/:id/status", requireAuth, async (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid status." });

  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
  });

  // When approved, automatically mark the date as booked so it blocks future inquiries.
  if (parsed.data.status === "APPROVED") {
    await prisma.bookedDate.upsert({
      where: { date: booking.eventDate },
      update: {},
      create: { date: booking.eventDate, note: `Booking ${booking.id}` },
    });
  }

  res.json(booking);
});

export default router;
