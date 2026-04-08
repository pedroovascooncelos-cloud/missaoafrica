import type { Metadata } from "next";

import { RepresentativeCard } from "@/components/RepresentativeCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { representatives } from "@/data/site";

export const metadata: Metadata = {
  title: "Representantes",
  description: "Conheça os missionários e representantes que atuam em diferentes regiões da África.",
};

export default function RepresentativesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Equipe em campo"
          title="Representantes da missão"
          subtitle="Cada representante trabalha com líderes locais para garantir que os recursos cheguem às famílias com eficiência e cuidado."
        />
      </RevealOnScroll>

      <RevealOnScroll className="mt-8">
        <div className="premium-surface rounded-2xl p-5">
          <p className="text-sm text-slate-700">
            Todas as informações desta página são enviadas e autorizadas pelos próprios missionários.
            Novas atualizações são publicadas conforme recebimento das equipes em campo.
          </p>
        </div>
      </RevealOnScroll>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {representatives.map((representative) => (
          <RevealOnScroll key={representative.id}>
            <RepresentativeCard representative={representative} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
