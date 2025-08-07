jest.mock('../connections/drone_connection', () => ({
  droneDisponivel: jest.fn(),
  buscarTodosDrones: jest.fn(),
  criarDrone: jest.fn(),
  buscarDronePorId: jest.fn(),
  deletarDronePorId: jest.fn(),
  carregarDroneBattery: jest.fn(),
}));

const droneConn = require('../connections/drone_connection');
const {
  listarDrones,
  criarNovoDrone,
  buscarDroneById,
  deletarDroneById,
  carregarDrone,
  marcarDroneComoDisponivel
} = require('../controller/drone_controller');

describe('Drone Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('listarDrones - sucesso', async () => {
    droneConn.buscarTodosDrones.mockResolvedValueOnce([
      { id: 1, model: 'X1', battery: 100, status: 'available', capacity: 10, location_x: 0, location_y: 0, distance: 30 }
    ]);

    await listarDrones({}, res);

    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ id: 1 })]));
  });

  test('criarNovoDrone - sucesso', async () => {
    req = { body: { model: 'Y2', capacity: 10, distance: 50 } };
    droneConn.criarDrone.mockResolvedValueOnce({ id: 2, model: 'Y2' });

    await criarNovoDrone(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 2 }));
  });

  test('buscarDroneById - encontrado', async () => {
    req = { params: { id: '1' } };
    droneConn.buscarDronePorId.mockResolvedValueOnce({ id: 1, model: 'X1' });

    await buscarDroneById(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  test('buscarDroneById - não encontrado', async () => {
    req = { params: { id: '999' } };
    droneConn.buscarDronePorId.mockResolvedValueOnce(null);

    await buscarDroneById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('deletarDroneById - sucesso', async () => {
    req = { params: { id: '1' } };
    droneConn.deletarDronePorId.mockResolvedValueOnce({ success: true });

    await deletarDroneById(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  test('carregarDrone - sucesso', async () => {
    req = { params: { droneId: '1' } };
    droneConn.carregarDroneBattery.mockResolvedValueOnce({ id: 1, battery: 100 });

    await carregarDrone(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1, battery: 100 });
  });

  test('marcarDroneComoDisponivel - sucesso', async () => {
    req = { params: { droneId: '1' } };

    await marcarDroneComoDisponivel(req, res);

    expect(droneConn.droneDisponivel).toHaveBeenCalledWith('1', 'available');
    expect(res.json).toHaveBeenCalledWith({ message: 'Drone marcado como disponível' });
  });
});