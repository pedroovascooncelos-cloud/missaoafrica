import type { Metadata } from "next";
import Link from "next/link";

import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Doação recebida",
  description: "Obrigado por apoiar a Missão África. Sua confirmação foi enviada com sucesso.",
};

export default function ThanksDonationPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <section className="premium-surface rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Confirmação enviada
          </p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Obrigado por sua doação</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Recebemos seus dados e nossa equipe fará a validação para emissão de recibo e registro no
            relatório de transparência.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/transparencia"
              className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Acompanhar transparência
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Voltar ao início
            </Link>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
