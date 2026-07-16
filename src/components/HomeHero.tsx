"use client";

import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(167,139,250,0.55),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(52,211,153,0.35),transparent_40%),linear-gradient(165deg,#1e1b4b_0%,#4c1d95_48%,#14532d_100%)]" />
      <div className="starfield" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8f5ff] to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-20 md:px-6">
        <div className="max-w-2xl">
          <div className="animate-rise mb-6 flex items-center gap-4">
            <div className="relative">
              <div className="breath-ring absolute -inset-3 rounded-full border border-[rgba(167,243,208,0.35)]" />
              <Image
                src="/logo.svg"
                alt="瑜伽学人图标"
                width={88}
                height={88}
                priority
                className="relative drop-shadow-lg"
              />
            </div>
          </div>

          <h1 className="animate-rise font-[family-name:var(--font-display)] text-5xl leading-tight tracking-wide text-white md:text-7xl">
            瑜伽学人
          </h1>
          <p className="animate-rise-delay mt-5 max-w-xl text-base leading-relaxed text-[rgba(245,243,255,0.9)] md:text-lg">
            汇聚哲学、身心科学与实践智慧的瑜伽资料库——归档文献，标注洞见，在静定中展开宇宙与身体的对话。
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
