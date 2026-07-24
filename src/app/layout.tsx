import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-latin",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const serifSc = Noto_Serif_SC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://qin-three.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "瑜伽学人 · Yoga Scholar",
    template: "%s · 瑜伽学人",
  },
  description:
    "瑜伽学人（Yoga Scholar）——连接古典智慧、现代科学、实践技术、研究机构与世界静修中心的开放知识资料库。",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "瑜伽学人 · Yoga Scholar",
    description:
      "连接古典智慧、现代科学、实践技术、研究机构与世界静修中心。",
    images: [
      {
        url: "/yoga-cosmic-hero.png",
        width: 1536,
        height: 1024,
        alt: "星空与山谷间的瑜伽冥想者",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${display.variable} ${serifSc.variable} ${body.variable} h-full antialiased`}
    >
      <body className="site-shell flex min-h-full flex-col">
        <div className="cosmic-orb one" aria-hidden />
        <div className="cosmic-orb two" aria-hidden />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
