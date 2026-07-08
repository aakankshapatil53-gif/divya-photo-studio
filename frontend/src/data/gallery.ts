// ─────────────────────────────────────────────────────────────
// GALLERY
// This drives the Pinterest-style masonry gallery and its filters.
//
// TO ADD YOUR OWN PHOTOS:
// 1. Drop image files into the matching folder inside /public/gallery/
//    e.g. public/gallery/wedding/my-photo-1.jpg
// 2. Add an entry below pointing `src` at that file path.
// 3. `span` controls the masonry tile size: "tall" | "wide" | "normal".
// ─────────────────────────────────────────────────────────────

export type GalleryCategory =
  | "wedding" | "pre-wedding" | "birthday" | "baby"
  | "maternity" | "events" | "passport" | "printing" | "video";

export type GalleryImage = {
  id: string;
  src: string;
  category: GalleryCategory;
  span?: "tall" | "wide" | "normal";
  alt: string;
};

export const galleryCategories: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wedding", label: "Wedding" },
  { key: "pre-wedding", label: "Pre Wedding" },
  { key: "birthday", label: "Birthday" },
  { key: "baby", label: "Baby" },
  { key: "maternity", label: "Maternity" },
  { key: "events", label: "Events" },
  { key: "passport", label: "Passport" },
  { key: "printing", label: "Printing" },
  { key: "video", label: "Video" },
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/gallery/wedding/placeholder-1.jpg", category: "wedding", span: "tall", alt: "Wedding couple portrait" },
  { id: "g2", src: "/gallery/wedding/placeholder-2.jpg", category: "wedding", span: "normal", alt: "Wedding ceremony" },
  { id: "g3", src: "/gallery/pre-wedding/placeholder-1.jpg", category: "pre-wedding", span: "wide", alt: "Pre-wedding couple shoot" },
  { id: "g4", src: "/gallery/birthday/placeholder-1.jpg", category: "birthday", span: "normal", alt: "Birthday celebration" },
  { id: "g5", src: "/gallery/baby/placeholder-1.jpg", category: "baby", span: "tall", alt: "Baby portrait" },
  { id: "g6", src: "/gallery/maternity/placeholder-1.jpg", category: "maternity", span: "normal", alt: "Maternity portrait" },
  { id: "g7", src: "/gallery/events/placeholder-1.jpg", category: "events", span: "wide", alt: "Event coverage" },
  { id: "g8", src: "/gallery/passport/placeholder-1.jpg", category: "passport", span: "normal", alt: "Passport photo sample" },
  { id: "g9", src: "/gallery/printing/placeholder-1.jpg", category: "printing", span: "normal", alt: "Printed album sample" },
  { id: "g10", src: "/gallery/video/placeholder-1.jpg", category: "video", span: "tall", alt: "Video shoot still" },
  { id: "g11", src: "/gallery/wedding/placeholder-3.jpg", category: "wedding", span: "normal", alt: "Wedding details" },
  { id: "g12", src: "/gallery/pre-wedding/placeholder-2.jpg", category: "pre-wedding", span: "normal", alt: "Pre-wedding sunset shoot" },
];
