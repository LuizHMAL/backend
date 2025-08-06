const { Pool } = require('pg');

const pool = new Pool({
  user: 'docker',           
  host: 'localhost',       
  database: 'desafiodti',
  password: 'docker',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Erro no cliente PostgreSQL', err);
});

module.exports = pool;
