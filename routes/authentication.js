const express = require('express');
const router = express.Router();
const user = require('../model/user');

// Read
router.get('/checkusername/:username', (req, res) => {

    user.checkUsername(req.params.username).then(function (result) {
        console.log('checkUsername=', result);
        if (result.length > 0) {
            res.json({ success: true, message: 'Username exists' });
        } else {
            res.json({ success: false, message: 'Username available' });
        }
    });
});

// write
router.post('/register', (req, res) => {

    user.register(req.body).then(function (result) {
        console.log('register=', result);
        if (result.insertId) {
            res.json({ success: true, message: 'User added' });
        } else {
            res.json({ success: false, message: 'Failed to add User' });
        }

    });

});

module.exports = router;