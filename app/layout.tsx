import Header from "@/components/header";
import "./globals.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import AMAIMascot from "@/components/amai-mascot";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ahmad Mayiludin | Full Stack & Mobile Developer",
  description:
    "Portfolio Ahmad Mayiludin, junior full stack dan mobile developer yang membangun aplikasi web, dashboard operasional, aplikasi mobile Ionic Angular, dan project Computer Vision.",
  authors: [
    {
      name: "Ahmad Mayiludin",
      url: "https://github.com/AhmadMayiludin",
    },
  ],
  creator: "Ahmad Mayiludin",
  publisher: "Ahmad Mayiludin",
  keywords: [
    "Ahmad Mayiludin",
    "Portfolio Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Frontend Developer",
    "Backend Developer",
    "Laravel",
    "React",
    "Ionic Angular",
    "TypeScript",
    "PHP",
    "MySQL",
    "Python",
    "Computer Vision",
  ],
  openGraph: {
    title: "Ahmad Mayiludin | Portfolio Developer",
    description:
      "Project portfolio web, mobile, dashboard bisnis, UI/UX, data mining, dan Computer Vision.",
    url: siteUrl,
    siteName: "Ahmad Mayiludin Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/profile_2.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmad Mayiludin Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Mayiludin | Portfolio Developer",
    description:
      "Portfolio web, mobile app, dashboard operasional, dan Computer Vision.",
    images: ["/images/profile_2.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="!scroll-smooth">
      <body
        className="relative bg-gray-50/95 pt-10 font-sans text-gray-950 md:pt-36 dark:bg-[#0d0d1a] dark:text-gray-50 dark:text-opacity-90 transition-colors duration-300"
      >
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
            <AMAIMascot />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
