import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryTree } from "@/components/CategoryTree";

export const metadata: Metadata = {
  title: "资料库",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <header className="mb-10 max-w-2xl">
        <p className="text-sm text-[var(--mint-deep)]">Yoga Scholar Archive</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--cosmos-2)] md:text-5xl">
          资料库导航
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          选择主题进入子目录，上传文档与音视频，阅读并标注你的学习轨迹。
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit rounded-2xl p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--muted)]">快速入口</h2>
          <ul className="space-y-1 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/c/${cat.slug}`}
                  className="block rounded-md px-2 py-2 hover:bg-white/80 hover:text-[var(--violet)]"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="glass-panel rounded-2xl p-5 md:p-7">
          <CategoryTree nodes={categories} />
        </div>
      </div>
    </div>
  );
}
