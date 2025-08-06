const express = require('express');
const router = express.Router();
const {marcarDroneComoDisponivel, listarDrones, criarNovoDrone, buscarDroneById, deletarDroneById, carregarDrone} = require('../controller/drone_controller');

router.get('/', listarDrones);
router.post('/', criarNovoDrone);
router.get('/:id', buscarDroneById);
router.delete('/:id', deletarDroneById);
router.post('/:droneId/carregar-bateria', carregarDrone);
router.post('/:droneId/disponivel', marcarDroneComoDisponivel);

module.exports = router;
