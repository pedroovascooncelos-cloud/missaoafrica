"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

type PixCopyButtonProps = {
  pixKey: string;
};

export function PixCopyButton({ pixKey }: PixCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pixKey);
      trackEvent("click_copiar_pix", { origem: "pagina_doacao" });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
    >
      {copied ? "Chave copiada!" : "Copiar chave PIX"}
    </button>
  );
}
