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
        <div className="max-w-2xl">
          <div className="animate-rise mb-7 flex items-center gap-4">
            <div className="relative">
              <div className="breath-ring absolute -inset-4 rounded-full border border-[rgba(167,243,208,0.35)]" />
              <Image
                src="/logo.png"
                alt="瑜伽学人标识"
                width={112}
                height={112}
                priority
                className="relative rounded-full bg-white/95 p-1.5 shadow-[0_18px_50px_rgba(16,38,28,0.28)]"
              />
            </div>
          </div>

          <h1 className="animate-rise font-[family-name:var(--font-display)] text-5xl leading-tight tracking-wide text-white md:text-7xl">
            瑜伽学人
          </h1>
          <p className="animate-rise-delay mt-3 text-sm font-medium tracking-[0.28em] text-[rgba(196,181,253,0.95)] md:text-base">
            YOGA SCHOLAR
          </p>
          <p className="animate-rise-delay mt-5 max-w-xl text-base leading-relaxed text-[rgba(245,243,255,0.92)] md:text-lg">
            AI 智慧贯通人文哲学，在身心平衡中归档文献、标注洞见、展开思辨。
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
