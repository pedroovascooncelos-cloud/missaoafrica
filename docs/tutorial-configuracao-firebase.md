# Tutorial de configuração das variáveis do Firebase

Este guia mostra como configurar o Firebase para o projeto `missao-africa`.

O projeto usa dois blocos de configuração:

- `NEXT_PUBLIC_FIREBASE_*`: usados no navegador para login no `/admin`
- `FIREBASE_*`: usados no servidor com `firebase-admin` para sessão, Firestore e escrita segura

## 1. Criar o projeto no Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Clique em `Criar projeto`.
3. Dê um nome para o projeto.
4. Pode avançar sem Google Analytics se quiser simplificar.
5. Aguarde a criação do projeto.

## 2. Ativar Authentication

1. No menu lateral, abra `Authentication`.
2. Clique em `Get started`.
3. Vá em `Sign-in method`.
4. Ative `Email/Password`.
5. Salve.

Depois disso, crie pelo menos um usuário admin:

1. Ainda em `Authentication`, vá em `Users`.
2. Clique em `Add user`.
3. Cadastre o e-mail e a senha do admin.

Esse e-mail também deve entrar na variável `ADMIN_ALLOWED_EMAILS`.

## 3. Ativar Firestore

1. No menu lateral, abra `Firestore Database`.
2. Clique em `Create database`.
3. Escolha o modo de produção.
4. Selecione a região desejada.
5. Finalize a criação.

Depois, publique as regras iniciais do arquivo `firestore.rules`.

## 4. Obter as variáveis públicas do app web

Essas variáveis são usadas no browser para o login Firebase no `/admin`.

1. No Firebase Console, abra `Project settings`.
2. Na seção `Your apps`, clique em `</>` para criar um app web.
3. Dê um nome ao app.
4. Pode seguir sem Firebase Hosting, se não for usar.
5. O Firebase vai mostrar um bloco parecido com este:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  appId: "..."
};
```

Preencha no `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
```

Observação:

- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` pode ficar vazio se você não for usar Firebase Storage
- neste projeto ele existe só para compatibilidade da config

## 5. Obter as credenciais do servidor (`firebase-admin`)

Essas variáveis são usadas pelo Next no servidor para:

- validar sessão do admin
- ler e gravar no Firestore
- executar seed

Passos:

1. No Firebase Console, abra `Project settings`.
2. Vá na aba `Service accounts`.
3. Clique em `Generate new private key`.
4. Baixe o arquivo JSON com cuidado.

No JSON baixado, você vai usar:

- `project_id`
- `client_email`
- `private_key`

Exemplo:

```json
{
  "type": "service_account",
  "project_id": "meu-projeto",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nABC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxx@meu-projeto.iam.gserviceaccount.com"
}
```

Preencha no `.env.local`:

```env
FIREBASE_PROJECT_ID=meu-projeto
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@meu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC...\n-----END PRIVATE KEY-----\n"
```

Importante:

- mantenha a chave entre aspas
- preserve os `\n`
- não cole a chave quebrando linha manualmente

## 6. Configurar a allowlist de admins

O projeto restringe o admin por e-mail via:

```env
ADMIN_ALLOWED_EMAILS=admin@exemplo.com,segundo-admin@exemplo.com
```

Regras:

- se quiser apenas um admin, informe só um e-mail
- use exatamente o mesmo e-mail criado em `Authentication > Users`
- pode separar vários e-mails por vírgula

## 7. Variáveis complementares do projeto

Além do Firebase, estas variáveis influenciam o comportamento da migração:

```env
FIREBASE_SESSION_COOKIE_NAME=missao_africa_admin_session
USE_FIRESTORE_CONTENT=false
FIRESTORE_CONTENT_REVALIDATE_SECONDS=300
```

O que cada uma faz:

- `FIREBASE_SESSION_COOKIE_NAME`: nome do cookie da sessão admin
- `USE_FIRESTORE_CONTENT=false`: mantém o site público lendo os JSONs locais
- `USE_FIRESTORE_CONTENT=true`: faz o site público tentar ler o Firestore primeiro
- `FIRESTORE_CONTENT_REVALIDATE_SECONDS=300`: tempo de revalidação do cache server-side

## 8. Exemplo completo de `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=meu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=meu-projeto
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=meu-projeto.firebasestorage.app

FIREBASE_PROJECT_ID=meu-projeto
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc@meu-projeto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABCDEF...\n-----END PRIVATE KEY-----\n"
FIREBASE_SESSION_COOKIE_NAME=missao_africa_admin_session
ADMIN_ALLOWED_EMAILS=admin@meusite.com

USE_FIRESTORE_CONTENT=false
FIRESTORE_CONTENT_REVALIDATE_SECONDS=300
```

## 9. Como validar se está funcionando

Depois de criar o `.env.local`:

1. Reinicie o servidor `npm run dev`.
2. Acesse `/admin`.
3. Tente fazer login com o usuário criado no Firebase Auth.
4. Se entrar, a parte de auth está correta.
5. Rode `npm run seed:firestore:dry` para validar a leitura local.
6. Rode `npm run seed:firestore` para enviar o conteúdo inicial ao Firestore.
7. Quando tudo estiver populado, troque:

```env
USE_FIRESTORE_CONTENT=true
```

8. Reinicie o servidor novamente.

## 10. Erros comuns

### `Firebase cliente não configurado`

Causa provável:

- faltou alguma variável `NEXT_PUBLIC_FIREBASE_*`

### `Firebase Admin não configurado`

Causa provável:

- faltou `FIREBASE_PROJECT_ID`
- faltou `FIREBASE_CLIENT_EMAIL`
- faltou `FIREBASE_PRIVATE_KEY`

### `Usuário não autorizado para acessar o admin`

Causa provável:

- o e-mail existe no Firebase Auth, mas não está em `ADMIN_ALLOWED_EMAILS`

### Falha ao rodar seed

Causa provável:

- credenciais do `firebase-admin` incorretas
- Firestore ainda não foi criado

## 11. Arquivos relacionados

- `.env.example`
- `src/lib/firebase/client.ts`
- `src/lib/firebase/admin.ts`
- `src/lib/auth/session.ts`
- `scripts/seed-firestore.ts`
- `firestore.rules`
