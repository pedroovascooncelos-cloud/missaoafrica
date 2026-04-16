import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { getSiteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de Doações e Reembolsos",
  description: "Regras sobre doações, validação de comprovantes e tratativas de estorno.",
};

export default async function DonationsPolicyPage() {
  const { pixData } = await getSiteSettings();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <section className="premium-surface rounded-2xl p-6 sm:p-8">
          <h1 className="text-3xl font-black text-slate-900">Política de Doações e Reembolsos</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              As doações são espontâneas e destinadas ao apoio missionário, alimentação, água,
              logística e ações sociais em campo.
            </p>
            <p>
              Doações via PIX devem ser realizadas para a chave oficial: <strong>{pixData.chave}</strong>.
            </p>
            <p>
              Após a contribuição, recomenda-se o envio da confirmação na página específica para
              emissão de recibo e registro em relatório.
            </p>
            <p>
              Em caso de erro operacional (valor ou chave incorreta), o doador deve entrar em contato
              em até 7 dias corridos com comprovante para análise de estorno.
            </p>
            <p>
              Solicitações de estorno serão avaliadas conforme legislação aplicável e possibilidade
              operacional de rastreio da transferência.
            </p>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
