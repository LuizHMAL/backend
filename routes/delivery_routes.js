const express = require('express');
const router = express.Router();
const {
  listarDeliveries,
  createDelivery
} = require('../controller/delivery_controller');

router.get('/', listarDeliveries);
router.post('/', createDelivery); // ✅ importante para Postman funcionar

module.exports = router;
