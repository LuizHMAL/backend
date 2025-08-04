const pool = require('./postgres');

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Horário do banco:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Erro ao conectar', err);
    process.exit(1);
  }
}

test();
