# Missão África - Site institucional

Site em Next.js + Tailwind para missão humanitária da igreja, com páginas de impacto, representantes, transparência e doação.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## Onde editar conteúdo sem programar

### Opção principal (recomendada): painel `/admin`

Depois de publicar no Netlify e ativar o Identity/Git Gateway:

- Acesse `https://SEU-SITE/admin`
- Faça login
- Edite os campos visuais (Instagram, contatos, links de PDF, PIX, etc.)
- Clique em **Publish**

O painel grava direto no arquivo `src/content/settings.json` via Git.

Você também edita sem código:

- `src/content/representantes.json` (dados e fotos dos missionários)
- `src/content/transparencia.json` (relatórios e linha do tempo)

No painel `/admin` isso aparece nas seções:

- **Configurações do Site**
- **Representantes**
- **Transparência**

### Opção alternativa (rápida)

Editar manualmente o arquivo `src/content/settings.json`.

## Deploy no Netlify

1. Suba este repositório para o GitHub.
2. No Netlify, clique em **Add new site > Import an existing project**.
3. Conecte ao repositório.
4. Build command: `npm run build`
5. O plugin oficial Next.js já está configurado em `netlify.toml`.
6. Faça deploy.

## Habilitar painel administrativo no Netlify

No dashboard do Netlify:

1. **Identity** -> Enable Identity
2. **Identity** -> Registration preferences -> Invite only
3. **Identity** -> Services -> Enable Git Gateway
4. Convide o usuário que vai editar conteúdo
5. Acesse `/admin`

## Firebase é necessário?

Não. Para este projeto institucional, o melhor fluxo é:

- GitHub + Netlify + painel `/admin` (Decap CMS)

Vantagens:

- simples de manter
- baixo custo
- edição sem programar
- histórico de alterações no Git

Use Firebase apenas se no futuro precisar de recursos em tempo real, autenticação avançada ou app próprio.

## Como trocar fotos e dados reais dos missionários

1. Acesse `/admin`
2. Vá em **Representantes**
3. Edite um missionário existente ou adicione um novo
4. Envie foto principal e galeria pelo próprio painel
5. Preencha país, região, função, descrição e vídeo. Coordenadas (lat/lng) são opcionais.
6. Clique em **Publish**

As imagens enviadas ficam em `public/uploads`.

## Mapa da missão

O mapa usa os dados dos missionários cadastrados.
Quando houver latitude e longitude, os marcadores ficam posicionados com precisão.

## Arquivos importantes

- `src/content/settings.json` -> conteúdo editável
- `src/content/representantes.json` -> missionários (dados, fotos e local; coordenadas opcionais)
- `src/content/transparencia.json` -> relatórios financeiros reais
- `public/admin/config.yml` -> estrutura do painel admin
- `public/admin/index.html` -> app do painel admin
- `src/data/site.ts` -> camada de dados usada pelas páginas
- `docs/mensagem-missionarios.md` -> mensagem pronta para coleta de dados

## Stack

- Next.js (App Router)
- Tailwind CSS
- Decap CMS (painel admin Git-based)
- Netlify (deploy)
