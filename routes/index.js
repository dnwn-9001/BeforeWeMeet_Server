const express = require("express");
const router = express.Router();

const maria = require("../database/connect/maria");

router.use(function (req, res, next) {
  next();
});

// 마이페이지 내 정보
router.get("/", function (req, res) {
  maria.query(
    "SELECT * FROM MEMBERS WHERE SORT='1' AND MEMBER_ID='user1'",
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
