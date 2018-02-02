const db = require('../database');
const Promise = require('promise');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config');

exports.checkUsername = function(username) {
    let sql = "SELECT * FROM user WHERE username = ?"; // + req.params.username;
    return new Promise(function(resolve, reject){

        db.query(sql, username, (err, result) => {
            if (err) {
                reject(err);
            }
            console.log('checkUsername result==',result);
            if (result.length > 0) {
                reject({success: false, message: 'Username is taken'});
            } else {
                resolve({success: true, message: 'Username is available'});
            }             
            //     console.log("Username already exists");
            //     return { success: true, message: 'Username already exists' };
            // } else {
            //     console.log("Username is not taken");
            //     return { success: false, message: 'Username is available' };
            // }
        });
    })
    
}


exports.getUser = function(username) {
    let sql = "SELECT * FROM user WHERE username = ?";
    return new Promise(function(resolve, reject){

        db.query(sql, username, (err, result) => {
            if (err) {
                reject(err);
            }
            console.log('checkUsername result==',result);
            if (result.length > 0) {
                resolve({success: true, data: result});
            } else {
                reject({success: false});
            }                        
        });
    })
    
}

exports.register = function(obj) {
    return new Promise(function(resolve, reject){
        bcrypt.hash(obj.password, null, null, function(error, hash) {
            if(error) {
                console.log("bcrypt err=", error);
                reject(error);
            }

            console.log("bcrypt hash=", hash);
            let user = { username: obj.username, password: hash, name: obj.name };
            let sql = "INSERT INTO user SET ?";
    
            db.query(sql, user, (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log("result=", result.insertId)
                if (result.insertId) {
                    resolve({ success: true, message: 'User added' });
                } else {
                    reject({ success: false, message: 'Failed to add User' });
                }
            });
        });

    });    

}

exports.login = function(obj) {
    let sql = "SELECT id, username, password FROM user WHERE username = ?"; // + req.params.username;
    return new Promise(function(resolve, reject){
        db.query(sql, obj.username, (err, result) => {
            if (err) {
                reject(err);
            }

            if(result.length) {
                console.log("login result=",result)
                bcrypt.compare(obj.password, result[0].password, function(error, res) {
                    if (error) {
                        reject(error);
                    }

                    if (res) {
                        console.log("Password match");
                        const token = jwt.sign({ userId: result.id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                        

                        resolve({ success: true, message: 'User logged in', token: token, user: {username : result[0].username} });
                    } else {
                        console.log("Password Mismatch");
                        reject({ success: false, message: 'Please enter correct username and password' });
                    }
                });
            } else {
                reject({ success: false, message: 'Please enter correct username and password' });
            }
        });
    });
    
}

// create table 
// app.get('/createtable', (req, res) => {
//     let sql = `CREATE TABLE user(
//         id int AUTO_INCREMENT NOT NULL,
//         username varchar(40),
//         password varchar(200),
//         name varchar(40),
//         PRIMARY KEY(id)
//     )`;

//     db.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//         res.send("Table created..");
//     });
// })
