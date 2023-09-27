const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    // Your mySQL username
    user: 'root',
    password: 'N3p@lGHR',
    database: 'election'
});
console.log('db connection successful!');

module.exports = db;