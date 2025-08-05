const express = require('express');
const cors = require('cors');

const app = express();

// CORS
app.use(cors());

// Middleware para tratar JSON com erro de sintaxe
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('❌ Erro de JSON inválido:', err.message);
    return res.status(400).json({ error: 'JSON inválido no corpo da requisição' });
  }
  next();
});

// Rotas
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
