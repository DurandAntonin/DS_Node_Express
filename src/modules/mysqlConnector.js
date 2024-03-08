const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'dbMensulCalc_user',
    database: 'dbMensulCalc',
    password: 'azerty'
});
module.exports = pool.promise()