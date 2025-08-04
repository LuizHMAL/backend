

const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

const { listarDrones } = require('./controller/drone_controller');
const { listarLocations } = require('./controller/location_controller');
const { listarDeliveries } = require('./controller/delivery_controller');

app.get('/drones', listarDrones);
app.get('/locations', listarLocations);
app.get('/deliveries', listarDeliveries);



app.get('/', (req, res) => {
  res.send('API do Delivery Drone funcionando!');
});



app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
