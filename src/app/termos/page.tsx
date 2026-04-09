import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { institutionalData } from "@/data/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições de uso do site da Missão África.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <section className="premium-surface rounded-2xl p-6 sm:p-8">
          <h1 className="text-3xl font-black text-slate-900">Termos de Uso</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              O uso deste site implica concordância com estes termos. O conteúdo é institucional e
              informativo, voltado à divulgação da missão e captação de doações.
            </p>
            <p>
              As informações de doação e transparência são atualizadas periodicamente conforme
              validação da equipe responsável.
            </p>
            <p>
              É vedado uso indevido de textos, imagens e materiais sem autorização expressa da{" "}
              {institutionalData.organizacao}.
            </p>
            <p>
              Para questões jurídicas e solicitações formais, entre em contato pelo e-mail{" "}
              {institutionalData.emailLgpd}.
            </p>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
