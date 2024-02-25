require("dotenv").config();
const { Pool } = require("pg");

const uri = String(process.env.OPENMART_POSTGRESQL_URL);
const pool = new Pool({ connectionString: uri });

module.exports = pool;
