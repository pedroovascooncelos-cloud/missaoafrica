"use client";

import { useState } from "react";

type PixCopyButtonProps = {
  pixKey: string;
};

export function PixCopyButton({ pixKey }: PixCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pixKey);
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
      className="mt-5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
    >
      {copied ? "Chave copiada!" : "Copiar chave PIX"}
    </button>
  );
}
