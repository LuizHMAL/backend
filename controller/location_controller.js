const { buscarTodasLocations } = require('../connections/location_connection');
const Location = require('../model/location');

async function listarLocations(req, res) {
  try {
    const rows = await buscarTodasLocations();

    const locations = rows.map(row => new Location(
      row.name,
      row.latitude,
      row.longitude,
      row.obstacle_x,
      row.obstacle_y
    ));

    res.json(locations);
  } catch (err) {
    console.error('Erro ao listar locations:', err);
    res.status(500).json({ error: 'Erro ao buscar locations' });
  }
}

module.exports = { listarLocations };
