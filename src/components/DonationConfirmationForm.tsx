"use client";

import { trackEvent } from "@/lib/analytics";

export function DonationConfirmationForm() {
  function handleSubmit() {
    trackEvent("submit_confirmacao_doacao", { origem: "pagina_confirmar_doacao" });
  }

  return (
    <form
      name="confirmacao-doacao"
      method="POST"
      action="/doacao/obrigado"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="confirmacao-doacao" />
      <input type="hidden" name="bot-field" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-700">
          Nome completo
          <input
            type="text"
            name="nome"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </label>
        <label className="text-sm text-slate-700">
          E-mail
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-700">
          WhatsApp
          <input
            type="text"
            name="whatsapp"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </label>
        <label className="text-sm text-slate-700">
          Valor doado (R$)
          <input
            type="number"
            name="valor"
            min="1"
            step="1"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </label>
      </div>

      <label className="text-sm text-slate-700">
        Identificador da transação (PIX/TXID) - opcional
        <input
          type="text"
          name="txid"
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        />
      </label>

      <label className="text-sm text-slate-700">
        Link do comprovante (Google Drive/Dropbox) - opcional
        <input
          type="url"
          name="comprovante"
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input type="checkbox" name="consentimento" required className="mt-1" />
        Confirmo que os dados enviados estão corretos e autorizo contato da equipe para validação da
        doação e emissão de recibo.
      </label>

      <button
        type="submit"
        className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Enviar confirmação
      </button>
    </form>
  );
}
