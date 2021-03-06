const express = require('express');
let router = express.Router();
let DB = require('../models');
var path = require('path')

/* 주문 저장 */
router.post('/order/menu', function (req, res, next) {
    let body = req.body;
    let list = "";
    for (let i = 0; i < req.body.menus.length; i++) {
        if (body.menus[i].count !== 0) {
            list += body.menus[i].name + " " + body.menus[i].count + "/";
        }
    }

    let order = {};
    order.table_num = body.tableNum;
    order.menus = list;
    order.total_price = body.totalPrice;

    DB.addOrder((err, result) => {
        if (err) {
            res.json("fail");
        }
        console.log(result);
        res.json("success");
    }, order);
});

router.get('/order/:id', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))});

module.exports = router;