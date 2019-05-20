var express = require('express');
var router = express.Router();

/* 주문 사이트 */
router.post('/order/menu', function (req, res, next) {
    let body = req.body;
    res.json(body);
});

module.exports = router;