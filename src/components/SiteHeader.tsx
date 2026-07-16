"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { categories } from "@/data/categories";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(248,245,255,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="瑜伽学人"
            width={44}
            height={44}
            className="rounded-full bg-white shadow-sm transition-transform duration-500 group-hover:rotate-6"
            priority
          />
          <div className="leading-tight">
            <div className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[var(--cosmos-2)] md:text-2xl">
              瑜伽学人
            </div>
            <div className="text-[11px] tracking-wide text-[var(--muted)] md:text-xs">
              AI智慧 · 人文哲学 · 身心平衡
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-sm transition ${
              pathname === "/"
                ? "bg-white text-[var(--violet)]"
                : "text-[var(--muted)] hover:bg-white/70 hover:text-[var(--ink)]"
            }`}
          >
            首页
          </Link>
          <Link
            href="/library"
            className={`rounded-md px-3 py-2 text-sm transition ${
              pathname.startsWith("/library") || pathname.startsWith("/c/")
                ? "bg-white text-[var(--violet)]"
                : "text-[var(--muted)] hover:bg-white/70 hover:text-[var(--ink)]"
            }`}
          >
            资料库
          </Link>
          <Link
            href="/c/others"
            className={`rounded-md px-3 py-2 text-sm transition ${
              pathname.startsWith("/c/others")
                ? "bg-white text-[var(--violet)]"
                : "text-[var(--muted)] hover:bg-white/70 hover:text-[var(--ink)]"
            }`}
          >
            权威链接
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex rounded-md border border-[var(--line)] bg-white/70 p-2 text-[var(--ink)] lg:hidden"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[rgba(255,255,255,0.96)] px-4 py-4 lg:hidden">
          <div className="mb-3 flex gap-2 text-sm">
            <Link href="/" className="rounded-md bg-[var(--foam)] px-3 py-2">
              首页
            </Link>
            <Link href="/library" className="rounded-md bg-[var(--foam)] px-3 py-2">
              资料库
            </Link>
          </div>
          <ul className="grid max-h-[60vh] gap-1 overflow-auto text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/c/${cat.slug}`}
                  className="block rounded-md px-3 py-2 text-[var(--ink)] hover:bg-[rgba(196,181,253,0.25)]"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
