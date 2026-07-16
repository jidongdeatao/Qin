"use client";

import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(52,211,153,0.38),transparent_42%),radial-gradient(circle_at_82%_28%,rgba(167,139,250,0.48),transparent_40%),linear-gradient(165deg,#10261c_0%,#1e1b4b_42%,#4c1d95_100%)]" />
      <div className="starfield" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8f5ff] to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-20 md:px-6">
        <div className="max-w-xl">
          <div className="animate-rise relative mb-8 inline-block">
            <div className="breath-ring absolute -inset-5 rounded-[2rem] border border-[rgba(167,243,208,0.3)]" />
            <Image
              src="/logo-full.png"
              alt="瑜伽学人 Yoga Scholar — AI智慧 · 人文哲学 · 身心平衡"
              width={360}
              height={360}
              priority
              className="relative rounded-3xl bg-white p-4 shadow-[0_22px_60px_rgba(16,38,28,0.32)] md:w-[400px]"
            />
          </div>

          <h1 className="sr-only">瑜伽学人 · Yoga Scholar</h1>
          <p className="animate-rise-delay max-w-md text-base leading-relaxed text-[rgba(245,243,255,0.92)] md:text-lg">
            归档文献、标注洞见、AI 辅助思辨——让瑜伽研究在智慧与平衡中持续生长。
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/library"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--cosmos-2)] transition hover:bg-[var(--foam)]"
            >
              进入资料库
            </Link>
            <Link
              href="/c/wisdom-108"
              className="rounded-full border border-white/40 px-6 py-3 text-sm text-white transition hover:bg-white/10"
            >
              瑜伽智慧108问
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
