const express = require('express');
const router = express.Router();
const user = require('../model/user');
const session = require('express-session');

router.get('/checkusername/:username', (req, res) => {
    user.checkUsername(req.params.username)
        .then(function (result) {
            console.log('then =', result);
            res.json(result);
         })
        .catch(function(err) {
            console.log('catch =', result);
            res.json(err);
        });
});

router.get('/getuser', (req, res) => {

    // if(!req.session.user) {
    //     res.json({ status: 200 });
    // }
    // console.log('req', req.session.user)
    // user.getUser(req.params.username)
    //     .then(function (result) {
    //         console.log('then =', result);
    //         res.json(result);
    //      })
    //     .catch(function(err) {
    //         console.log('catch =', result);
    //         res.json(err);
    //     });
});

router.post('/register', (req, res) => {
    user.register(req.body)
        .then(function (result) {
            console.log('register then=', result);
            res.json(result);
        })
        .catch(function(err){
            console.log("register catch=", err);
            res.json(err);
        });

});

router.post('/login', (req, res) => {
    user.login(req.body)
        .then(function(result) {
            console.log('asdasd', result);
            // req.session.user = result.user.username;
            res.json(result);
        })
        .catch(function(err){
            console.log("error", err)
            res.json(err);            
        });
});

module.exports = router;