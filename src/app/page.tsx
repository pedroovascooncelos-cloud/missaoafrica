import type { Metadata } from "next";
import Link from "next/link";

import { InstagramEmbed } from "@/components/InstagramEmbed";
import { MissionMap } from "@/components/MissionMap";
import { MissionMediaCarousel } from "@/components/MissionMediaCarousel";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { StatsGrid } from "@/components/StatsGrid";
import {
  heroMessage,
  instagramProfileUrl,
  instagramVideos,
  missionImages,
  missionStatement,
  quickStats,
  representatives,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Conheça a missão, veja o impacto real e apoie missionários na África com doações transparentes.",
};

export default function Home() {
  const hasInstagramEmbeds = instagramVideos.some(
    (item) =>
      item.url.includes("/reel/") || item.url.includes("/p/") || item.url.includes("/tv/"),
  );

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/80 bg-gradient-to-br from-emerald-50/70 via-amber-50/70 to-sky-50/70">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24 lg:px-8">
          <RevealOnScroll>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Missão Humanitária da Igreja
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              {heroMessage}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">{missionStatement}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/doacao"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Doe Agora
              </Link>
              <Link
                href="/transparencia"
                className="rounded-full border border-emerald-300 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Ver Transparência
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="lg:justify-self-end">
            <div className="premium-surface relative h-[360px] overflow-hidden rounded-3xl sm:h-[420px] lg:w-[500px]">
              <MissionMediaCarousel images={missionImages} className="h-full w-full" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Impacto em números"
            title="Transparência e transformação lado a lado"
            subtitle="Acompanhamos mensalmente resultados e prestação de contas para garantir confiança em cada contribuição."
          />
          <div className="mt-8">
            <StatsGrid stats={quickStats} />
          </div>
        </RevealOnScroll>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <MissionMap />
        </RevealOnScroll>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Representantes"
            title="Quem está em campo"
            subtitle="Nossos representantes vivem a missão todos os dias em parceria com igrejas e líderes locais."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {representatives.slice(0, 2).map((rep) => (
              <article
                key={rep.id}
                className="premium-surface rounded-2xl p-5 transition hover:shadow-md"
              >
                <p className="text-sm font-semibold text-slate-900">{rep.nome}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {rep.pais} - {rep.funcao}
                </p>
                <p className="mt-3 text-sm text-slate-600">{rep.descricao}</p>
              </article>
            ))}
          </div>
          <Link
            href="/representantes"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Conhecer representantes
          </Link>
        </RevealOnScroll>
      </section>

      <section className="border-y border-emerald-100 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Mídia em campo"
              title="Veja a missão acontecendo"
              subtitle="Conteúdo diário publicado por missionários e equipes locais."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {hasInstagramEmbeds ? (
                instagramVideos.map((video) => (
                  <InstagramEmbed key={video.title} title={video.title} url={video.url} />
                ))
              ) : (
                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:col-span-3">
                  <p className="text-sm text-slate-700">
                    Para exibir postagens no site, adicione links diretos de post/reel no painel
                    admin. No momento, estamos usando apenas o perfil oficial.
                  </p>
                  <a
                    href={instagramProfileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Abrir Instagram oficial
                  </a>
                </article>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
