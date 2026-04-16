# Plano completo: Admin sem Netlify (Firebase + Cloudinary)

## Contexto do problema

Durante os testes do painel administrativo, o fluxo atual com Decap CMS + Netlify apresentou falhas e dependência excessiva de serviços externos.

Principais sintomas observados:
- Tela travada em: `Carregando painel administrativo...`
- Dependência de `Netlify Identity` + `Git Gateway`
- Fluxo frágil para ambiente local

## Diagnóstico que foi feito

1. O redirect pós-login no admin estava indo para a rota errada.
   - Antes: `/admin/`
   - Correto: `/admin/index.html`

2. Em ambiente local, `git-gateway` não funciona de forma estável sem backend proxy local.
   - Solução temporária de dev: `local_backend: true` em `public/admin/config.yml`
   - Rodar proxy local: `npx decap-server`

3. Mesmo com ajuste, o modelo continua acoplado ao Netlify, que você não quer manter.

## Decisão de arquitetura (definida)

Você decidiu:
- Remover dependência de Netlify para o painel
- Usar `Firebase Auth` com `email/senha`
- Usar `Firestore` para conteúdo do site
- Não usar `Firebase Storage` (evitar custo)
- Usar `Cloudinary` (plano gratuito) para upload de imagens
- Permitir edição de todas as seções atuais do site

## Escopo funcional do novo admin

Editar pelo painel:
- Configurações do site
- Representantes
- Transparência

Autenticação:
- Login admin com email/senha (Firebase Auth)

Mídia:
- Upload de fotos/galeria de representantes via Cloudinary
- Persistir URLs das imagens no Firestore

## Plano de implementação (passo a passo)

## Fase 1 - Base Firebase
- Configurar Firebase no projeto (Auth + Firestore)
- Criar utilitários cliente/servidor
- Definir variáveis de ambiente
- Implementar regras de segurança no Firestore para escrita só de admins

## Fase 2 - Modelo de dados
- Criar estrutura no Firestore equivalente aos JSON atuais:
  - `site/settings`
  - `site/representantes`
  - `site/transparencia`
- Garantir compatibilidade de tipos com o frontend atual

## Fase 3 - Migração inicial
- Criar script para migrar:
  - `src/content/settings.json`
  - `src/content/representantes.json`
  - `src/content/transparencia.json`
- Validar paridade dos dados migrados

## Fase 4 - Leitura de dados no site público
- Refatorar a camada de dados para ler Firestore
- Manter fallback temporário para JSON local durante transição

## Fase 5 - Novo painel admin
- Criar rota `/admin` com proteção por auth
- Implementar formulários por seção:
  - Configurações
  - Representantes
  - Transparência
- Salvar alterações no Firestore

## Fase 6 - Mídia com Cloudinary
- Implementar upload no painel para Cloudinary
- Salvar URLs retornadas no Firestore
- Exibir preview e permitir troca/remoção de imagens

## Fase 7 - Corte do legado Netlify CMS
- Remover fluxo operacional de Decap/Netlify
- Atualizar documentação do projeto
- Validar fluxo completo de edição no novo admin

## Fluxo alvo (resumo)

1. Admin faz login (Firebase Auth)
2. Painel carrega dados do Firestore
3. Admin edita conteúdo e salva
4. Site público lê conteúdo do Firestore
5. Imagens sobem no Cloudinary e ficam linkadas no Firestore

## Variáveis de ambiente sugeridas

Exemplo de `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Critérios de aceite

- Login admin com email/senha funcionando
- Todas as seções atuais editáveis via painel
- Site público refletindo alterações salvas
- Upload de imagens funcionando via Cloudinary
- Sem dependência prática de Netlify para operar o admin

## Observações finais

- O ajuste em `public/admin/index.html` e `public/admin/config.yml` resolve parcialmente o cenário atual, mas é transitório.
- O caminho definitivo é o novo painel com Firebase + Cloudinary.
- Recomendação: implementar por fases para não quebrar o site em produção.
