import type { Metadata } from "next";
import Link from "next/link";

import { NetlifyStatusCard } from "@/components/NetlifyStatusCard";
import { netlifyLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Central Administrativa",
  description: "Acesso ao painel de conteúdo e orientações rápidas de publicação da Missão África.",
};

export default function AdminPage() {
  const links = {
    dashboard: netlifyLinks?.dashboard || "https://app.netlify.com/",
    forms: netlifyLinks?.forms || "https://app.netlify.com/",
    deploys: netlifyLinks?.deploys || "https://app.netlify.com/",
    identity: netlifyLinks?.identity || "https://app.netlify.com/",
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="premium-surface rounded-3xl p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
          Painel administrativo
        </p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Central de gestão do site</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Use esta área para acessar o CMS, atualizar conteúdo e acompanhar o fluxo de publicação sem
          mexer em código.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/admin/index.html"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Abrir painel de conteúdo
          </a>
          <Link
            href="/"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Voltar para o site
          </Link>
        </div>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <NetlifyStatusCard />

        <section className="premium-surface rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900">Atalhos Netlify</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={links.dashboard}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </a>
            <a
              href={links.forms}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Forms
            </a>
            <a
              href={links.deploys}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Deploys
            </a>
            <a
              href={links.identity}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Identity
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Você pode editar esses links em Configurações do Site &gt; Links rápidos Netlify.
          </p>
        </section>

        <section className="premium-surface rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900">Checklist rápido</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>1. Entrar no painel com e-mail convidado no Netlify Identity.</li>
            <li>2. Editar em Configurações, Representantes ou Transparência.</li>
            <li>3. Clicar em Publish para enviar para o Git.</li>
            <li>4. Aguardar deploy automático e validar no site.</li>
          </ul>
        </section>

        <section className="premium-surface rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900">Se der erro de login</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>Confirme se Identity e Git Gateway estão ativos no Netlify.</li>
            <li>Verifique se o seu e-mail foi convidado em Identity Users.</li>
            <li>Use reset de senha e tente novamente em aba anônima.</li>
            <li>Após login, retorne para esta página se precisar de suporte.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
