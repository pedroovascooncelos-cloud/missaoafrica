"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type MissionMediaCarouselProps = {
  images: string[];
  intervalMs?: number;
  className?: string;
};

export function MissionMediaCarousel({
  images,
  intervalMs = 4000,
  className = "",
}: MissionMediaCarouselProps) {
  const uniqueImages = useMemo(() => Array.from(new Set(images)), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (uniqueImages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % uniqueImages.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, uniqueImages.length]);

  if (!uniqueImages.length) {
    return (
      <div className={`flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500 ${className}`}>
        Sem imagens disponíveis
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {uniqueImages.map((image, current) => (
        <div
          key={`${image}-${current}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt="Registro da missão em campo"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 500px"
          />
        </div>
      ))}

      {uniqueImages.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
          {uniqueImages.map((image, current) => (
            <button
              key={`${image}-dot-${current}`}
              type="button"
              aria-label={`Ir para imagem ${current + 1}`}
              onClick={() => setIndex(current)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === current ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
