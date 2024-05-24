const express = require('express');
const router = express.Router();
// const sql = require("../mssql");
// console.log(sql);
const sql = require('mssql');

router.post('/add', (req, res) => {
  // const { partnumber, customercode } = req.body.param;
  const po = req.body.param;
  console.log(po);
  const request = new sql.Request();
  request.query(
    `insert into TB_PO_INFO (PART_NO,CUST_CODE,CUST_PART,PO_NO,LINE_NO,CUST_NAME,SHIP_TO_PLANT,UOM,SUPPLIER_NAME,SUPPLIER_CODE,DOCK_NO,PART_DESC) values('${po.PART_NO}','${po.CUST_CODE}','${po.CUST_PART}','${po.PO_NO}','${po.LINE_NO}','${po.CUST_NAME}','${po.SHIP_TO_PLANT}','${po.UOM}','${po.SUPPLIER_NAME}','${po.SUPPLIER_CODE}','${po.DOCK_NO}','${po.PART_DESC}')`,
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

router.post('/getpos', (req, res) => {
  const { param } = req.body;
  // const param = req.body; 에러코드
  const request = new sql.Request();
  request.query(
    `select * from TB_PO_INFO where cust_code='${param}' order by part_no`,
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
router.post('/getpo', (req, res) => {
  // const { partnumber, customercode } = req.body.param;
  const { partnumber, customercode } = req.body;
  const request = new sql.Request();
  request.query(
    `select * from TB_PO_INFO where part_no='${partnumber}' and cust_code='${customercode}' `,
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

router.post('/change', (req, res) => {
  // const { id } = req.params;
  const { partnumber, customercode } = req.body.id;
  const po = req.body.param;
  const request = new sql.Request();
  request.query(
    `UPDATE TB_PO_INFO SET PART_NO='${po.PART_NO}',CUST_CODE='${po.CUST_CODE}',CUST_PART='${po.CUST_PART}',PO_NO='${po.PO_NO}',LINE_NO='${po.LINE_NO}',CUST_NAME='${po.CUST_NAME}',SHIP_TO_PLANT='${po.SHIP_TO_PLANT}',UOM='${po.UOM}',SUPPLIER_NAME='${po.SUPPLIER_NAME}',SUPPLIER_CODE='${po.SUPPLIER_CODE}',DOCK_NO='${po.DOCK_NO}',PART_DESC='${po.PART_DESC}' where part_no='${partnumber}' and cust_code='${customercode}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    }
  );
});
router.post('/delete', (req, res) => {
  // const { id } = req.params;
  // console.log(req.params);
  // console.log(id);
  const { partnumber, customercode } = req.body;
  const request = new sql.Request();
  request.query(
    `DELETE FROM TB_PO_INFO where part_no='${partnumber}' and cust_code='${customercode}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    }
  );
});

module.exports = router;
