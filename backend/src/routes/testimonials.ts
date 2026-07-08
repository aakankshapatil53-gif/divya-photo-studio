import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  res.json(testimonials);
});

const schema = z.object({
  name: z.string().min(1),
  quote: z.string().min(1),
  rating: z.number().min(1).max(5).optional(),
});

router.post("/", requireAuth, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Name and quote are required." });
  const created = await prisma.testimonial.create({ data: parsed.data });
  res.status(201).json(created);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
