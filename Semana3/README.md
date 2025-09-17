API em Node.js + PostgreSQL

Este projeto implementa uma API simples em Node.js utilizando Express e PostgreSQL, com funcionalidades de registro, login e listagem de usuários.

---

## Tecnologias
- Node.js
- Express
- PostgreSQL
- Bcrypt (hash de senhas)
- JSON Web Token (JWT)
- Dotenv (variáveis de ambiente)

---

## Estrutura de pastas
- server.js # Código principal da API
- db.js # Conexão com o banco
- .env # Variáveis de ambiente (não comitar no Git)
- package.json

---

## Configuração
git clone https://github.com/ferrenha/Oficina-Guardian.git
cd Oficina-Guardian/Semana2
npm init -y
npm install express pg bcrypt jsonwebtoken dotenv

---

## Banco de Dados 
CREATE DATABASE db;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

---

## Arquivo .env
DB_USER=seuusuario
DB_PASS=suasenha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db
PORT=3000
JWT_SECRET=segredo

---

## Executar API
npm start
