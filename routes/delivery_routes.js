const express = require('express');
const router = express.Router();
const { listarDeliveries } = require('../controller/delivery_controller');

router.get('/', listarDeliveries);

module.exports = router;
