const db = require('./postgres');

async function buscarTodasDeliveries() {
  const result = await db.query('SELECT * FROM deliveries');
  return result.rows;
}

module.exports = { buscarTodasDeliveries };
