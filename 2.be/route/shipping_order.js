const express = require('express');
const router = express.Router();
// const sql = require("../mssql");
// console.log(sql);
const sql = require('mssql');

router.post('/getorder', (req, res) => {
  const { params } = req.body;
  console.log(params);
  const date = params.date1.replace(/-/g, '');
  const cust = params.customer;
  console.log('date', date);
  const request = new sql.Request();
  request.query(
    `select distinct SAL_YMD,CUST_CD,TRAILER_NO, len(TRAILER_NO), NOW_ST from SAL_ORDER where SAL_YMD=${date} and CUST_CD like '${cust}' order by len(TRAILER_NO), TRAILER_NO
      `,
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.send(result);
    }
  );
});

router.post('/getlist', (req, res) => {
  const { params } = req.body;
  console.log(params);
  const date = params.date;
  const trailer = params.trailer;
  const cust = params.customer;
  const request = new sql.Request();
  request.query(
    `select TOP 100 A.*,B.ITM_NM FROM sal_order A LEFT JOIN ITM_MST B ON A.itmno = B.itmno where A.SAL_YMD=${date} and A.TRAILER_NO='${trailer}' and A.CUST_CD='${cust}' order by ITMNO
        `,
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.send(result);
    }
  );
});

module.exports = router;
