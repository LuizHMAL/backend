const db = require('./postgres');


async function buscarTodasDeliveries() {
  const result = await db.query('SELECT * FROM deliveries');
  return result.rows;
}


async function insertDelivery(delivery) {
  const values = delivery.toDatabaseArray();
  console.log("Valores enviados no INSERT:", values);  // <-- adicione essa linha
  const result = await db.query(
    `INSERT INTO deliveries (
      drone_id, destination_id,
      origin_location_x, origin_location_y,
      destination_cartesian_x, destination_cartesian_y,
      distance, price, priority, weight, drone_capacity
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`,
    values
  );
  return result.rows[0];
}




async function buscarInfoDroneELocation(droneId, destinationId) {
  const query = `
    SELECT 
      d.location_x AS drone_x,
      d.location_y AS drone_y,
      d.distance AS drone_distance,
      d.capacity AS drone_capacity,
      l.cartesian_x AS dest_x,
      l.cartesian_y AS dest_y
    FROM drones d
    JOIN locations l ON l.id = $2
    WHERE d.id = $1
  `;

  const result = await db.query(query, [droneId, destinationId]);
  const data = result.rows[0];
  console.log('Data do drone e destino:', data);
  return data;
}




module.exports = {
  buscarTodasDeliveries,
  insertDelivery,
  buscarInfoDroneELocation,

};
