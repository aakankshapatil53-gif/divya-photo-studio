// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// Edit this file to add or update client reviews.
// ─────────────────────────────────────────────────────────────

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating: number; // 1-5
};

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Priya & Rohit", quote: "Excellent wedding photography, every frame felt personal and beautifully composed.", rating: 5 },
  { id: "t2", name: "Anjali Patil", quote: "Very professional team from start to finish, made us feel completely at ease.", rating: 5 },
  { id: "t3", name: "Mahesh Deshmukh", quote: "Beautiful album quality, the print and design exceeded our expectations.", rating: 5 },
  { id: "t4", name: "Sneha Kulkarni", quote: "Highly recommended for anyone looking for premium, creative photography.", rating: 5 },
];
