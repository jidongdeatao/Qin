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

export const metadata: Metadata = {
  title: {
    default: "瑜伽学人 · Yoga Scholar",
    template: "%s · 瑜伽学人",
  },
  description:
    "瑜伽学人（Yoga Scholar）——以 AI 智慧贯通人文哲学，在身心平衡中归档、阅读与思辨瑜伽文献。",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "瑜伽学人 · Yoga Scholar",
    description:
      "以 AI 智慧贯通人文哲学，在身心平衡中归档、阅读与思辨瑜伽文献。",
    images: [{ url: "/logo-full.png", width: 1024, height: 1024, alt: "瑜伽学人" }],
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
