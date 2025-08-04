const express = require('express');
const router = express.Router();
const { listarDrones } = require('../controller/drone_controller');

router.get('/', listarDrones);

module.exports = router;
