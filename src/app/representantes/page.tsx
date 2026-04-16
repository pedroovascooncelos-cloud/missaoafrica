import type { Metadata } from "next";

import { RepresentativeCard } from "@/components/RepresentativeCard";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { getRepresentatives } from "@/data/site";

export const metadata: Metadata = {
  title: "Representantes",
  description: "Conheça os missionários e representantes que atuam em diferentes regiões da África.",
};

export default async function RepresentativesPage() {
  const representatives = await getRepresentatives();

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
        <section className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <article className="premium-surface rounded-[2rem] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Curadoria</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Todas as informações desta página são enviadas e autorizadas pelos próprios missionários.
              Novas atualizações são publicadas conforme recebimento das equipes em campo.
            </p>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_30px_60px_-40px_rgba(15,23,42,0.8)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Em atuação</p>
            <p className="mt-3 text-4xl font-black">{representatives.length}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              missionários e representantes cadastrados com informações públicas validadas.
            </p>
          </article>
        </section>
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
