const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection(config);

// Check connection
db.connect((err) => {
    if (err) {
        console.log('Failed to connect to database', err.stack);
    } else {
        console.log('Successfully connected to database', db.threadId);
    }
});

module.exports = db;