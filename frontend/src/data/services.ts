// ─────────────────────────────────────────────────────────────
// SERVICES
// Edit this file to add, remove, or reorder service cards shown
// in the "Services" masonry section. `image` points to a file in
// /public/gallery/<category>/ — replace with a real photo any time.
// ─────────────────────────────────────────────────────────────

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string; // matches a gallery category key
};

export const services: Service[] = [
  { id: "wedding", title: "Wedding Photography", description: "Timeless coverage of your most important day, told through candid and directed moments.", image: "/gallery/wedding/placeholder-1.jpg", category: "wedding" },
  { id: "pre-wedding", title: "Pre Wedding Shoot", description: "Cinematic pre-wedding stories shot on location, styled to your taste.", image: "/gallery/pre-wedding/placeholder-1.jpg", category: "pre-wedding" },
  { id: "birthday", title: "Birthday Photography", description: "Joyful, colourful coverage of birthday celebrations, big or small.", image: "/gallery/birthday/placeholder-1.jpg", category: "birthday" },
  { id: "baby", title: "Baby Shoot", description: "Gentle, safe, and adorable newborn and baby photography.", image: "/gallery/baby/placeholder-1.jpg", category: "baby" },
  { id: "maternity", title: "Maternity Shoot", description: "Elegant maternity portraits that celebrate this season of life.", image: "/gallery/maternity/placeholder-1.jpg", category: "maternity" },
  { id: "event", title: "Event Photography", description: "Full coverage for corporate events, functions, and celebrations.", image: "/gallery/events/placeholder-1.jpg", category: "events" },
  { id: "passport", title: "Passport Photos", description: "Quick, compliant passport and ID photography, printed on the spot.", image: "/gallery/passport/placeholder-1.jpg", category: "passport" },
  { id: "printing", title: "Photo Printing", description: "High quality photo printing and framing services.", image: "/gallery/printing/placeholder-1.jpg", category: "printing" },
  { id: "video", title: "Video Shooting", description: "Professional video coverage for weddings and events.", image: "/gallery/video/placeholder-1.jpg", category: "video" },
  { id: "album", title: "Album Design", description: "Premium, custom-designed photo albums built to last generations.", image: "/gallery/albums/placeholder-1.jpg", category: "albums" },
  { id: "drone", title: "Drone Photography", description: "Aerial photography and videography for a truly cinematic perspective.", image: "/gallery/drone/placeholder-1.jpg", category: "drone" },
  { id: "cinematic-film", title: "Cinematic Wedding Film", description: "A story-driven wedding film, edited like a short cinematic feature.", image: "/gallery/video/placeholder-2.jpg", category: "video" },
  { id: "live-coverage", title: "Live Event Coverage", description: "Real-time, live-streamed coverage of your event for remote guests.", image: "/gallery/events/placeholder-2.jpg", category: "events" },
];
