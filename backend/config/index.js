const path = require('path');
/**
 * .env 파일 생성할 것.
 */
require('dotenv').config({path: path.join(__dirname, '..', '\\', '.env')});

module.exports = {
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "user": process.env.DB_USER,
    "database": process.env.DB_DATABASE,
    "password": process.env.DB_PASSWORD
};