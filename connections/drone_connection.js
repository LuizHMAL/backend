const db = require('./postgres'); 

async function buscarTodosDrones() {
  const result = await db.query('SELECT * FROM drones');
  return result.rows;
}

module.exports = { buscarTodosDrones };
