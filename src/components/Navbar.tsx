"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/representantes", label: "Representantes" },
  { href: "/impacto", label: "Impacto" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/doacao", label: "Doação" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
            MA
          </span>
          Missão África
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-white hover:text-emerald-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            onClick={() => trackEvent("click_admin_nav", { origem: "navbar" })}
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            Admin
          </Link>
          <Link
            href="/doacao"
            onClick={() => trackEvent("click_doe_agora_nav", { origem: "navbar" })}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Doe Agora
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-7xl items-center gap-1 overflow-x-auto px-4 pb-3 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
