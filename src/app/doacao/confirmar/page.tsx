import type { Metadata } from "next";
import Link from "next/link";

import { DonationConfirmationForm } from "@/components/DonationConfirmationForm";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Confirmar doação",
  description: "Envie os dados da sua doação para validação e emissão de recibo.",
};

export default function ConfirmDonationPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Validação da doação"
          title="Confirme sua doação"
          subtitle="Após doar por PIX, envie os dados abaixo para que nossa equipe valide sua contribuição e encaminhe o recibo."
        />
      </RevealOnScroll>

      <RevealOnScroll className="mt-8">
        <section className="premium-surface rounded-2xl p-6 sm:p-8">
          <DonationConfirmationForm />
        </section>
      </RevealOnScroll>

      <RevealOnScroll className="mt-6">
        <Link
          href="/doacao"
          className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Voltar para doação
        </Link>
      </RevealOnScroll>
    </div>
  );
}
