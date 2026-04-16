import type { Metadata } from "next";
import Link from "next/link";

import { InstagramEmbed } from "@/components/InstagramEmbed";
import { MissionMap } from "@/components/MissionMap";
import { MissionMediaCarousel } from "@/components/MissionMediaCarousel";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import {
  getMissionImages,
  getRepresentatives,
  getSiteSettings,
  heroMessage,
  missionStatement,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Conheça a missão, veja o impacto real e apoie missionários na África com doações transparentes.",
};

export default async function Home() {
  const [settings, representatives, missionImages] = await Promise.all([
    getSiteSettings(),
    getRepresentatives(),
    getMissionImages(),
  ]);
  const { instagramProfileUrl, instagramVideos, quickStats } = settings;
  const hasInstagramEmbeds = instagramVideos.some(
    (item) =>
      item.url.includes("/reel/") || item.url.includes("/p/") || item.url.includes("/tv/"),
  );

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/80 bg-gradient-to-br from-indigo-50/70 via-stone-100/60 to-amber-50/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(67,56,202,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(180,83,9,0.12),transparent_30%)]" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28 lg:px-8">
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-amber-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700 shadow-sm">
              Missão Humanitária da Igreja
            </span>
            <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {heroMessage}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              {missionStatement}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/doacao"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Doe Agora
              </Link>
              <Link
                href="/transparencia"
                className="rounded-full border border-indigo-300 bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Ver Transparência
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <article key={stat.label} className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.description}</p>
                </article>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="lg:justify-self-end">
            <div className="premium-surface relative h-[320px] overflow-hidden rounded-[2rem] border border-white/80 sm:h-[460px] lg:w-[520px]">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-b from-slate-950/60 to-transparent px-4 py-3 text-white sm:px-5 sm:py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">Missão em campo</p>
                  <p className="mt-1 text-sm font-semibold">Registros reais da atuação</p>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                  Atualizações visuais
                </span>
              </div>
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
        </RevealOnScroll>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <MissionMap representatives={representatives} />
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

      <section className="border-y border-indigo-100 bg-white">
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
                    className="mt-4 inline-flex rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
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
