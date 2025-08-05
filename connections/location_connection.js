const db = require('./postgres');

async function buscarTodasLocations() {
  const result = await db.query('SELECT * FROM locations');
  return result.rows;
}

async function criarLocation(location) {
  const result = await db.query(
    `INSERT INTO locations (name, cartesian_x, cartesian_y)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [location.name, location.cartesian_x, location.cartesian_y]
  );
  return result.rows[0];
}

async function buscarLocationPorId(id) {
  const result = await db.query('SELECT * FROM locations WHERE id = $1', [id]);
  return result.rows[0];
}

async function atualizarLocation(id, location) {
  const result = await db.query(
    `UPDATE locations
     SET name = $1, cartesian_x = $2, cartesian_y = $3
     WHERE id = $4
     RETURNING *`,
    [location.name, location.cartesian_x, location.cartesian_y, id]
  );
  return result.rows[0];
}

async function deletarLocation(id) {
  await db.query('DELETE FROM locations WHERE id = $1', [id]);
}


module.exports = { buscarTodasLocations, criarLocation, buscarLocationPorId, atualizarLocation };
