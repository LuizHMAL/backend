

const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

const Drone = require('./models/drone_model.js');

const meuDrone = new Drone('Ali express', 100, 'São Paulo', "available", 10)

meuDrone.toFly(5);

meuDrone.toFly(15);

console.log(meuDrone);

app.get('/', (req, res) => {
  res.send('API do Delivery Drone funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
