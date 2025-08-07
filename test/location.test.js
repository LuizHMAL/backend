jest.mock('../connections/location_connection', () => ({
  deletarLocation: jest.fn(),
  buscarLocationPorId: jest.fn(),
  buscarTodasLocations: jest.fn(),
  criarLocation: jest.fn()
}));

const locationConn = require('../connections/location_connection');
const {
  listarLocations,
  criarLocation,
  buscarLocationById,
  deleteLocation
} = require('../controller/location_controller');

describe('Location Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('listarLocations - sucesso', async () => {
    locationConn.buscarTodasLocations.mockResolvedValueOnce([
      { id: 1, name: 'Local 1', cartesian_x: 10, cartesian_y: 20 }
    ]);

    await listarLocations({}, res);

    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ id: 1 })]));
  });

  test('criarLocation - sucesso', async () => {
    req = { body: { name: 'Nova', cartesian_x: 5, cartesian_y: 5 } };
    locationConn.criarLocation.mockResolvedValueOnce({ id: 2, name: 'Nova' });

    await criarLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 2 }));
  });

  test('buscarLocationById - encontrado', async () => {
    req = { params: { id: '1' } };
    locationConn.buscarLocationPorId.mockResolvedValueOnce({ id: 1, name: 'Local 1' });

    await buscarLocationById(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  test('buscarLocationById - não encontrado', async () => {
    req = { params: { id: '999' } };
    locationConn.buscarLocationPorId.mockResolvedValueOnce(null);

    await buscarLocationById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('deleteLocation - sucesso', async () => {
    req = { params: { id: '1' } };

    await deleteLocation(req, res);

    expect(locationConn.deletarLocation).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Location deletada com sucesso!' });
  });
});
