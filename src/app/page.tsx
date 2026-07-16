import Link from "next/link";
import { categories } from "@/data/categories";
import { HomeHero } from "@/components/HomeHero";

const pillars = [
  {
    title: "AI 智慧",
    body: "对所选段落生成摘要、讲解、术语梳理与延伸思考题，让阅读更深入、更高效。",
  },
  {
    title: "人文哲学",
    body: "从古典文本到当代思想，按主题归档哲学、文化与美学文献，持续沉淀洞见。",
  },
  {
    title: "身心平衡",
    body: "连接身体科学、心理意识与实践智慧，在文献与练习之间建立可回归的平衡路径。",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--cosmos-2)] md:text-4xl">
            十大知识领域
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            以人文哲学为根、身心科学为脉、AI 智慧为伴——按主题归档，深入阅读，持续积累。
          </p>
        </div>

        <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {categories.map((cat, index) => (
            <li key={cat.slug} className="border-t border-[var(--line)] pt-5">
              <Link href={`/c/${cat.slug}`} className="group block">
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-display)] text-sm text-[var(--mint-deep)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] transition group-hover:text-[var(--violet)]">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {cat.description}
                </p>
                {cat.children && cat.children.length > 0 && (
                  <p className="mt-2 text-xs text-[var(--violet)]">
                    {cat.children.length} 个子目录 →
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[var(--line)] bg-white/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3 md:px-6">
          {pillars.map((item) => (
            <div key={item.title}>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--cosmos-2)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
