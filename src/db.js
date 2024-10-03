const mysql = require("mysql2/promise");

const connectionData = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_BASE,
};

const client = mysql.createPool(connectionData);
module.exports = client;
