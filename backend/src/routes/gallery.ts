import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// NOTE: this endpoint manages gallery *metadata* only (Cloudinary/CDN URLs).
// For the simplest workflow, just drop image files directly into
// frontend/public/gallery/<category>/ and list them in
// frontend/src/data/gallery.ts — no backend or database needed.
// This API is provided for a future admin "upload photo" panel using Cloudinary.

router.get("/", async (_req, res) => {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  res.json(images);
});

const schema = z.object({ url: z.string().url(), category: z.string().min(1) });

router.post("/", requireAuth, async (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Valid url and category are required." });
  const created = await prisma.galleryImage.create({ data: parsed.data });
  res.status(201).json(created);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.galleryImage.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
