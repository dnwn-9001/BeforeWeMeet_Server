const express = require("express");
const router = express.Router();

const maria = require("../database/connect/maria");

router.use(function (req, res, next) {
  next();
});

router.get("/", function (req, res) {
  maria.query(
    "INSERT INTO MEMBERS (SORT, MEMBER_ID, MEMBER_PW, NICKNAME) VALUES (2, 'user3', '1234', '홍길동');",
    function (err, rows, fields) {
      if (!err) {
        const result = JSON.stringify(rows);
        console.log("result:" + result);
        res.send(result);
      } else {
        console.log("query error : " + err);
        res.send(err);
      }
    }
  );
});

module.exports = router;
