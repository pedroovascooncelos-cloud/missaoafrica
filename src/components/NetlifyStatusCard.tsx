"use client";

import { useState } from "react";

type Status = "checking" | "ok" | "error" | "unknown";

function StatusPill({ label, status }: { label: string; status: Status }) {
  const styles: Record<Status, string> = {
    checking: "bg-slate-100 text-slate-700",
    ok: "bg-emerald-100 text-emerald-800",
    error: "bg-rose-100 text-rose-800",
    unknown: "bg-amber-100 text-amber-800",
  };

  const text: Record<Status, string> = {
    checking: "Verificando...",
    ok: "Configurado",
    error: "Não configurado",
    unknown: "Não verificado",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-sm font-medium text-slate-800">{label}</p>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
        {text[status]}
      </span>
    </div>
  );
}

export function NetlifyStatusCard() {
  const [identityStatus, setIdentityStatus] = useState<Status>("unknown");
  const [gitGatewayStatus, setGitGatewayStatus] = useState<Status>("unknown");

  async function checkStatus() {
    try {
      const identityResponse = await fetch("/.netlify/identity/settings", {
        method: "GET",
        cache: "no-store",
      });
      if (identityResponse.ok) {
        setIdentityStatus("ok");
      } else if (identityResponse.status === 404) {
        setIdentityStatus("error");
      } else {
        setIdentityStatus("unknown");
      }
    } catch {
      setIdentityStatus("unknown");
    }

    try {
      const gatewayResponse = await fetch("/.netlify/git/branches", {
        method: "GET",
        cache: "no-store",
      });
      if ([200, 401, 403].includes(gatewayResponse.status)) {
        setGitGatewayStatus("ok");
      } else if (gatewayResponse.status === 404) {
        setGitGatewayStatus("error");
      } else {
        setGitGatewayStatus("unknown");
      }
    } catch {
      setGitGatewayStatus("unknown");
    }
  }

  return (
    <section className="premium-surface rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-900">Status Netlify</h2>
        <button
          type="button"
          onClick={() => {
            setIdentityStatus("checking");
            setGitGatewayStatus("checking");
            void checkStatus();
          }}
          className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Revalidar
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <StatusPill label="Identity" status={identityStatus} />
        <StatusPill label="Git Gateway" status={gitGatewayStatus} />
      </div>
    </section>
  );
}
