import type { Metadata } from "next";
import Link from "next/link";

import { PixCopyButton } from "@/components/PixCopyButton";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { getSiteSettings } from "@/data/site";
import { formatCurrency } from "@/components/format";

export const metadata: Metadata = {
  title: "Doação",
  description: "Contribua com o projeto por PIX e acompanhe como cada real é aplicado em impacto humanitário.",
};

export default async function DonationPage() {
  const { impactByDonation, institutionalData, pixData } = await getSiteSettings();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Sua contribuição importa"
          title="Doar é participar da missão"
          subtitle="Com sua oferta, missionários em campo conseguem alimentar famílias, ampliar acesso à água e fortalecer comunidades."
        />
      </RevealOnScroll>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <RevealOnScroll>
          <section className="premium-surface rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-900">Doação via PIX</h2>
            <p className="mt-2 text-sm text-slate-600">
              Método rápido e seguro para contribuir de qualquer lugar do Brasil.
            </p>
            <div className="mt-5 space-y-3 rounded-xl bg-indigo-50 p-4">
              <p className="text-sm">
                <span className="font-semibold text-slate-900">Chave PIX:</span>{" "}
                <span className="text-slate-700">{pixData.chave}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-slate-900">Titular:</span>{" "}
                <span className="text-slate-700">{pixData.titular}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-slate-900">Banco:</span>{" "}
                <span className="text-slate-700">{pixData.banco}</span>
              </p>
              {pixData.cnpj ? (
                <p className="text-sm">
                  <span className="font-semibold text-slate-900">CNPJ:</span>{" "}
                  <span className="text-slate-700">{pixData.cnpj}</span>
                </p>
              ) : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <PixCopyButton pixKey={pixData.chave} />
              <Link
                href="/doacao/confirmar"
                className="inline-flex rounded-full border border-indigo-300 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
              >
                Já doei, enviar confirmação
              </Link>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="premium-surface rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-900">Como os recursos são usados</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Alimentação e cestas emergenciais para famílias vulneráveis.</li>
              <li>Projetos de água potável e educação sanitária.</li>
              <li>Transporte e logística para alcançar comunidades remotas.</li>
              <li>Capacitação local e apoio a missionários em campo.</li>
            </ul>
          </section>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="mt-12">
        <section className="premium-surface rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-900">Impacto por valor doado</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactByDonation.map((item) => (
              <article key={item.valor} className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-xl font-bold text-slate-900">{formatCurrency(item.valor)}</p>
                <p className="mt-2 text-sm text-slate-700">{item.impacto}</p>
              </article>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll className="mt-8">
        <section className="premium-surface rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-900">Informações institucionais</h2>
          <div className="mt-3 space-y-1 text-sm text-slate-700">
            <p>
              <strong>Organização:</strong> {institutionalData.organizacao}
            </p>
            <p>
              <strong>Responsável:</strong> {institutionalData.responsavelLegal}
            </p>
            <p>
              <strong>Endereço:</strong> {institutionalData.endereco}
            </p>
            <p>
              <strong>CNPJ:</strong> {institutionalData.cnpj || "Em atualização"}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/termos"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/politica-de-doacoes"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Política de Doações
            </Link>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll className="mt-12">
        <section className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-700 to-indigo-800 p-7 text-white shadow-lg">
          <h2 className="text-3xl font-bold">Doe agora e participe da transformação</h2>
          <p className="mt-3 max-w-2xl text-indigo-50">
            Sua doação financia ações humanitárias concretas e mensuráveis. Acompanhe tudo em nossa
            página de transparência.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/doacao/confirmar"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Confirmar doação
            </a>
            <a
              href="/transparencia"
              className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver prestação de contas
            </a>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
