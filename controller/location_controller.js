const { buscarTodasLocations, criarLocation: criarLocationDB } = require('../connections/location_connection');
const Location = require('../model/location');

async function listarLocations(req, res) {
  try {
    const rows = await buscarTodasLocations();

    const locations = rows.map(row => new Location(
      row.name,
      row.cartesian_x,
      row.cartesian_y
    ));

    res.json(locations);
  } catch (err) {
    console.error('Erro ao listar locations:', err);
    res.status(500).json({ error: 'Erro ao buscar locations' });
  }
}

async function criarLocation(req, res) {
  console.log('Requisição recebida para criar location:', req.body);
  const { name, cartesian_x, cartesian_y } = req.body;

  if (!name || cartesian_x == null || cartesian_y == null) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const novaLocation = new Location(name, cartesian_x, cartesian_y);
    const resultado = await criarLocationDB(novaLocation);
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Erro ao criar location:', err);
    res.status(500).json({ error: 'Erro ao criar location' });
  }
}

module.exports = { listarLocations, criarLocation };
