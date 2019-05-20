var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.json({});
});

router.post('/complete', function (req, res, next) {
    res.json({});
});

module.exports = router;
