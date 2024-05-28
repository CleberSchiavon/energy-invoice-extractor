# Energy Invoice Extractor

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Iniciar o projeto

Iniciar o projeto e instalar suas dependencias é muito simples!

Clone o .env.example e adicione as suas variaveis

```sh
API_PORT=3001 # Qual porta você vai rodar a API
NEXT_PUBLIC_API_URL=http://localhost:3001 # URL da sua API (Essa variavel será utilizada pelo Front-End)
API_DB_POSTGRE_URL=postgres://YourUserName:YourPassword@localhost:5432/NOME_DA_TABELA # Aqui é o Database URL, substitua os parametros para configurar o banco de dados
```

```sh
pnpm run prepare-repo
```

Pronto! Todo o enviroment está pronto e configurado

## Apps e Pacotes

- `apps/api`: O backend da aplicação! Utiliza Express e Prisma/PostgreSQL
- `apps/web`: O frontend da aplicação! Utilizamos NextJS, TailwindCSS, Zustand e DaisyUI
- `@repo/ui - packages/ui`: Aqui fica todos os componentes que são utilizados na aplicação
- `@repo/database-tools - packages/database-tools`: Nesse pacote é onde a API utiliza do Prisma pra fazer as suas requests e reconhecer seus schemas
- `@repo/types - packages/types`: Todas as Tipagens da aplicação ficam aqui, elas são compartilhadas com todo o Monorepo
- `@repo/eslint-config - packages/eslint-config`: Configurações do ESLINT (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config - packages/typescript-config`: Todos os TSConfigs utilizados na aplicação ficam aqui
- `@repo/tailwind-config - packages/tailwind-config`: Todas as configurações do Tailwind que o Frontend usa fica aqui! Assim como o globals.css

## Features

Esse repositório contém

- TurboRepo
- Node.JS
- Express
- Next.JS
- TailwindCSS
- TypeScript
- PNPM
- DotEnv
- Jest and Supertest
- Prettier and Eslint
- Husky with Conventional Commits
- Standard Version
- Editor Config

## Dev Features

- 📈 Absolute Import and Path Alias — Uma alternativa do typescript pra importar arquivos sem precisar de "../../", ao invés disso usamos "@/(pasta)"
- 📏 ESLint — O ESLint serve pra procurar problemas de escrita dentro do código (pode ser personalizado conforme as vontades do usuário)
- 💖 Prettier and Eslint — Formata o código automaticamente com os padrões definidos do usuário
- 🐶 Husky, Lint Staged — Serve pra rodar uma série de scripts nos arquivos prestes a commitar ou a subir
- 🤖 Conventional Commit Lint — Serve pra conferir se os commits estão sendo feitos usando Conventional Commit (https://www.conventionalcommits.org/en/v1.0.0/)
- ⏰ Standard Version — Gera um changelog automatico a cada build, mostrando todas as mudanças que foram feitas
- TurboRepo - Gestão inteligente de todo o repositório

## Rotas da API

Um arquivo Postman Collection também foi compartilhado na raiz do projeto!

### Faturas

#### GET /invoices

- Recupera todas as faturas
- Resposta: 200 OK com todas as faturas

#### GET /invoices/:clientNumber

- Recupera as faturas por número do cliente
- Resposta: 200 OK com as faturas do cliente especificado

#### POST /invoices/new-invoice

- Cria uma nova fatura
- Requer o envio de um arquivo
- Resposta: 200 OK com mensagem de sucesso ou mensagem de erro

### Clientes

#### GET /clients

- Recupera todos os clientes
- Resposta: 200 OK com todos os clientes

#### GET /clients/:clientNumber

- Recupera um cliente específico pelo número do cliente
- Resposta: 200 OK com o cliente especificado

## Comandos Uteis

Esse repositório contém vários comandos uteis na Raiz do projeto, para acelerar todo o processo de desenvolvimento

### Comandos do Frontend

```sh
pnpm run frontend:dev # Rodar APENAS o front em modo de desenvolvimento
```

### Comandos da API

```sh
pnpm run api:dev # Rodar APENAS a API em modo de desenvolvimento
```

```sh
pnpm run api:test # Rodar todos os testes da API
```

```sh
pnpm run api:database-generate # Rodar todos os schemas do prisma e gerar um Banco de Dados novo
```

### Comandos do Repositório

```sh
pnpm run dev # Rodar o Front-End o backend de forma simultânea, cada um em uma porta
```

```sh
pnpm run clean-repo # Apaga todos os Caches e Dependências do projeto
```

```sh
pnpm run husky:install # Instala o husky e cria os arquivos na raiz do projeto
```

```sh
pnpm run format # Roda o prettier em todo o projeto
```

```sh
pnpm run lint # Roda o ESLint e o prettier em todo o projeto
```

```sh
pnpm run changelog # Gera um arquivo de CHANGELOG baseado na arvore de commits
```

## Autor

 <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 15px">
 <a href="https://www.linkedin.com/in/cleberschiavon">
 <b>Cleber Henrique</b>
</a>
 <a href="mailto:cleberschiavon@outlook.com">
cleberschiavon@outlook.com
</a>
 </div>

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cleberschiavon)
