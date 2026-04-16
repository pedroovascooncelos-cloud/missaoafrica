import { getMapsLinkForRepresentative } from "@/data/site";
import type { Representative } from "@/types/site";

type MissionMapProps = {
  representatives: Representative[];
};

export function MissionMap({ representatives }: MissionMapProps) {
  const representativesWithCoordinates = representatives.filter(
    (point) => typeof point.latitude === "number" && typeof point.longitude === "number",
  );

  return (
    <section className="premium-surface rounded-[2rem] p-6 sm:p-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Presença em campo</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Mapa da Missão</h3>
        </div>
        <p className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-800 sm:text-sm">
          {representativesWithCoordinates.length} polos com coordenadas confirmadas
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            Mapa da região (OpenStreetMap)
          </div>
          <iframe
            title="Mapa da missão em Moçambique"
            src="https://www.openstreetmap.org/export/embed.html?bbox=33.8%2C-20.8%2C37.3%2C-17.0&amp;layer=mapnik"
            className="h-[340px] w-full"
          />
        </div>

        <div className="space-y-3">
          {representatives.map((point) => {
            const hasCoordinates =
              typeof point.latitude === "number" && typeof point.longitude === "number";
            const mapsLink = getMapsLinkForRepresentative(point);

            return (
              <article key={point.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{point.nome}</p>
                    <p className="text-sm text-slate-600">
                      {point.pais} - {point.regiao}
                    </p>
                  </div>
                  <span className="map-ping" />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {hasCoordinates ? "Com coordenadas" : "Sem coordenadas (pendente)"}
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                >
                  Abrir no mapa
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
