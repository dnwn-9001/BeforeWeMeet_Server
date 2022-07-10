const maria = require("mysql");

const conn = maria.createConnection({
  host: "localhost",
  post: 3306,
  user: "root",
  password: "wkdduddls",
  database: "before_we_meet",
});

module.exports = conn;
