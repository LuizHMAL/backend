const { buscarTodasDeliveries } = require('../connections/delivery_connection');
const Delivery = require('../model/delivery');

async function listarDeliveries(req, res) {
  try {
    const rows = await buscarTodasDeliveries();

    const deliveries = rows.map(row => new Delivery({
      id: row.id,
      droneId: row.drone_id,
      originId: row.origin_id,
      destinationId: row.destination_id,
      distance: row.distance,
      price: row.price,
      createdAt: row.created_at,
      finishedAt: row.finished_at
    }));

    res.json(deliveries);
  } catch (err) {
    console.error('Erro ao listar deliveries:', err);
    res.status(500).json({ error: 'Erro ao buscar deliveries' });
  }
}

module.exports = { listarDeliveries };
