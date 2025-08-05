const express = require('express');
const router = express.Router();
const { listarLocations } = require('../controller/location_controller');

router.get('/', listarLocations);
router.post('/', criarLocation); // Endpoint para criar nova location

module.exports = router;
