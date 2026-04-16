import type { StatItem } from "@/types/site";

type StatsGridProps = {
  stats: StatItem[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_70px_-40px_rgba(15,23,42,0.5)]"
        >
          <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-amber-500 to-indigo-600" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {stat.label}
          </p>
          <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">{stat.value}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{stat.description}</p>
        </article>
      ))}
    </div>
  );
}
