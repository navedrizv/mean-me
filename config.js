const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

const config = {
    host : 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'mean',
    secret: crypto,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}

module.exports = config;