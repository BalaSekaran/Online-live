import type { Metadata, Viewport } from "next";
import { Geist_Mono, Zalando_Sans } from "next/font/google";
import "@/css/globals.css";
import { duration, program } from "@/data/program";

const sans = Zalando_Sans({ subsets: ["latin"], variable: "--font-zalando", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "AI-Powered Full Stack Developer Bootcamp (Live Online, Tamil) | Error Makes Clever",
  description: `${program.name}: ${duration.sentence}. Live online classes in Tamil with real-time projects, industry mentors, placement assistance and No-Cost EMI.`,
};

export const viewport: Viewport = { themeColor: "#f0f0f0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS reveal content immediately if JavaScript is unavailable. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
