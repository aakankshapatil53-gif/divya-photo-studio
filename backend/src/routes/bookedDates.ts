import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// ── Public: check availability for a given date ──────────────────
router.get("/check", async (req, res) => {
  const date = String(req.query.date || "");
  if (!date) return res.status(400).json({ message: "date query param is required." });

  const existing = await prisma.bookedDate.findUnique({ where: { date } });

  if (!existing) {
    return res.json({ available: true, nextAvailableDates: [] });
  }

  // Find the next 5 available dates starting the day after the requested date.
  const bookedRows = await prisma.bookedDate.findMany({ select: { date: true } });
  const bookedSet = new Set(bookedRows.map((r: { date: string }) => r.date));

  const suggestions: string[] = [];
  const cursor = new Date(date + "T00:00:00");
  for (let i = 1; suggestions.length < 5 && i <= 60; i++) {
    const next = new Date(cursor);
    next.setDate(cursor.getDate() + i);
    const iso = next.toISOString().slice(0, 10);
    if (!bookedSet.has(iso)) suggestions.push(iso);
  }

  res.json({ available: false, nextAvailableDates: suggestions });
});

// ── Admin: list all booked dates ──────────────────────────────────
router.get("/", requireAuth, async (_req, res) => {
  const dates = await prisma.bookedDate.findMany({ orderBy: { date: "asc" } });
  res.json(dates);
});

// ── Admin: add a booked date ──────────────────────────────────────
const addSchema = z.object({ date: z.string().min(1), note: z.string().optional() });
router.post("/", requireAuth, async (req, res) => {
  const parsed = addSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Valid date is required." });

  const created = await prisma.bookedDate.upsert({
    where: { date: parsed.data.date },
    update: { note: parsed.data.note },
    create: { date: parsed.data.date, note: parsed.data.note },
  });
  res.status(201).json(created);
});

// ── Admin: remove a booked date ───────────────────────────────────
router.delete("/:date", requireAuth, async (req, res) => {
  try {
    await prisma.bookedDate.delete({ where: { date: req.params.date } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ message: "Date not found." });
  }
});

export default router;
