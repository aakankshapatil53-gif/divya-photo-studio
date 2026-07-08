// ─────────────────────────────────────────────────────────────
// PRICE LIST / PACKAGES
// Edit this file to change pricing, inclusions, or add/remove packages.
// Each object below becomes one pricing card on the website.
// ─────────────────────────────────────────────────────────────

export type Package = {
  id: string;
  name: string;
  price: string;
  unit?: string; // e.g. "onwards"
  features: string[];
  highlighted?: boolean; // set true for the "Most Popular" card (only one recommended)
};

export const packages: Package[] = [
  {
    id: "basic-photography",
    name: "Basic Photography",
    price: "₹8,999",
    features: [
      "4 Hours Coverage",
      "100 Edited Photos",
      "Online Gallery",
      "Free Consultation",
    ],
  },
  {
    id: "premium-wedding",
    name: "Premium Wedding",
    price: "₹24,999",
    features: [
      "Full Day Coverage",
      "400 Edited Photos",
      "Luxury Album",
      "Drone Coverage",
      "Cinematic Video",
    ],
    highlighted: true,
  },
  {
    id: "luxury-wedding",
    name: "Luxury Wedding",
    price: "₹49,999",
    features: [
      "2 Days Coverage",
      "800 Edited Photos",
      "Premium Album",
      "Drone Coverage",
      "Highlight Film",
      "Instagram Reels",
    ],
  },
];
