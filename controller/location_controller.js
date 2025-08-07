const { deletarLocation, buscarLocationPorId, buscarTodasLocations, criarLocation: criarLocationDB } = require('../connections/location_connection');
const Location = require('../model/location');

async function listarLocations(req, res) {
  try {
    const rows = await buscarTodasLocations();

    const locations = rows.map(row => new Location(
      row.id,
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
    const novaLocation = {
      name,
      cartesian_x,
      cartesian_y
    };

    const resultado = await criarLocationDB(novaLocation);
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Erro ao criar location:', err);
    res.status(500).json({ error: 'Erro ao criar location' });
  }
}

async function buscarLocationById(req, res) {
  const { id } = req.params;

  try {
    const location = await buscarLocationPorId(id);
    if (!location) {
      return res.status(404).json({ error: 'Location não encontrada' });
    }
    res.json(location);
  } catch (err) {
    console.error('Erro ao buscar location por ID:', err);
    res.status(500).json({ error: 'Erro ao buscar location' });
  }
}

async function deleteLocation(req, res) {
  const { id } = req.params;
  try {
    await deletarLocation(id);
    res.status(200).json({ message: 'Location deletada com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar location:', err);
    res.status(500).json({ error: 'Erro ao deletar location' });
  }
}

module.exports = {
  listarLocations,
  criarLocation,
  buscarLocationById,
  deleteLocation
};
