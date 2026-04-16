import Image from "next/image";
import Link from "next/link";

import type { Representative } from "@/types/site";

type RepresentativeCardProps = {
  representative: Representative;
};

export function RepresentativeCard({ representative }: RepresentativeCardProps) {
  return (
    <article className="group premium-surface overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <div className="relative h-56 w-full">
        <Image
          src={representative.foto}
          alt={representative.nome}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {representative.funcao}
          </span>
        </div>
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
          {representative.pais} - {representative.regiao}
        </p>
        <h3 className="text-2xl font-black tracking-tight text-slate-900">{representative.nome}</h3>
        <p className="line-clamp-3 text-sm leading-7 text-slate-600">{representative.descricao}</p>
        <Link
          href={`/representantes/${representative.id}`}
          className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Ver Detalhes
        </Link>
      </div>
    </article>
  );
}
