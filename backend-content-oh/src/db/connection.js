// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config(); 

const pool = new Pool({
  user: process.env.USER_PG,
  host: process.env.HOST_DB,
  database: process.env.DATABASE_PG,
  password: process.env.PASSWORD_PG,
  port: Number(process.env.PORT_DB),
});

module.exports = pool;