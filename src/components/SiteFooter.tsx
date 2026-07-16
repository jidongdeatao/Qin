import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between md:px-6">
        <p>
          <span className="font-[family-name:var(--font-display)] text-[var(--cosmos-2)]">
            瑜伽学人
          </span>
          {" · "}身心并修，智慧归档
        </p>
        <div className="flex gap-4">
          <Link href="/library" className="hover:text-[var(--violet)]">
            浏览资料库
          </Link>
          <Link href="/c/others" className="hover:text-[var(--violet)]">
            权威资源链接
          </Link>
        </div>
      </div>
    </footer>
  );
}
