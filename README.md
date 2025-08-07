# 📦 Desafio DTI - Backend com PostgreSQL & Redis

Este projeto utiliza **Docker Compose** para levantar o ambiente necessário para o backend, incluindo **PostgreSQL** (para persistência dos dados) e **Redis** (para cache ou filas).

---

# FrontEnd para essa aplicação localizado em: https://github.com/LuizHMAL/WindDeliveries

## 🐳 Serviços Docker

O arquivo `docker-compose.yml` define dois serviços principais:

- **PostgreSQL**
  - Porta local: `5432`
  - Usuário: `docker`
  - Senha: `docker`
  - Banco: `desafiodti`
  - Container: `postgres_container`
- **Redis**
  - Porta local: `6379`
  - Sem senha configurada
  - Container: `redis_container`

Para subir os serviços, execute:

```bash
docker-compose up -d



```
## Criação de tabelas

```
docker cp backend/db/schema.sql postgres_container:/schema.sql

```
ou execute manualmente na sua ferramenta de gerenciamento de banco de dados postgres:

-- Criação da tabela de drones
CREATE TABLE drones (
  id SERIAL PRIMARY KEY,
  model VARCHAR(100) NOT NULL,
  battery INTEGER,
  status VARCHAR(50) NOT NULL,
  capacity INTEGER NOT NULL,
  location_x INTEGER NOT NULL,
  location_y INTEGER NOT NULL,
  distance INTEGER NOT NULL,
  deleted_at TIMESTAMP
);

-- Criação da tabela de locais
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  cartesian_x INTEGER NOT NULL,
  cartesian_y INTEGER NOT NULL,
  deleted_at TIMESTAMP NULL
);

-- Criação da tabela de entregas
CREATE TABLE deliveries (
  id SERIAL PRIMARY KEY,
  drone_id INTEGER NOT NULL REFERENCES drones(id),
  destination_id INTEGER NOT NULL REFERENCES locations(id),
  origin_location_x INTEGER NOT NULL,
  origin_location_y INTEGER NOT NULL,
  destination_cartesian_x INTEGER NOT NULL,
  destination_cartesian_y INTEGER NOT NULL,
  distance INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  weight INTEGER NOT NULL DEFAULT 0,
  drone_capacity INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP DEFAULT NULL
);
# Para a execução do arquivo, é necessário utilizar o comando:
```
node server.js 
```
No terminal
