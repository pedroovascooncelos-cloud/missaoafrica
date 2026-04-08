type InstagramEmbedProps = {
  title: string;
  url: string;
};

function getInstagramEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    const mediaType = segments[0];
    const mediaId = segments[1];
    const isEmbeddableType = mediaType === "reel" || mediaType === "p" || mediaType === "tv";

    if (!isEmbeddableType || !mediaId) {
      return null;
    }

    return `https://www.instagram.com/${mediaType}/${mediaId}/embed`;
  } catch {
    return null;
  }
}

function getInstagramHandle(url: string) {
  try {
    const parsedUrl = new URL(url);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    const handle = segments[0];
    if (!handle) {
      return "@perfil";
    }

    return `@${handle}`;
  } catch {
    return "@perfil";
  }
}

export function InstagramEmbed({ title, url }: InstagramEmbedProps) {
  const embedUrl = getInstagramEmbedUrl(url);
  const handle = getInstagramHandle(url);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {embedUrl ? (
        <div className="aspect-video bg-slate-50">
          <iframe
            title={title}
            src={embedUrl}
            loading="lazy"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 p-6">
          <p className="max-w-sm text-center text-sm text-slate-700">
            Este item aponta para o perfil oficial no Instagram.
            <span className="mt-1 block font-semibold text-slate-900">{handle}</span>
          </p>
        </div>
      )}

      <div className="p-4">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          Abrir vídeo no Instagram
        </a>
      </div>
    </article>
  );
}
