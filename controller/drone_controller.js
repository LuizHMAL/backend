const {
  droneDisponivel,
  buscarTodosDrones,
  criarDrone,
  buscarDronePorId,
  deletarDronePorId,
  carregarDroneBattery
} = require('../connections/drone_connection');
const Drone = require('../model/drone');

async function listarDrones(req, res) {
  try {
    const rows = await buscarTodosDrones();
    const drones = rows.map(row => new Drone({
      id: row.id,
      model: row.model,
      battery: row.battery,
      status: row.status,
      capacity: row.capacity,
      location_x: row.location_x,
      location_y: row.location_y,
      distance: row.distance
    }));
    res.json(drones);
  } catch (err) {
    console.error('Erro ao listar drones:', err);
    res.status(500).json({ error: 'Erro ao buscar drones' });
  }
}

async function criarNovoDrone(req, res) {
  const { model, capacity, distance } = req.body;

  if (!model || capacity == null || distance == null) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const novoDrone = new Drone({
      model,
      battery: 100,
      status: 'available',
      capacity,
      location_x: 0,
      location_y: 0,
      distance
    });

    const resultado = await criarDrone(novoDrone);
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Erro ao criar drone:', err);
    res.status(500).json({ error: 'Erro ao criar drone' });
  }
}

async function buscarDroneById(req, res) {
  const { id } = req.params;
  try {
    const drone = await buscarDronePorId(id);
    if (!drone) {
      return res.status(404).json({ error: 'Drone não encontrado' });
    }
    res.json(drone);
  } catch (err) {
    console.error('Erro ao buscar drone por ID:', err);
    res.status(500).json({ error: 'Erro ao buscar drone' });
  }
}

async function deletarDroneById(req, res) {
  const { id } = req.params;
  try {
    const resultado = await deletarDronePorId(id);
    res.json(resultado);
  } catch (err) {
    console.error('Erro ao deletar drone:', err);
    res.status(500).json({ error: 'Erro ao deletar drone' });
  }
}

async function carregarDrone(req, res) {
  const { droneId } = req.params;
  try {
    const resultado = await carregarDroneBattery(droneId);
    res.json(resultado);
  } catch (err) {
    console.error('Erro ao carregar bateria do drone:', err);
    res.status(500).json({ error: 'Erro ao carregar bateria do drone' });
  }
}

async function marcarDroneComoDisponivel(req, res) {
  const { droneId } = req.params;
  try {
    await droneDisponivel(droneId, 'available');
    res.json({ message: 'Drone marcado como disponível' });
  } catch (err) {
    console.error('Erro ao marcar drone como disponível:', err);
    res.status(500).json({ error: 'Erro ao marcar drone como disponível' });
  }
}

module.exports = {
  listarDrones,
  criarNovoDrone,
  buscarDroneById,
  deletarDroneById,
  carregarDrone,
  marcarDroneComoDisponivel
};
