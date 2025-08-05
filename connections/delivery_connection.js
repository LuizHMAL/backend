const db = require('./postgres');

// Busca todas as entregas
async function buscarTodasDeliveries() {
  const result = await db.query('SELECT * FROM deliveries');
  return result.rows;
}

// Insere uma nova entrega no banco
async function insertDelivery(delivery) {
  const result = await db.query(
    `INSERT INTO deliveries (
      drone_id, origin_id, destination_id,
      origin_location_x, origin_location_y,
      destination_cartesian_x, destination_cartesian_y,
      distance, price, priority
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    delivery.toDatabaseArray()
  );
  return result.rows[0];
}

// Busca dados de localização do drone e destino
async function buscarInfoDroneELocation(droneId, destinationId) {
  const query = `
    SELECT
      d.location_x AS drone_x,
      d.location_y AS drone_y,
      d.distance AS drone_distance,
      l.cartesian_x AS dest_x,
      l.cartesian_y AS dest_y
    FROM drones d, locations l
    WHERE d.id = $1 AND l.id = $2;
  `;
  const result = await db.query(query, [droneId, destinationId]);
  return result.rows[0];
}

// Gera coordenada aleatória entre dois valores
function gerarCoordenadaEntre(a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera obstáculo aleatório entre drone e destino (pode ou não existir)
function gerarObstaculo(drone_x, drone_y, dest_x, dest_y) {
  const existe = Math.random() < 0.5; // 50% de chance de existir

  if (!existe) return null;

  let obstacle_x, obstacle_y;

  do {
    obstacle_x = gerarCoordenadaEntre(drone_x, dest_x);
    obstacle_y = gerarCoordenadaEntre(drone_y, dest_y);
  } while (obstacle_x === dest_x && obstacle_y === dest_y); // evita colocar no destino

  return { obstacle_x, obstacle_y };
}

// Calcula a distância com possível obstáculo (+2km)
function calcularDistancia(drone_x, drone_y, dest_x, dest_y, obstaculo = null) {
  const deltaX = dest_x - drone_x;
  const deltaY = dest_y - drone_y;

  let distancia = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (obstaculo) {
    console.log('Obstáculo gerado! Adicionando +2km ao trajeto');
    distancia += 2;
  }

  return Math.round(distancia);
}

module.exports = {
  buscarTodasDeliveries,
  insertDelivery,
  buscarInfoDroneELocation,
  gerarObstaculo,
  calcularDistancia
};
