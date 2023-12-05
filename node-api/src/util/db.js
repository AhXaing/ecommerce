const mysql = require("mysql");
const util = require("util");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 5306,
  password: "",
  database: "ecom_db",
});
// promis wrapper to enable async await with mysql
db.query = util.promisify(db.query).bind(db);

module.exports = db;
