import { representatives } from "@/data/site";

export function MissionMap() {
  const representativesWithCoordinates = representatives.filter(
    (point) => typeof point.latitude === "number" && typeof point.longitude === "number",
  );

  return (
    <section className="premium-surface rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-bold text-slate-900">Mapa da Missão</h3>
        <p className="text-sm text-slate-600">
          {representativesWithCoordinates.length} polos com coordenadas confirmadas
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
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
            const mapsLink = hasCoordinates
              ? `https://www.google.com/maps?q=${point.latitude},${point.longitude}`
              : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${point.regiao}, ${point.pais}`,
                )}`;

            return (
            <article key={point.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">{point.nome}</p>
              <p className="text-sm text-slate-600">
                {point.pais} - {point.regiao}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {hasCoordinates
                  ? "Com coordenadas"
                  : "Sem coordenadas (pendente)"}
              </p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-xs font-semibold text-emerald-700 hover:text-emerald-800"
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
