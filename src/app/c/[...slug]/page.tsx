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

  const mediaAccept =
    current.kind === "media"
      ? ".txt,.md,.markdown,.pdf,.doc,.docx,.mp3,.wav,.m4a,.mp4,.webm,.mov,audio/*,video/*,text/*"
      : undefined;

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
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            {current.kind === "links" ? "推荐权威链接" : "相关推荐链接"}
          </h2>
          <div className="glass-panel rounded-2xl p-5 md:p-6">
            <ResourceLinks links={links} />
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
            mediaHint="除推荐外链外，你也可上传本地整理的链接清单或摘录文档。"
          />
        </section>
      ) : isLeaf ? (
        <FileLibrary
          categoryPath={pathKey}
          accept={mediaAccept}
          mediaHint={
            current.kind === "media"
              ? "本栏目支持上传文本、音频与视频素材，便于声音疗愈与智慧问答的资料管理。"
              : current.kind === "community"
                ? "分享社群活动纪要、课程纲要与实践心得文档。"
                : undefined
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
