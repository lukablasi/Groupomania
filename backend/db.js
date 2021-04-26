const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'l79u456k13a',
    host: 'localhost',
    port: 5432,
    database: 'gifs'
});

module.exports = pool;