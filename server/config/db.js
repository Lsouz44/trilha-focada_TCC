const { Pool } = require('pg');

const pool = new Pool({
  user: 'leandro',
  host: 'localhost',
  database: 'bd_trilhafocada',
  password: 'tcc',
  port: 5432,
});

module.exports = pool;