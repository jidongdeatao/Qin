import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { CategoryNode } from "@/data/categories";
import { countLinksUnderPath } from "@/data/resource-links";

function hrefFor(slugs: string[]) {
  return `/c/${slugs.join("/")}`;
}

function NodeList({
  nodes,
  parents,
  depth = 0,
}: {
  nodes: CategoryNode[];
  parents: string[];
  depth?: number;
}) {
  return (
    <ul
      className={
        depth === 0
          ? "grid gap-3 md:grid-cols-2"
          : "mt-2 space-y-1 border-l border-[var(--line)] pl-3"
      }
    >
      {nodes.map((node) => {
        const path = [...parents, node.slug];
        const resourceCount = countLinksUnderPath(path.join("/"));
        return (
          <li key={node.slug} className={depth === 0 ? "h-full" : undefined}>
            <Link
              href={hrefFor(path)}
              className={
                depth === 0
                  ? "group flex h-full items-start gap-3 rounded-xl border border-transparent bg-white/45 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--line)] hover:bg-white/85"
                  : "group flex items-start gap-2 rounded-md px-2 py-2 transition hover:bg-white/80"
              }
            >
              {depth === 0 ? (
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(196,181,253,0.2)] text-[var(--violet)]">
                  <ArrowUpRight size={16} />
                </span>
              ) : (
                <ChevronRight
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--violet-soft)] transition group-hover:translate-x-0.5 group-hover:text-[var(--violet)]"
                />
              )}
              <span className="min-w-0">
                <span className="block font-medium text-[var(--ink)] transition group-hover:text-[var(--violet)]">
                  {node.title}
                </span>
                {node.description && (
                  <span className="mt-0.5 block text-xs leading-relaxed text-[var(--muted)]">
                    {node.description}
                  </span>
                )}
                {resourceCount > 0 && (
                  <span className="mt-2 block text-[11px] tracking-wide text-[var(--mint-deep)]">
                    {resourceCount} 条精选资源
                  </span>
                )}
              </span>
            </Link>
            {node.children && node.children.length > 0 && (
              <NodeList nodes={node.children} parents={path} depth={depth + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function CategoryTree({
  nodes,
  parents = [],
}: {
  nodes: CategoryNode[];
  parents?: string[];
}) {
  return <NodeList nodes={nodes} parents={parents} />;
}
