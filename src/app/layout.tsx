import type { Metadata } from "next";
import { Merriweather, Nunito_Sans } from "next/font/google";

import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { analytics } from "@/data/site";

import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Missão África | Fé, Transparência e Impacto",
    template: "%s | Missão África",
  },
  description:
    "Projeto humanitário da igreja que sustenta missionários em África com transparência financeira e impacto real nas comunidades.",
  keywords: [
    "missão humanitária",
    "doação missionária",
    "igreja",
    "África",
    "transparência",
    "PIX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${merriweather.variable} h-full antialiased`}>
      <body className="min-h-full bg-stone-50 text-slate-900">
        <Analytics measurementId={analytics.gaMeasurementId} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
