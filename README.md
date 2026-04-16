# Missão África - Site institucional

Site em Next.js + Tailwind para missão humanitária da igreja, com páginas de impacto, representantes, transparência, doação e painel admin nativo.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_FIREBASE_*` para login administrativo no browser
- `FIREBASE_*` para leitura/escrita segura via `firebase-admin`
- `ADMIN_ALLOWED_EMAILS` com a lista de e-mails autorizados no admin
- `USE_FIRESTORE_CONTENT=true` para ativar a leitura pública pelo Firestore
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` e `CLOUDINARY_API_SECRET` para upload de imagens

Enquanto `USE_FIRESTORE_CONTENT=false`, o site público continua lendo os JSONs locais como fallback.

## Painel administrativo

O painel fica em `/admin` e usa:

- `Firebase Auth` com e-mail/senha
- `Firestore` para persistência do conteúdo
- `Cloudinary` para upload de imagens dos representantes

Seções editáveis:

- `Configurações`
- `Representantes`
- `Transparência`

## Seed inicial do Firestore

Para validar o conteúdo antes de gravar:

```bash
npm run seed:firestore:dry
```

Para enviar os JSONs atuais ao Firestore:

```bash
npm run seed:firestore
```

O seed usa como fonte:

- `src/content/settings.json`
- `src/content/representantes.json`
- `src/content/transparencia.json`

## Camada de dados

O consumo público passa por:

- `src/data/site.ts`
- `src/data/site-repository.ts`

Fluxo atual:

1. tenta ler o Firestore no servidor
2. se o ambiente não estiver pronto, usa fallback para os JSONs locais
3. revalida cache automaticamente conforme `FIRESTORE_CONTENT_REVALIDATE_SECONDS`

## Confirmação de doação

O formulário de confirmação envia para `api/doacoes/confirmacao` e grava no Firestore, removendo a dependência operacional de Netlify Forms.

## Arquivos importantes

- `src/types/site.ts` -> contratos e validações do conteúdo
- `src/data/site.ts` -> fachada pública dos dados do site
- `src/data/site-repository.ts` -> leitura/escrita Firestore com fallback local
- `src/app/admin/page.tsx` -> shell do novo admin
- `src/components/admin/AdminAuthForm.tsx` -> login Firebase
- `src/components/admin/AdminDashboard.tsx` -> formulários das seções
- `scripts/seed-firestore.ts` -> seed dos dados atuais
- `firestore.rules` -> regras iniciais fechadas para acesso direto de clientes
- `docs/mensagem-missionarios.md` -> mensagem pronta para coleta de dados

## Stack

- Next.js (App Router)
- Tailwind CSS
- Firebase Auth
- Firestore
- Cloudinary
