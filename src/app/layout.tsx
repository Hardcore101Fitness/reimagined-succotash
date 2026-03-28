import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hardcore Fitness 101 | Premium Strength & Conditioning",
  description:
    "Transform your body and mindset at Hardcore Fitness 101. Expert coaching, world-class facility, and a proven system that delivers real results. Book your free trial today.",
  keywords: [
    "gym",
    "fitness",
    "personal training",
    "strength and conditioning",
    "hardcore fitness",
  ],
  openGraph: {
    title: "Hardcore Fitness 101 | Premium Strength & Conditioning",
    description:
      "Transform your body and mindset. Expert coaching, world-class facility, and a proven system that delivers real results.",
    url: "https://hardcorefitness101.com",
    siteName: "Hardcore Fitness 101",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
