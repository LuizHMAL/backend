const express = require('express');
const router = express.Router();
const { listarLocations, criarLocation} = require('../controller/location_controller');

router.get('/', listarLocations);
router.post('/', criarLocation);

module.exports = router;
