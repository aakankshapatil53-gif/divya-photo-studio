import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.divyaphotostudio.com"),
  title: "Divya Photo Studio | Wedding & Portrait Photographer in Dhule",
  description:
    "Divya Photo Studio, Dhule — premium wedding photography, pre-wedding shoots, baby & maternity photography, event coverage, passport photos and photo printing. Book your shoot with Sharad Gulabrao Deore.",
  keywords: [
    "Divya Photo Studio",
    "Photo Studio in Dhule",
    "Wedding Photographer Dhule",
    "Best Photographer in Dhule",
    "Pre Wedding Shoot Dhule",
    "Passport Photo Dhule",
    "Photo Printing Dhule",
    "Baby Photography Dhule",
  ],
  openGraph: {
    title: "Divya Photo Studio | Wedding & Portrait Photographer in Dhule",
    description:
      "Capturing Love, Creating Memories, Preserving Forever. Book your shoot with Divya Photo Studio, Dhule.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
