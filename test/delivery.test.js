jest.mock('../connections/delivery_connection', () => ({
  insertDelivery: jest.fn(),
  buscarInfoDroneELocation: jest.fn(),
  buscarTodasDeliveries: jest.fn(),
}));

jest.mock('../connections/drone_connection', () => ({
  atualizarDroneStatusEBateria: jest.fn(),
  finalizarEntrega: jest.fn(),
  buscarStatusDrone: jest.fn(),
}));

jest.mock('../utils/calculos_delivery', () => ({
  calcularDistancia: jest.fn(),
  gerarObstaculo: jest.fn(),
}));

const { createDelivery } = require('../controller/delivery_controller');
const deliveryConn = require('../connections/delivery_connection');
const droneConn = require('../connections/drone_connection');
const calculos = require('../utils/calculos_delivery');

describe('Delivery Controller - createDelivery', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();  

    req = {
      body: {
        droneId: 1,
        destinationId: 2,
        weight: 5,
        priority: 'urgente',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.useRealTimers(); 
  });

  it('deve criar a entrega com sucesso', async () => {
  
    droneConn.buscarStatusDrone.mockResolvedValueOnce('available');

  
    deliveryConn.buscarInfoDroneELocation.mockResolvedValueOnce({
      drone_x: 0,
      drone_y: 0,
      dest_x: 3,
      dest_y: 4,
      drone_distance: 20, 
      drone_capacity: 10, 
    });

   
    calculos.gerarObstaculo.mockReturnValueOnce([]);
    calculos.calcularDistancia.mockReturnValueOnce(5);

   
    deliveryConn.insertDelivery.mockResolvedValueOnce({
      id: 123,
      droneId: 1,
      destinationId: 2,
    });

 
    droneConn.atualizarDroneStatusEBateria.mockResolvedValue();
    droneConn.finalizarEntrega.mockResolvedValue();

    const promise = createDelivery(req, res);

   
    jest.advanceTimersByTime(30000);

    await promise; 

    expect(droneConn.buscarStatusDrone).toHaveBeenCalledWith(1);
    expect(deliveryConn.buscarInfoDroneELocation).toHaveBeenCalledWith(1, 2);
    expect(calculos.gerarObstaculo).toHaveBeenCalledWith(0, 0, 3, 4);
    expect(calculos.calcularDistancia).toHaveBeenCalledWith(0, 0, 3, 4, []);
    expect(deliveryConn.insertDelivery).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 123 }));
  });
});
