import "@/app/styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import Grain from "./components/shared/Grain";
import Pet from "./components/shared/Pet";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

const options = {
  title: "Jay | Software Developer",
  description:
    "Software engineer building practical and scalable backend/frontend products with TypeScript, Golang, and modern web frameworks. Focused on creating software people rely on every day while continuously exploring system design, blockchain infrastructure, and craft-driven problem solving.",
  url: "https://jayfolio.dev",
  ogImage:
    "https://res.cloudinary.com/dubinx/image/upload/v1773605074/jay-logo.png",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "jayfolio.dev",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  // other: {
  //   "google-site-verification": "IzcWMgn5Qjf-LCtA337KTGjivsf9bmod_1pZ-jxYQh8",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans bg-bg text-ink`}
      >
        <Providers>
          <Grain />
          <Pet />
          <Navbar />
          <Analytics />
          {children}
          <Footer />
        </Providers>
      </body>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      />
    </html>
  );
}
