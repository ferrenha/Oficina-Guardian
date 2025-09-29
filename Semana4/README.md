API em Node.js + PostgreSQL + Página Web em HTML — Semana 3

Projeto de API simples em Node.js utilizando Express e PostgreSQL, com páginas estáticas para interação (login/registro).
 

## Tecnologias

- Node.js

- Express

- PostgreSQL

- Bcrypt (hash de senhas)

- JSON Web Token (JWT)

- Dotenv (variáveis de ambiente)

- CORS

## Estrutura de pastas

- server.js — servidor Express

- db.js — conexão com o banco

- .env — variáveis de ambiente 

- package.json

- controllers/

- middleware/

- routes/

- public/ 

## Configuração
- git clone https://github.com/ferrenha/Oficina-Guardian.git
- cd Oficina-Guardian/Semana3
- npm init -y
- npm install express pg bcrypt jsonwebtoken dotenv cors

## Banco de Dados
CREATE DATABASE db;

-- conectar no db

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
);

## Arquivo .env
DB_USER=seuusuario
DB_PASS=suasenha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db
PORT=3000
JWT_SECRET=segredo

## Executar API
- npm start
- Acessar: http://localhost:3000