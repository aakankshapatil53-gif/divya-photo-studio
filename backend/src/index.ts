import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import bookingRoutes from "./routes/bookings";
import bookedDateRoutes from "./routes/bookedDates";
import testimonialRoutes from "./routes/testimonials";
import galleryRoutes from "./routes/gallery";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", studio: "Divya Photo Studio" }));

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/booked-dates", bookedDateRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/gallery", galleryRoutes);

// Basic error handler as a safety net
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on our end. Please try again shortly." });
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`✔ Divya Photo Studio API running on http://localhost:${PORT}`);
});
