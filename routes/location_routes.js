const express = require('express');
const router = express.Router();


const {
  listarLocations,
  criarLocation,
  buscarLocationById,
  deleteLocation
} = require('../controller/location_controller');

// Rotas
router.get('/', listarLocations);
router.post('/', criarLocation);
router.get('/:id', buscarLocationById);   
router.delete('/:id', deleteLocation);

module.exports = router;
