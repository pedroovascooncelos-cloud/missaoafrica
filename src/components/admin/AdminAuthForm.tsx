"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getFirebaseClientAuth, hasFirebaseClientConfig } from "@/lib/firebase/client";

export function AdminAuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const auth = getFirebaseClientAuth();
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error || "Não foi possível iniciar a sessão.");
      }

      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao autenticar.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!hasFirebaseClientConfig()) {
    return (
      <section className="premium-surface rounded-3xl p-8">
        <h1 className="text-3xl font-black text-slate-900">Admin indisponível</h1>
        <p className="mt-3 text-sm text-slate-600">
          Configure as variáveis `NEXT_PUBLIC_FIREBASE_*` para habilitar o login administrativo.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 p-8 text-white shadow-2xl shadow-emerald-950/15">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Admin Firebase</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Entrar no painel</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/85 sm:text-base">
          Área exclusiva para atualizar o conteúdo da Missão África, publicar relatórios e gerenciar
          representantes com autenticação por e-mail e senha.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/8 p-5">
            <p className="text-sm font-semibold text-white">Configurações</p>
            <p className="mt-2 text-sm text-emerald-100/80">Home, PIX, redes sociais e dados institucionais.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/8 p-5">
            <p className="text-sm font-semibold text-white">Representantes</p>
            <p className="mt-2 text-sm text-emerald-100/80">Fotos, galerias, missão em campo e coordenadas.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/8 p-5">
            <p className="text-sm font-semibold text-white">Transparência</p>
            <p className="mt-2 text-sm text-emerald-100/80">Relatórios, despesas e linha do tempo pública.</p>
          </article>
        </div>
      </div>

      <div className="premium-surface rounded-3xl p-8">
        <h2 className="text-2xl font-black text-slate-900">Login</h2>
        <p className="mt-3 text-sm text-slate-600">
          Use o e-mail cadastrado no Firebase Authentication e autorizado no ambiente do projeto.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Entrando..." : "Entrar no painel"}
          </button>

          {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}
        </form>
      </div>
    </section>
  );
}
