import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { InstagramEmbed } from "@/components/InstagramEmbed";
import { MissionMediaCarousel } from "@/components/MissionMediaCarousel";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { getMissionImages, getRepresentatives, getSiteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "Impacto",
  description: "Histórias, vídeos e resultados reais das comunidades apoiadas pela missão.",
};

export default async function ImpactPage() {
  const [settings, representatives, missionImages] = await Promise.all([
    getSiteSettings(),
    getRepresentatives(),
    getMissionImages(),
  ]);
  const { instagramProfileUrl, instagramVideos } = settings;
  const beforeImage = representatives[0]?.galeria[0];
  const afterImage = representatives[0]?.galeria[1] ?? representatives[1]?.galeria[0];
  const instagramMedia = [
    ...instagramVideos,
    ...representatives.map((rep) => ({
      title: `Atualização de ${rep.nome}`,
      url: rep.videoUrl,
    })),
  ].filter((item, idx, list) => list.findIndex((x) => x.url === item.url) === idx);
  const hasInstagramEmbeds = instagramMedia.some(
    (item) =>
      item.url.includes("/reel/") || item.url.includes("/p/") || item.url.includes("/tv/"),
  );

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Histórias reais"
            title="O impacto da missão nas comunidades"
            subtitle="Cada doação se transforma em alimento, água, cuidado e esperança para milhares de pessoas."
          />
        </RevealOnScroll>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <RevealOnScroll>
            <article className="premium-surface rounded-[2rem] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Atualizações</p>
              <p className="mt-3 text-3xl font-black text-slate-900">{instagramMedia.length}</p>
            </article>
          </RevealOnScroll>
          <RevealOnScroll>
            <article className="premium-surface rounded-[2rem] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Representantes</p>
              <p className="mt-3 text-3xl font-black text-slate-900">{representatives.length}</p>
            </article>
          </RevealOnScroll>
          <RevealOnScroll>
            <article className="rounded-[2rem] border border-slate-200 bg-slate-900 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Transparência</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Os indicadores oficiais são publicados somente após validação mensal da equipe.
              </p>
            </article>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-y border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-slate-900">Vídeos do Instagram</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Conteúdo enviado diretamente das equipes em campo, mostrando distribuição de recursos
              e acompanhamento das famílias.
            </p>
          </RevealOnScroll>
          {hasInstagramEmbeds ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {instagramMedia.map((video) => (
                <RevealOnScroll key={video.title}>
                  <InstagramEmbed title={video.title} url={video.url} />
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <RevealOnScroll className="mt-8">
              <article className="premium-surface rounded-[2rem] p-6">
                <p className="text-sm text-slate-700">
                  Ainda não temos links diretos de post/reel para embed. Enquanto isso, acompanhe os
                  perfis oficiais dos missionários:
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {representatives.map((rep) => (
                    <a
                      key={rep.id}
                      href={rep.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50"
                    >
                      {rep.nome}
                    </a>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={instagramProfileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
                  >
                    Abrir Instagram principal
                  </a>
                  <a
                    href={`${instagramProfileUrl}stories/`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
                  >
                    Ver Stories
                  </a>
                </div>
              </article>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-slate-900">Antes e depois</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Registros visuais do progresso em alimentação, estrutura comunitária e acesso a água.
          </p>
        </RevealOnScroll>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <RevealOnScroll>
            <article className="premium-surface overflow-hidden rounded-[2rem]">
              <div className="relative h-72">
                <Image
                  src={beforeImage ?? "/api/assets/Manuel/2.jpeg"}
                  alt="Comunidade antes da assistência"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-900">Antes</p>
                <p className="mt-1 text-sm text-slate-600">
                  Famílias sem regularidade de alimentos e sem acesso adequado à água potável.
                </p>
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll>
            <article className="premium-surface overflow-hidden rounded-[2rem]">
              <div className="relative h-72">
                <Image
                  src={afterImage ?? "/api/assets/Isaias/2.jpeg"}
                  alt="Comunidade após assistência humanitária"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-900">Depois</p>
                <p className="mt-1 text-sm text-slate-600">
                  Crianças com alimentação frequente, famílias assistidas e comunidades fortalecidas.
                </p>
              </div>
            </article>
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-slate-900">Galeria da missão</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Carrossel automático com as fotos reais dos missionários cadastrados.
          </p>
          <div className="mt-6 h-[360px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
            <MissionMediaCarousel images={missionImages} className="h-full w-full" />
          </div>
        </RevealOnScroll>
      </section>

      <section className="border-t border-indigo-100 bg-indigo-50/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-slate-900">Acompanhe os relatórios completos</h2>
          </RevealOnScroll>
          <RevealOnScroll className="mt-8">
            <article className="premium-surface rounded-[2rem] p-6">
              <p className="text-sm text-slate-700">
                Para garantir credibilidade, todos os dados financeiros e comprovantes ficam na
                página de transparência.
              </p>
              <Link
                href="/transparencia"
                className="mt-4 inline-flex rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
              >
                Ir para transparência
              </Link>
            </article>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
