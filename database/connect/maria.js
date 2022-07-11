const maria = require("mysql");

const conn = maria.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "wkdduddls",
  database: "before_we_meet",
});

module.exports = conn;
