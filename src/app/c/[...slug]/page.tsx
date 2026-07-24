import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpenCheck, LibraryBig, ShieldCheck } from "lucide-react";
import {
  categoryPathKey,
  findCategoryPath,
  getCategoryByPath,
} from "@/data/categories";
import {
  countLinksUnderPath,
  getLinksForPath,
} from "@/data/resource-links";
import { CategoryTree } from "@/components/CategoryTree";
import { FileLibrary } from "@/components/FileLibrary";
import { ResourceLinks } from "@/components/ResourceLinks";
import { DEFAULT_UPLOAD_ACCEPT } from "@/lib/upload-accept";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const node = getCategoryByPath(slug);
  return {
    title: node?.title ?? "目录",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const path = findCategoryPath(slug);
  if (!path) notFound();

  const current = path[path.length - 1];
  const pathKey = categoryPathKey(slug);
  const links = getLinksForPath(pathKey);
  const curatedCount = countLinksUnderPath(pathKey);
  const showLinks = current.kind === "links" || links.length > 0;
  const hasChildren = Boolean(current.children?.length);
  const isLeaf = !hasChildren;
  const rankedLinks =
    pathKey === "research-institutions/institution-directory";

  const mediaAccept =
    current.kind === "media"
      ? ".txt,.md,.markdown,.pdf,.doc,.docx,.mp3,.wav,.m4a,.mp4,.webm,.mov,audio/*,video/*,text/*,application/pdf"
      : DEFAULT_UPLOAD_ACCEPT;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/library" className="hover:text-[var(--violet)]">
          资料库
        </Link>
        {path.map((node, idx) => {
          const href = `/c/${slug.slice(0, idx + 1).join("/")}`;
          const last = idx === path.length - 1;
          return (
            <span key={href} className="flex items-center gap-2">
              <span>/</span>
              {last ? (
                <span className="text-[var(--ink)]">{node.title}</span>
              ) : (
                <Link href={href} className="hover:text-[var(--violet)]">
                  {node.title}
                </Link>
              )}
            </span>
          );
        })}
      </nav>

      <header className="mb-10 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--cosmos-2)] md:text-5xl">
          {current.title}
        </h1>
        {current.description && (
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
            {current.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/55 px-3 py-1.5 text-[var(--muted)]">
            <LibraryBig size={14} className="text-[var(--violet)]" />
            {hasChildren ? `${current.children!.length} 个主题` : "专题资料页"}
          </span>
          {curatedCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/55 px-3 py-1.5 text-[var(--muted)]">
              <BookOpenCheck size={14} className="text-[var(--mint-deep)]" />
              {curatedCount} 条精选资源
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white/55 px-3 py-1.5 text-[var(--muted)]">
            <ShieldCheck size={14} className="text-[var(--mint-deep)]" />
            来源与版权分级
          </span>
        </div>
      </header>

      {hasChildren && (
        <section className="mb-12">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            子目录
          </h2>
          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <CategoryTree nodes={current.children!} parents={slug} />
          </div>
        </section>
      )}

      {showLinks && (
        <section className="mb-12">
          <h2 className="mb-2 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            {rankedLinks
              ? "瑜伽大学、研究机构与权威资源综合目录"
              : current.kind === "links"
                ? "推荐权威链接"
                : "相关推荐链接"}
          </h2>
          {rankedLinks && (
            <p className="mb-4 text-sm text-[var(--muted)]">
              原“其他”目录内容已完整迁入。序号仅用于浏览，不代表官方排名或本站背书；访问、课程与资质信息请向机构核验。
            </p>
          )}
          {!rankedLinks && (
            <p className="mb-5 max-w-3xl text-sm leading-6 text-[var(--muted)]">
              资源按公共版权、开放获取、研究入口与机构官网标识。链接可访问不代表允许转载；引用前请查看来源页最新许可。
            </p>
          )}
          <div>
            <ResourceLinks links={links} showRank={rankedLinks} />
          </div>
        </section>
      )}

      {current.kind === "links" ? (
        <section className="mt-10">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            本地补充资料
          </h2>
          <FileLibrary
            categoryPath={pathKey}
            accept={DEFAULT_UPLOAD_ACCEPT}
            mediaHint="除推荐外链外，你也可上传本地整理的链接清单、机构简介或摘录文档。"
          />
        </section>
      ) : isLeaf ? (
        <FileLibrary
          categoryPath={pathKey}
          accept={mediaAccept}
          mediaHint={
            current.kind === "media"
              ? "本栏目支持上传文本、PDF、音频与视频素材。"
              : current.kind === "community"
                ? "分享社群活动纪要、课程纲要与实践心得文档。"
                : "支持上传文本、PDF、Office 与多媒体资料；经典文献可直接归档于此。"
          }
        />
      ) : (
        <section className="mt-12">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            本目录综合资料
          </h2>
          <FileLibrary
            categoryPath={pathKey}
            accept={mediaAccept}
            mediaHint="也可直接在本级目录归档综合性文献；细分资料建议放入对应子目录。"
          />
        </section>
      )}
    </div>
  );
}
