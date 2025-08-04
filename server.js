const express = require('express');
const cors = require('cors');

const app = express();       
app.use(cors());
app.use(express.json());

const deliveryRoutes = require('./routes/delivery_routes');
const droneRoutes = require('./routes/drone_routes');
const locationRoutes = require('./routes/location_routes');

app.use('/deliveries', deliveryRoutes);
app.use('/drones', droneRoutes);
app.use('/locations', locationRoutes);

app.get('/', (req, res) => {
  res.send('API do Delivery Drone funcionando!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
