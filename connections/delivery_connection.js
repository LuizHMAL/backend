const db = require('./postgres');


async function buscarTodasDeliveries() {
  const result = await db.query('SELECT * FROM deliveries');
  return result.rows;
}


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



module.exports = {
  buscarTodasDeliveries,
  insertDelivery,
  buscarInfoDroneELocation,

};
