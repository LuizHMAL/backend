const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// Rotas
const droneRoutes = require('./routes/drone_routes');
app.use(droneRoutes);

app.get('/', (req, res) => {
  res.send('API do Delivery Drone funcionando!');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
