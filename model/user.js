const db = require('../database');
const Promise = require('promise');

exports.checkUsername = function(username) {
    let sql = "SELECT * FROM user WHERE username = ?"; // + req.params.username;
    return new Promise(function(resolve, reject){

        db.query(sql, username, (err, result) => {
            if (err) {
                reject(err);
            }

            console.log('checkUsername result==',result);
            resolve(result);
            // if (result.length > 0) {
            //     console.log("Username already exists");
            //     return { success: true, message: 'Username already exists' };
            // } else {
            //     console.log("Username is not taken");
            //     return { success: false, message: 'Username is available' };
            // }
        });
    })
    
}

exports.register = function(obj) {
    
    let user = { username: obj.username, password: obj.password, name: obj.name };
    let sql = "INSERT INTO user SET ?";
    
    return new Promise(function(resolve, reject){

        db.query(sql, user, (err, result) => {
            if (err) {
                reject(err);
            }

            console.log('db result', result)
            resolve(result);
        });

    }) 
    

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
