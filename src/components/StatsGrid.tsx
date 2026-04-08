import { StatItem } from "@/data/site";

type StatsGridProps = {
  stats: StatItem[];
};

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
          <p className="mt-2 text-sm text-slate-600">{stat.description}</p>
        </article>
      ))}
    </div>
  );
}
