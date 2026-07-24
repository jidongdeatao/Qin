"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const wisdomSlides = [
  {
    sanskrit: "योगश्चित्तवृत्तिनिरोधः",
    quote: "瑜伽，是心识活动的止息。",
    source: "《瑜伽经》1.2 · Yoga Sūtra",
    note: "回到澄明的观看，认识不被波动遮蔽的自己。",
    image: "/yoga-hero-amethyst.png",
    tone: "amethyst",
  },
  {
    sanskrit: "समत्वं योग उच्यते",
    quote: "安住于平衡，这就称为瑜伽。",
    source: "《薄伽梵歌》2.48 · Bhagavad Gītā",
    note: "行动而不执著结果，在变化之中保持内在的等持。",
    image: "/yoga-hero-sunrise.png",
    tone: "sunrise",
  },
  {
    sanskrit: "तदा द्रष्टुः स्वरूपेऽवस्थानम्",
    quote: "于是，观者安住于自身本性。",
    source: "《瑜伽经》1.3 · Yoga Sūtra",
    note: "练习并非成为另一个人，而是辨认始终在场的觉知。",
    image: "/yoga-hero-emerald.png",
    tone: "emerald",
  },
  {
    sanskrit: "उत्तिष्ठत जाग्रत",
    quote: "起来，觉醒，向明辨者求知。",
    source: "《卡塔奥义书》1.3.14 · Kaṭha Upaniṣad",
    note: "古老的邀请穿过时代：保持清醒，以实践检验智慧。",
    image: "/yoga-hero-amethyst.png",
    tone: "amethyst",
  },
  {
    sanskrit: "स तु दीर्घकालनैरन्तर्यसत्कारासेवितो दृढभूमिः",
    quote: "经由长久、无间断且怀着敬意的练习，根基才会稳固。",
    source: "《瑜伽经》1.14 · Yoga Sūtra",
    note: "真正的转变不是短暂的用力，而是温柔、持续地返回当下。",
    image: "/yoga-hero-emerald.png",
    tone: "emerald",
  },
  {
    sanskrit: "उद्धरेदात्मनात्मानं",
    quote: "让人借由自身提升自己，不使自己沉沦。",
    source: "《薄伽梵歌》6.5 · Bhagavad Gītā",
    note: "心既可能成为朋友，也可能成为阻碍；觉察使选择重新开放。",
    image: "/yoga-hero-sunrise.png",
    tone: "sunrise",
  },
  {
    sanskrit: "ईशावास्यमिदं सर्वम्",
    quote: "这一切流动的世界，都被神圣的存在所遍覆。",
    source: "《伊莎奥义书》1 · Īśā Upaniṣad",
    note: "当万物不再只是占有的对象，节制、敬畏与自由同时发生。",
    image: "/yoga-hero-amethyst.png",
    tone: "amethyst",
  },
  {
    sanskrit: "अशेषतापतप्तानां समाश्रयमठो हठः",
    quote: "对于被种种苦恼灼烧的人，哈他瑜伽如同庇护之所。",
    source: "《哈他瑜伽之光》1.10 · Haṭha Yoga Pradīpikā",
    note: "传统把练习视为庇护而非竞赛：稳定身体，也为内在寂静准备空间。",
    image: "/yoga-hero-emerald.png",
    tone: "emerald",
  },
] as const;

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % wisdomSlides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const show = (index: number) => {
    setActive((index + wisdomSlides.length) % wisdomSlides.length);
  };
  const slide = wisdomSlides[active];

  return (
    <section
      className="hero-cosmos relative min-h-[88vh] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="瑜伽经典智慧"
    >
      <Image
        key={slide.image}
        src={slide.image}
        alt=""
        fill
        preload
        sizes="100vw"
        className="hero-cosmos-image object-cover"
      />
      <div
        className={`hero-cosmos-veil hero-cosmos-veil-${slide.tone} absolute inset-0`}
      />
      <div className="starfield" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f0f8] to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-24 md:px-6">
        <div className="max-w-3xl">
          <p className="animate-rise mb-7 flex items-center gap-3 text-xs tracking-[0.3em] text-emerald-100/75 uppercase md:text-sm">
            <span className="h-px w-10 bg-emerald-200/50" />
            Classical wisdom · Living inquiry
          </p>

          <div
            key={active}
            className="wisdom-slide"
            aria-live="polite"
            aria-atomic="true"
          >
            <p
              lang="sa"
              className="font-[family-name:var(--font-display)] text-lg tracking-wide text-emerald-100/85 md:text-2xl"
            >
              {slide.sanskrit}
            </p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.3] font-medium text-white text-shadow-lg md:text-6xl lg:text-7xl">
              “{slide.quote}”
            </h1>
            <p className="mt-5 text-sm tracking-[0.12em] text-violet-100/75 md:text-base">
              {slide.source}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-base">
              {slide.note}
            </p>
          </div>

          <div className="animate-rise-delay mt-9 flex flex-wrap gap-3">
            <Link
              href="/library"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--cosmos-2)] shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--foam)]"
            >
              探索五大知识领域
            </Link>
            <Link
              href="/c/classical-wisdom"
              className="rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-sm transition hover:bg-white/12"
            >
              阅读古典智慧
            </Link>
          </div>
        </div>

        <div className="absolute right-4 bottom-20 left-4 flex items-center justify-between gap-5 md:right-6 md:left-6">
          <div className="flex items-center gap-2">
            {wisdomSlides.map((item, index) => (
              <button
                key={item.source}
                type="button"
                onClick={() => show(index)}
                className={`h-1 rounded-full transition-all ${
                  index === active
                    ? "w-10 bg-emerald-200"
                    : "w-5 bg-white/35 hover:bg-white/60"
                }`}
                aria-label={`显示第 ${index + 1} 条智慧语句`}
                aria-current={index === active ? "true" : undefined}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => show(active - 1)}
              className="hero-control"
              aria-label="上一条"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="hero-control"
              aria-label={paused ? "继续自动播放" : "暂停自动播放"}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              type="button"
              onClick={() => show(active + 1)}
              className="hero-control"
              aria-label="下一条"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
