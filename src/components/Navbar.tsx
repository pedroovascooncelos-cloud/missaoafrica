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
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <header className="sticky top-0 z-50 border-b border-white/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Missão África</p>
            <p className="text-sm font-semibold text-slate-900">Painel administrativo</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:px-4 sm:py-2 sm:text-sm"
            >
              Ver site
            </Link>
            <span className="rounded-full bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm">
              Admin
            </span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-slate-900">
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-700 sm:text-[11px] sm:tracking-[0.28em]">
              Missão Humanitária
            </span>
            <span className="mt-1 text-lg font-black tracking-tight sm:text-xl">Missão África</span>
          </div>
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
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-white hover:text-indigo-700"
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
            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:px-4 sm:py-2 sm:text-sm"
          >
            Admin
          </Link>
          <Link
            href="/doacao"
            onClick={() => trackEvent("click_doe_agora_nav", { origem: "navbar" })}
            className="rounded-full bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-800 sm:px-4 sm:py-2 sm:text-sm"
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
                  ? "bg-slate-900 text-white"
                  : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
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
