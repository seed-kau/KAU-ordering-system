const express = require('express');
let router = express.Router();
let DB = require('../models');

/* 전체 주문 리스트 */
router.get('/', function (req, res) {
    DB.getOrdersList((err, result) => {
        if (err) {
            res.json("fail");
        }
        res.json(result);
    });
});

/* 완료된 최근 10개 주문 리스트 */
router.get('/complete', function (req, res) {
    DB.getLastOrders((err, result) => {
        if (err) {
            res.json("fail");
        }
        res.json(result);
    });
});

/* 주문 상태 업데이트 */
router.put('/complete', function (req, res, next) {
    let num = req.body.id;
    DB.updateOrder((err, result) => {
        if (err) {
            res.json("fail");
        }
        console.log(result);
        res.json("success");
    }, num);
});

module.exports = router;
