

const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

const { listarDrones } = require('./controller/drone_controller');

// Rotas
app.get('/', (req, res) => {
  res.send('API do Delivery Drone funcionando!');
});

app.get('/drones', listarDrones);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
