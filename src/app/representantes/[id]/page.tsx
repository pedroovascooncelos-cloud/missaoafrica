import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InstagramEmbed } from "@/components/InstagramEmbed";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { representatives } from "@/data/site";

type RepresentativeDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return representatives.map((representative) => ({ id: representative.id }));
}

export async function generateMetadata({ params }: RepresentativeDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const representative = representatives.find((item) => item.id === id);

  if (!representative) {
    return { title: "Representante não encontrado" };
  }

  return {
    title: representative.nome,
    description: `${representative.nome} atua em ${representative.pais} na missão ${representative.funcao.toLowerCase()}.`,
  };
}

export default async function RepresentativeDetailsPage({ params }: RepresentativeDetailsProps) {
  const { id } = await params;
  const representative = representatives.find((item) => item.id === id);

  if (!representative) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="premium-surface relative h-[360px] overflow-hidden rounded-3xl sm:h-[460px]">
            <Image
              src={representative.foto}
              alt={representative.nome}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {representative.pais} - {representative.regiao}
            </p>
            <h1 className="mt-2 text-4xl font-black text-slate-900">{representative.nome}</h1>
            <p className="mt-2 text-lg font-medium text-slate-700">{representative.funcao}</p>
            <p className="mt-6 leading-relaxed text-slate-600">{representative.descricao}</p>
            <Link
              href="/doacao"
              className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Apoiar este campo missionário
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Galeria da atuação</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {representative.galeria.map((image) => (
            <div key={image} className="premium-surface relative h-64 overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={`Atuação de ${representative.nome}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Vídeo em campo</h2>
        <div className="mt-5 max-w-lg">
          <InstagramEmbed
            title={`Atualização de ${representative.nome}`}
            url={representative.videoUrl}
          />
        </div>
      </RevealOnScroll>
    </div>
  );
}
