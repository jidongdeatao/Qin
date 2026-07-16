import { ExternalLink } from "lucide-react";
import type { ResourceLink } from "@/data/resource-links";

export function ResourceLinks({ links }: { links: ResourceLink[] }) {
  if (!links.length) {
    return (
      <p className="text-sm text-[var(--muted)]">
        暂无精选链接。你仍可在本目录上传本地资料。
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-b border-[var(--line)] pb-4 transition hover:border-[var(--violet-soft)]"
          >
            <div className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg text-[var(--cosmos-2)] group-hover:text-[var(--violet)]">
              {link.title}
              <ExternalLink size={16} className="opacity-50 transition group-hover:opacity-100" />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              {link.description}
            </p>
            {link.tags && link.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-[var(--mint-deep)]">
                {link.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
