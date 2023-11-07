const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    // Your mySQL username
    user: '',
    password: '',
    database: ''
});
console.log('db connection successful!');

module.exports = db;