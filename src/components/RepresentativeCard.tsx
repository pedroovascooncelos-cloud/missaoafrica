import Image from "next/image";
import Link from "next/link";

import { Representative } from "@/data/site";

type RepresentativeCardProps = {
  representative: Representative;
};

export function RepresentativeCard({ representative }: RepresentativeCardProps) {
  return (
    <article className="premium-surface overflow-hidden rounded-3xl transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-56 w-full">
        <Image
          src={representative.foto}
          alt={representative.nome}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
          {representative.pais} - {representative.regiao}
        </p>
        <h3 className="text-xl font-semibold text-slate-900">{representative.nome}</h3>
        <p className="text-sm font-medium text-slate-700">{representative.funcao}</p>
        <p className="line-clamp-3 text-sm text-slate-600">{representative.descricao}</p>
        <Link
          href={`/representantes/${representative.id}`}
          className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Ver Detalhes
        </Link>
      </div>
    </article>
  );
}
