const { buscarTodosDrones, criarDrone } = require('../connections/drone_connection');
const Drone = require('../model/drone');

async function listarDrones(req, res) {
  try {
    const rows = await buscarTodosDrones();
    const drones = rows.map(row => new Drone({
      model: row.model,
      battery: row.battery,
      status: row.status,
      capacity: row.capacity,
      location_x: row.location_x,
      location_y: row.location_y,
      distance: row.distance,
      priority: row.priority
    }));
    res.json(drones);
  } catch (err) {
    console.error('Erro ao listar drones:', err);
    res.status(500).json({ error: 'Erro ao buscar drones' });
  }
}

async function criarNovoDrone(req, res) {
  const { model, battery, status, capacity, distance, priority = 'normal' } = req.body;

  if (!model || battery == null || !status || capacity == null || distance == null) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const novoDrone = new Drone({
      model,
      battery,
      status,
      capacity,
      location_x: 0, // posição inicial
      location_y: 0,
      distance,
      priority
    });

    const resultado = await criarDrone(novoDrone);
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Erro ao criar drone:', err);
    res.status(500).json({ error: 'Erro ao criar drone' });
  }
}

module.exports = {
  listarDrones,
  criarNovoDrone
};
