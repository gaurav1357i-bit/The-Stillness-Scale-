import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quietude — Master the Art of Listening",
  description:
    "The only space where doing less puts you on top. A luxury meditation community for the modern mind.",
  keywords: [
    "meditation",
    "mindfulness",
    "breathing",
    "wellness",
    "community",
    "listening",
    "calm",
  ],
  authors: [{ name: "Quietude" }],
  openGraph: {
    title: "Quietude — Master the Art of Listening",
    description:
      "The only space where doing less puts you on top. A luxury meditation community for the modern mind.",
    siteName: "Quietude",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quietude — Master the Art of Listening",
    description:
      "The only space where doing less puts you on top. A luxury meditation community for the modern mind.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
