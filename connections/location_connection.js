const db = require('./postgres');

async function buscarTodasLocations() {
  const result = await db.query('SELECT * FROM locations');
  return result.rows;
}

module.exports = { buscarTodasLocations };
