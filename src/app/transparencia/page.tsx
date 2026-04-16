import type { Metadata } from "next";

import { FinancialTable } from "@/components/FinancialTable";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { getRepresentatives, getSiteSettings, getTransparencyContent } from "@/data/site";

export const metadata: Metadata = {
  title: "Transparência",
  description: "Acompanhe relatórios mensais, categorias de despesas e prestação de contas em tempo real.",
};

export default async function TransparencyPage() {
  const [transparency, representatives, settings] = await Promise.all([
    getTransparencyContent(),
    getRepresentatives(),
    getSiteSettings(),
  ]);
  const { monthlyReports, timeline } = transparency;
  const { receiptLinks, transparencyGoogleSheetUrl } = settings;
  const hasReports = monthlyReports.length > 0;
  const hasSheet = Boolean(transparencyGoogleSheetUrl);
  const validReceipts = receiptLinks.filter((receipt) => receipt.url && receipt.url !== "#");
  const hasTimeline = timeline.length > 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Prestação de contas"
          title="Transparência financeira completa"
          subtitle="Publicamos relatórios mensais com origem e destino dos recursos para que cada doador acompanhe o impacto real da contribuição."
        />
      </RevealOnScroll>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <article className="premium-surface rounded-[2rem] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Relatórios</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{monthlyReports.length}</p>
        </article>
        <article className="premium-surface rounded-[2rem] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Comprovantes</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{validReceipts.length}</p>
        </article>
        <article className="premium-surface rounded-[2rem] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Campos ativos</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{representatives.length}</p>
        </article>
      </div>

      {hasReports ? (
        <div className="mt-10 space-y-6">
          {monthlyReports.map((report) => (
            <RevealOnScroll key={report.mes}>
              <FinancialTable report={report} />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <RevealOnScroll className="mt-10">
          <section className="premium-surface rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-900">Relatórios em atualização</h3>
            <p className="mt-2 text-sm text-slate-700">
              Nenhum relatório financeiro foi publicado ainda. Assim que os dados reais forem
              validados, eles aparecerão nesta página.
            </p>
          </section>
        </RevealOnScroll>
      )}

      <RevealOnScroll className="mt-8">
        <section className="premium-surface rounded-[2rem] p-6">
          <h3 className="text-lg font-semibold text-slate-900">Relatório operacional inicial</h3>
          <p className="mt-2 text-sm text-slate-700">
            Enquanto os demonstrativos financeiros consolidados são finalizados, publicamos o status
            operacional real já validado em campo.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {representatives.map((rep) => (
              <li key={rep.id}>
                <strong>{rep.nome}</strong> - {rep.regiao}, {rep.pais} ({rep.funcao})
              </li>
            ))}
          </ul>
        </section>
      </RevealOnScroll>

      {hasSheet ? (
        <RevealOnScroll className="mt-12">
          <section className="premium-surface rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-900">Google Sheets público</h2>
            <p className="mt-2 text-sm text-slate-600">
              Planilha com atualização contínua dos repasses e despesas por categoria.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Relatório público de doações"
                src={transparencyGoogleSheetUrl}
                className="h-[420px] w-full"
              />
            </div>
          </section>
        </RevealOnScroll>
      ) : null}

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <RevealOnScroll>
          <section className="premium-surface rounded-[2rem] p-6">
            <h3 className="text-2xl font-bold text-slate-900">Comprovantes (PDF)</h3>
            <p className="mt-2 text-sm text-slate-600">
              Faça download dos documentos de prestação de contas dos últimos meses.
            </p>
            <div className="mt-4 space-y-2">
              {validReceipts.map((receipt) => (
                <a
                  key={receipt.label}
                  href={receipt.url}
                  className="block text-sm font-medium text-indigo-700 hover:text-indigo-800"
                >
                  {receipt.label}
                </a>
              ))}
              {validReceipts.length === 0 ? (
                <p className="text-sm text-slate-500">Ainda não há comprovantes publicados.</p>
              ) : null}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="premium-surface rounded-[2rem] p-6">
            <h3 className="text-2xl font-bold text-slate-900">Linha do tempo</h3>
            <div className="mt-4 space-y-3">
              {timeline.map((item) => (
                <article key={item.mes} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{item.mes}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.destaque}</p>
                </article>
              ))}
              {!hasTimeline ? (
                <p className="text-sm text-slate-500">Linha do tempo será publicada após validação das ações.</p>
              ) : null}
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
