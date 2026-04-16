import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { getSiteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Diretrizes de privacidade e tratamento de dados pessoais da Missão África.",
};

export default async function PrivacyPage() {
  const { institutionalData } = await getSiteSettings();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <section className="premium-surface rounded-2xl p-6 sm:p-8">
          <h1 className="text-3xl font-black text-slate-900">Política de Privacidade</h1>
          <p className="mt-4 text-sm text-slate-600">
            Esta política descreve como os dados pessoais são tratados no site da{" "}
            {institutionalData.organizacao}.
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              <strong>Coleta:</strong> coletamos apenas dados necessários para confirmação de doações,
              emissão de recibos e comunicação institucional.
            </p>
            <p>
              <strong>Uso:</strong> os dados são utilizados para validação de contribuições,
              prestação de contas e contato com doadores.
            </p>
            <p>
              <strong>Compartilhamento:</strong> não comercializamos dados pessoais. O
              compartilhamento ocorre somente quando necessário para cumprimento legal ou operacional.
            </p>
            <p>
              <strong>Direitos do titular:</strong> solicitação de acesso, correção e exclusão pode
              ser feita pelo canal {institutionalData.emailLgpd}.
            </p>
            <p>
              <strong>Base legal:</strong> tratamento fundamentado em consentimento e legítimo
              interesse para execução das atividades missionárias e de prestação de contas.
            </p>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
