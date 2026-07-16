"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CategoryNode } from "@/data/categories";

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
    <ul className={depth === 0 ? "space-y-2" : "mt-2 space-y-1 border-l border-[var(--line)] pl-3"}>
      {nodes.map((node) => {
        const path = [...parents, node.slug];
        return (
          <li key={node.slug}>
            <Link
              href={hrefFor(path)}
              className="group flex items-start gap-2 rounded-md px-2 py-2 transition hover:bg-white/80"
            >
              <ChevronRight
                size={16}
                className="mt-0.5 shrink-0 text-[var(--violet-soft)] transition group-hover:translate-x-0.5 group-hover:text-[var(--violet)]"
              />
              <span>
                <span className="block font-medium text-[var(--ink)]">{node.title}</span>
                {node.description && (
                  <span className="mt-0.5 block text-xs leading-relaxed text-[var(--muted)]">
                    {node.description}
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
