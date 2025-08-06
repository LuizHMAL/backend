const db = require('./postgres'); 

async function buscarTodosDrones() {
  const result = await db.query('SELECT * FROM drones');
  return result.rows;
}

async function criarDrone(drone) {
  const result = await db.query(
    `INSERT INTO drones (
      model, battery, status, capacity, location_x, location_y, distance
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      drone.model,
      drone.battery,
      drone.status,
      drone.capacity,
      drone.location_x,
      drone.location_y,
      drone.distance
    ]
  );
  return result.rows[0];
}

async function atualizarDroneStatusEBateria(droneId, novoStatus, distancia = 0) {
  const consumo = Math.ceil(distancia / 1); // 1% por km

  await db.query(`
    UPDATE drones
    SET status = $1,
        battery = GREATEST(battery - $2, 0)
    WHERE id = $3
  `, [novoStatus, consumo, droneId]);
}

async function finalizarEntrega(deliveryId) {
  await db.query(`
    UPDATE deliveries
    SET finished_at = NOW()
    WHERE id = $1
  `, [deliveryId]);
}


async function buscarStatusDrone(droneId) {
  const result = await db.query(
    `SELECT status FROM drones WHERE id = $1`,
    [droneId]
  );
  if (result.rows.length === 0) {
    return null; 
  }
  return result.rows[0].status;
}

module.exports = {
  criarDrone,
  buscarTodosDrones,
  atualizarDroneStatusEBateria,
  finalizarEntrega,
  buscarStatusDrone, 
};
