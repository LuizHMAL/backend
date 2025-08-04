 const { buscarTodosDrones } = require('../connections/drone_connection');
const Drone = require('../model/drone');

async function listarDrones(req, res) {
  try {
    const rows = await buscarTodosDrones();

    const drones = rows.map(row => new Drone(
      row.model,
      row.battery,
      row.location,
      row.status,
      row.capacity,
      row.distance
    ));

    res.json(drones);
  } catch (err) {
    console.error('Erro ao listar drones:', err);
    res.status(500).json({ error: 'Erro ao buscar drones' });
  }
}

module.exports = { listarDrones };
