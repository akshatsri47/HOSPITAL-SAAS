import type { Metadata } from "next";
import { DM_Serif_Display, Instrument_Sans, Space_Mono, Caveat } from "next/font/google";
import ClientProgress from "./components/ClientProgress";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xyras | Intelligent Voice AI for Hospitals",
  description:
    "Instant multilingual triage system. Answers 100% of concurrent inbound patient calls in 12+ Indian languages (Hindi, Tamil, Telugu) with zero wait times.",
  keywords: [
    "hospital AI",
    "voice triage",
    "multilingual healthcare",
    "patient call management",
    "Indian hospitals",
    "Xyras AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${instrumentSans.variable} ${spaceMono.variable} ${caveat.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-primary font-body antialiased">
        {/* Lenis Smooth Scroll */}
        <SmoothScroll />
        {/* Scroll Progress & Custom Cursor */}
        <ClientProgress />
        {children}
      </body>
    </html>
  );
}
