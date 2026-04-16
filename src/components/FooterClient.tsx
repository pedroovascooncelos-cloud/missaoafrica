"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ContactData, SocialLinks } from "@/types/site";

type FooterClientProps = {
  contact: ContactData;
  socialLinks: SocialLinks;
};

export function FooterClient({ contact, socialLinks }: FooterClientProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-white/80 bg-gradient-to-b from-white via-stone-50 to-indigo-50/35">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">Missão Humanitária</p>
          <p className="mt-2 text-xl font-black tracking-tight text-slate-900">Missão África</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            Movimento da igreja para apoio integral a missionários na África com foco em alimentação,
            água, discipulado e dignidade.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Email: {contact.email}</li>
            <li>WhatsApp: {contact.whatsapp}</li>
            <li>{contact.city}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">
            Redes sociais
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-100"
            >
              Instagram
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-100"
            >
              YouTube
            </a>
            <Link
              href="/transparencia"
              className="rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-100"
            >
              Relatórios
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/termos"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Termos
            </Link>
            <Link
              href="/privacidade"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Privacidade
            </Link>
            <Link
              href="/politica-de-doacoes"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Política de doações
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
