const DB = require('./index');

// DB.addOrder(function (err, result) {
//     console.log(result);
// }, {"table_num": 3, "menus": "감자 : 12", "total_price": 100});


// DB.updateOrder(function (err, result) {
//     console.log(result);
// }, 14);


// DB.getOrdersList(function (err, result) {
//     console.log(result);
// });

DB.getLastOrders(function (err, result) {
    console.log(result);
});
