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


#TRANSPARÊNCIA SOBRE PROMPTS DE IA
Foi utilizado IA nesse projeto principalmente para aprendizado do Node, visto que nunca havia utilizado essa tecnologia anteriormente.
```
PS C:\Users\leite\WWW\desafio_dti\backend> npx jest test/delivery.test.js
  console.log
    Valores enviados no INSERT: [ 1, 2, 0, 0, 3, 4, 10, 85, 'urgente', 5, 10 ]

      at log (controller/delivery_controller.js:134:13)

 PASS  test/delivery.test.js
  Delivery Controller - createDelivery
    √ deve criar a entrega com sucesso (26 ms)                                                                                                                                               
                                                                                                                                                                                             
Test Suites: 1 passed, 1 total                                                                                                                                                               
Tests:       1 passed, 1 total                                                                                                                                                               
Snapshots:   0 total
Time:        0.298 s, estimated 1 s
Ran all test suites matching test/delivery.test.js.
Jest did not exit one second after the test run has completed.

'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with --detectOpenHandles to troubleshoot this issue.

  ●  Cannot log after tests are done. Did you forget to wait for something async in your test?
    Attempted to log "Entrega 123 finalizada após 30000ms".

      39 |           await atualizarDroneStatusEBateria(droneId, 'available', distancia);
      40 |           await finalizarEntrega(deliveryId);
    > 41 |           console.log(Entrega ${deliveryId} finalizada após ${duracaoMs}ms);
         |                   ^
      42 |         } catch (err) {
      43 |           console.error("Erro durante finalização da entrega:", err);
      44 |         }

      at console.log (node_modules/@jest/console/build/index.js:311:10)
      at Timeout.log [as _onTimeout] (controller/delivery_controller.js:41:19)
```
Prompts como estes para debug e dúvidas sobre as ferramentas que utilizei, como o cors. Também utilizei prompts para entender erros que ocorriam nas minhas requisições.
