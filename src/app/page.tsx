import Link from "next/link";
import { categories } from "@/data/categories";
import { HomeHero } from "@/components/HomeHero";

const pillars = [
  {
    title: "文本有出处",
    body: "优先收录梵文原典、公共版权历史译本、机构官网与开放获取文献，并清楚标注来源。",
  },
  {
    title: "研究有边界",
    body: "区分传统阐释、现代研究与临床证据，不把探索性成果写成确定的医疗结论。",
  },
  {
    title: "实践有敬畏",
    body: "技术资料同时呈现学习顺序、风险和禁忌；进阶呼吸与清洁法应接受合格教师指导。",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs tracking-[0.24em] text-[var(--mint-deep)] uppercase">
            A living archive
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--cosmos-2)] md:text-4xl">
            五大知识领域
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            从古典原典到当代科学，从内在技术到全球机构，建立一条可阅读、可检索、可持续扩充的瑜伽知识路径。
          </p>
        </div>

        <ol className="grid gap-4 md:grid-cols-2">
          {categories.map((cat, index) => (
            <li
              key={cat.slug}
              className={index === categories.length - 1 ? "md:col-span-2" : ""}
            >
              <Link
                href={`/c/${cat.slug}`}
                className="group glass-panel relative block h-full overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(124,58,237,0.3)] md:p-8"
              >
                <div className="absolute -right-8 -bottom-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.26),transparent_70%)] transition duration-500 group-hover:scale-125" />
                <div className="relative mb-3 flex items-baseline gap-4">
                  <span className="font-[family-name:var(--font-display)] text-sm tracking-[0.16em] text-[var(--mint-deep)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] transition group-hover:text-[var(--violet)] md:text-3xl">
                    {cat.title}
                  </h3>
                </div>
                <p className="relative max-w-2xl text-sm leading-7 text-[var(--muted)]">
                  {cat.description}
                </p>
                {cat.children && cat.children.length > 0 && (
                  <p className="relative mt-5 text-xs tracking-wide text-[var(--violet)]">
                    探索 {cat.children.length} 个主题方向 →
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
