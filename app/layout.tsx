import Header from "@/components/header";
import "./globals.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import AMAIMascot from "@/components/amai-mascot";
import MotionProvider from "@/components/motion-provider";
import WavyBackground from "@/components/wavy-background";
import { Inter, JetBrains_Mono } from "next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="id" className={`${fontSans.variable} ${fontMono.variable} !scroll-smooth`}>
      <body className="relative overflow-x-hidden bg-page font-sans text-ink antialiased transition-colors duration-500">
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <MotionProvider>
              <WavyBackground />
              <Header />
              {children}
              <Footer />

              <Toaster
                position="top-center"
                toastOptions={{
                  className:
                    "!rounded-xl !border !border-ink/10 !bg-surface !text-sm !text-ink !shadow-lg",
                }}
              />
              <AMAIMascot />
            </MotionProvider>
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
