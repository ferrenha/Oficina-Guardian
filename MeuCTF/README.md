# Oficina Guardian — Aplicação Web (Docker + Postgres + Front)

Aplicação web simples em Node.js + Express + PostgreSQL com páginas estáticas (HTML) para login, registro, dashboard e uma área administrativa (acesso com JWT).

Este README foca em como configurar, subir e usar a aplicação.

## Tecnologias
- Node.js + Express
- PostgreSQL
- Bcrypt (hash de senhas)
- JSON Web Token (JWT)
- Dotenv (variáveis de ambiente)
- CORS
- Multer (upload de arquivos)
- ImageMagick (processamento de imagem no container)
- Docker (sem Docker Compose)

## Requisitos
- Docker instalado

## Como rodar (apenas Dockerfile)
1) Clone o repositório e entre na pasta do projeto:
   - `git clone https://github.com/ferrenha/Oficina-Guardian.git`
   - `cd Oficina-Guardian/MeuCTF`

2) Construa a imagem do app:
   - `docker build -t justdecode .`

3) Rode o app:
   - `docker run -p 80:80 -p 22:22 -p 5432:5432 justdecode`

4) Acesse no navegador:
   - `http://localhost/`

## Usuários iniciais (seed)
Criados ao subir o Postgres (veja `init.sql`):
- `admin` (role: admin) — senha: `mauaguardian123#`
- `administrator` (role: user) — senha: `guardianmaua123#`

## Estrutura de pastas
- `controllers/` — controllers da API
- `middleware/` — middlewares (inclui autenticação por JWT)
- `routes/` — rotas da API
- `public/` — páginas estáticas (index, login, register, dashboard, admin)
- `db.js` — conexão Postgres
- `server.js` — servidor Express
- `init.sql` — criação/seed da tabela `users`
- `Dockerfile` — imagem do app

## Páginas
- `/` — home (links para login/registro)
- `/login.html`
- `/register.html`
- `/dashboard.html`
- `/admin.html` — área restrita a administradores

## API
- Prefixo: `/api/users`
  - `POST /register` — cria usuário comum
  - `POST /login` — autentica e retorna JWT
  - `GET /` — lista usuários (id, username, role)
  - `GET /me` — dados do usuário autenticado (requer Bearer token)
  - `GET /admin` — conteúdo restrito (requer Bearer token com role `admin`)

- Prefixo: `/api/media`
  - `POST /avatar` — upload de avatar (apenas admin). Envie arquivo no campo `file` (PNG/JPG até 200KB).

## Variáveis de ambiente
Para execução local sem Docker, crie um arquivo `.env` (modelo em `MeuCTF/.env`):
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `JWT_SECRET`
- `PORT` (padrão 80)

## Rodar localmente (sem Docker)
1) Instale dependências: `npm install`
2) Exporte as variáveis ou configure `.env`
3) Garanta um Postgres em execução com o schema de `init.sql`
4) Inicie: `node server.js`

## Portas
- App: `80` (acesso em `http://localhost/`)
- SSH interno do container: `22`
- Postgres no container: `5432`
