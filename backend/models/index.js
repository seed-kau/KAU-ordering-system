const mysql = require('mysql2');
const path = require('path');
const config = require('../config');
/**
 * +-------------+---------------+------+-----+-------------------+-------------------+
 *  | Field       | Type          | Null | Key | Default           | Extra             |
 *  +-------------+---------------+------+-----+-------------------+-------------------+
 *  | id          | int(11)       | NO   | PRI | NULL              | auto_increment    |
 *  | table_num   | int(11)       | NO   |     | NULL              |                   |
 *  | order_list  | varchar(1000) | NO   |     | NULL              |                   |
 *  | order_time  | timestamp     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
 *  | status      | varchar(20)   | NO   |     | ready             |                   |
 *  | total_price | int(11)       | NO   |     | NULL              |                   |
 *  +-------------+---------------+------+-----+-------------------+-------------------+
 */

let pool = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    database: config.database,
    password: config.password,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
    addOrder: (callback, order) => {
        pool.getConnection((err, con) => {
            if (err) {
                console.log(err);
            }
            const sql = `INSERT INTO logs (table_num, order_list, total_price) VALUES (?, ?, ?)`;
            con.query(sql, [order.table_num, order.menus, order.total_price], (err, result, fields) => {
                con.release();
                if (err) {
                    return callback(`추가 실패`);
                }
                return callback(null, (result.length !== 0));
            });
        });
    },

    updateOrder: (callback, order_num) => {
        pool.getConnection((err, con) => {
            if (err) {
                console.log(err);
            }
            const sql = `UPDATE logs SET status="finish" WHERE id = ?`;
            con.query(sql, order_num, (err, result, fields) => {
                con.release();
                if (err) {
                    return callback(`업데이트 실패`);
                }
                return callback(null, (result.length !== 0));
            });
        });
    },

    getOrdersList: (callback) => {
        pool.getConnection((err, con) => {
            if (err) {
                console.log(err);
            }
            const sql = `SELECT * FROM logs WHERE status = ?`;
            con.query(sql, "ready", (err, result, fields) => {
                con.release();

                if (err) {
                    return callback(`조회 실패`);
                }
                // 고민
                const order_list = {};
                for (let i = 0; i < result.length; i++) {
                    let order = {};
                    order.id = result[i].id;
                    order.table_num = result[i].table_num;
                    order.list = result[i].order_list;
                    order.status = result[i].status;
                    order.total_price = result[i].total_price;

                    order_list[i] = order;
                }
                return callback(null, order_list);
            });
        });
    },

    getLastOrders: (callback) => {
        pool.getConnection((err, con) => {
            if (err) {
                console.log(err);
            }
            const sql = `SELECT * FROM logs WHERE status = ? ORDER BY order_time DESC LIMIT 10`;
            con.query(sql, "finish", (err, result, fields) => {
                con.release();
                if (err) {
                    return callback(`마지막 10개 조회 실패`);
                }
                // 고민
                const order_list = {};
                for (let i = 0; i < result.length; i++) {
                    let order = {};
                    order.id = result[i].id;
                    order.table_num = result[i].table_num;
                    order.order_list = result[i].order_list;
                    order.order_status = result[i].status;
                    order.total_price = result[i].total_price;

                    order_list[i] = order;
                }
                return callback(null, order_list);
            });
        });
    }
};
