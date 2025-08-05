const express = require('express');
const router = express.Router();
const { listarDrones, criarNovoDrone } = require('../controller/drone_controller');

router.get('/', listarDrones);
router.post('/', criarNovoDrone);

module.exports = router;
