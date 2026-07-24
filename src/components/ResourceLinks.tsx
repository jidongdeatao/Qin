import { BookOpen, ExternalLink, Globe2, ShieldCheck } from "lucide-react";
import type { ResourceLink } from "@/data/resource-links";

function hostFor(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function accessFor(link: ResourceLink) {
  if (link.access) return link.access;
  if (link.tags?.some((tag) => /Public Domain|公共版权/.test(tag))) {
    return "公共版权";
  }
  if (link.tags?.some((tag) => /文献|数据库|研究|期刊/.test(tag))) {
    return "研究入口";
  }
  return "机构官网";
}

export function ResourceLinks({
  links,
  showRank = false,
}: {
  links: ResourceLink[];
  showRank?: boolean;
}) {
  if (!links.length) {
    return (
      <p className="text-sm text-[var(--muted)]">
        暂无精选链接。你仍可在本目录上传本地资料。
      </p>
    );
  }

  const ordered = showRank
    ? [...links].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    : links;

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {ordered.map((link, index) => {
        const rank = link.rank ?? (showRank ? index + 1 : undefined);
        const access = accessFor(link);
        return (
          <li key={link.url} className="h-full">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-[var(--line)] bg-white/55 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--violet-soft)] hover:bg-white/85 hover:shadow-[0_14px_35px_rgba(49,20,96,0.1)]"
            >
              <div className="flex flex-1 items-start gap-3">
                {rank !== undefined && (
                  <span className="mt-0.5 inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-[rgba(167,243,208,0.35)] px-2 font-[family-name:var(--font-display)] text-sm text-[var(--mint-deep)]">
                    {String(rank).padStart(2, "0")}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3 font-[family-name:var(--font-display)] text-lg leading-snug text-[var(--cosmos-2)] group-hover:text-[var(--violet)]">
                    {link.title}
                    <ExternalLink
                      size={16}
                      className="mt-1 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {link.description}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--line)] pt-3 text-[11px] text-[var(--muted)]">
                <span className="inline-flex items-center gap-1">
                  {access === "公共版权" ? (
                    <ShieldCheck size={13} className="text-[var(--mint-deep)]" />
                  ) : (
                    <BookOpen size={13} className="text-[var(--violet)]" />
                  )}
                  {access}
                </span>
                {link.languages && (
                  <span className="rounded-full bg-[var(--foam)] px-2 py-0.5">
                    {link.languages.join(" · ")}
                  </span>
                )}
                <span className="inline-flex min-w-0 items-center gap-1">
                  <Globe2 size={13} />
                  <span className="truncate">{hostFor(link.url)}</span>
                </span>
              </div>
              {link.tags && link.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[var(--mint-deep)]">
                  {link.tags.slice(0, 4).map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
