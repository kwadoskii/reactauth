const router = require('express').Router();
const verify = require('./verify');
const User = require('../model/User');

router.get('/', verify, (req, res) => {
    User.findById(req.auth.id)
        .then(user => {
            res.json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        })

    
});

module.exports = router;