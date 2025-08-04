const express = require('express');
const router = express.Router();
const { listarLocations } = require('../controller/location_controller');

router.get('/', listarLocations);

module.exports = router;
