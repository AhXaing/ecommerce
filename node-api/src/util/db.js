const mysql = require("mysql");
const util = require("util");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  // port: 5306, defualt post 3306
  database: "ecom_db",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
});

// promis wrapper to enable async await with mysql
db.query = util.promisify(db.query).bind(db);

module.exports = db;
