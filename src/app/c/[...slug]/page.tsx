import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryPathKey,
  findCategoryPath,
  getCategoryByPath,
} from "@/data/categories";
import { getLinksForPath } from "@/data/resource-links";
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
  const showLinks = current.kind === "links" || links.length > 0;
  const hasChildren = Boolean(current.children?.length);
  const isLeaf = !hasChildren;
  const rankedLinks = pathKey === "others";

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
              ? "印度瑜伽大学 / 高校 / 研究机构（按国际影响力排序）"
              : current.kind === "links"
                ? "推荐权威链接"
                : "相关推荐链接"}
          </h2>
          {rankedLinks && (
            <p className="mb-4 text-sm text-[var(--muted)]">
              排序综合参考：国际学术可见度与研究合作、国家级定位、历史传承与全球教学影响。非单一官方排行榜。
            </p>
          )}
          <div className="glass-panel rounded-2xl p-5 md:p-6">
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
