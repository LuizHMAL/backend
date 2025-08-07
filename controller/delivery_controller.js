const {
  insertDelivery,
  buscarInfoDroneELocation,
  buscarTodasDeliveries,
} = require('../connections/delivery_connection');

const { 
  calcularDistancia,
  gerarObstaculo
} = require('../utils/calculos_delivery');

const { 
  atualizarDroneStatusEBateria, 
  finalizarEntrega,
  buscarStatusDrone
} = require('../connections/drone_connection');

const Delivery = require('../model/delivery');

const VELOCIDADE_SIMULACAO = 3000; // 3 segundos por km

async function listarDeliveries(req, res) {
  try {
    const deliveries = await buscarTodasDeliveries();
    res.status(200).json(deliveries);
  } catch (error) {
    console.error("Erro ao listar deliveries:", error);
    res.status(500).json({ error: "Erro ao listar deliveries" });
  }
}

function simularEntrega(droneId, deliveryId, distancia) {
  const duracaoMs = distancia * VELOCIDADE_SIMULACAO;

  atualizarDroneStatusEBateria(droneId, 'onDelivery')
    .then(() => {
      setTimeout(async () => {
        try {
          await atualizarDroneStatusEBateria(droneId, 'available', distancia);
          await finalizarEntrega(deliveryId);
          console.log(`Entrega ${deliveryId} finalizada após ${duracaoMs}ms`);
        } catch (err) {
          console.error("Erro durante finalização da entrega:", err);
        }
      }, duracaoMs);
    })
    .catch((err) => {
      console.error("Erro ao atualizar status para onDelivery:", err);
    });
}

async function createDelivery(req, res) {
  const {
    droneId,
    destinationId,
    price,
    priority = 'normal',
    weight
  } = req.body;

  const pesoEntrega = (weight === undefined || weight === null) ? 0 : weight;

  try {
    const statusAtual = await buscarStatusDrone(droneId);
    if (statusAtual !== 'available') {
      return res.status(400).json({ error: 'Drone está ocupado com outra entrega' });
    }

    const data = await buscarInfoDroneELocation(droneId, destinationId);

    if (!data) {
      return res.status(404).json({ error: "Drone ou destino não encontrado" });
    }

    const {
      drone_x,
      drone_y,
      dest_x,
      dest_y,
      drone_distance: autonomiaDrone,
      drone_capacity: capacidadeDrone
    } = data;

    if (pesoEntrega > capacidadeDrone) {
      return res.status(400).json({
        error: `Peso da entrega (${pesoEntrega}) excede a capacidade do drone (${capacidadeDrone})`
      });
    }

    const obstaculo = gerarObstaculo(drone_x, drone_y, dest_x, dest_y);
    let distance = calcularDistancia(drone_x, drone_y, dest_x, dest_y, obstaculo);
    distance = distance * 2; // ida e volta

    if (distance > autonomiaDrone) {
      return res.status(400).json({
        error: `Distância total (${distance}) excede a autonomia do drone (${autonomiaDrone})`
      });
    }

    // Validação e ajuste da prioridade
    const prioridadesValidas = ['normal', 'urgente', 'critica'];
    const priorityValida = prioridadesValidas.includes(priority) ? priority : 'normal';

    // Cálculo automático do preço
    const PRECO_BASE_POR_KM = 5;
    const PRECO_POR_KG = 2;
    const MULTIPLICADOR_PRIORIDADE = {
      normal: 1,
      urgente: 1.5,
      critica: 2
    };

    const multiplicador = MULTIPLICADOR_PRIORIDADE[priorityValida];
    const precoBase = distance * PRECO_BASE_POR_KM * multiplicador;
    const precoPeso = pesoEntrega * PRECO_POR_KG;
    const precoFinal = precoBase + precoPeso;

    const entrega = new Delivery({
      droneId,
      destinationId,
      originLocationX: drone_x,
      originLocationY: drone_y,
      destinationCartesianX: dest_x,
      destinationCartesianY: dest_y,
      distance,
      price: precoFinal,
      priority: priorityValida,
      weight: pesoEntrega,
      drone_capacity: capacidadeDrone
    });

    // Log dos valores enviados para o DB
    const dbArray = entrega.toDatabaseArray();
    console.log("Valores enviados no INSERT:", dbArray);

    const novaEntrega = await insertDelivery(entrega);

    simularEntrega(droneId, novaEntrega.id, distance);

    return res.status(201).json(novaEntrega);
  } catch (error) {
    console.error("Erro ao criar entrega:", error);
    return res.status(500).json({ error: "Erro interno ao criar entrega" });
  }
}

module.exports = {
  createDelivery,
  listarDeliveries
};
