const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {

    //lets validate
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    //check if user exist
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).send('Email already exists');
            }
            else {
                //save new user
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(req.body.password, salt);
                // res.send(hashPassword);

                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword,
                });

                user.save()
                    .then(user => { res.send({ user: { id: user._id } }) })
                    .catch(err => res.status(400).send(err));
            }
        })
        .catch(err => res.status(400).send(err));
});

router.post('/login', (req, res) => {
    // validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if email exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) { res.status(400).send('Email is wrong!'); } //wrong email

            //check for password
            const validPass = bcrypt.compareSync(req.body.password, user.password);
            if (!validPass) { res.status(400).send('Invalid password!'); } //invalid password
            
            //create a token
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60), //expires in 1h
                id: user._id
            }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);
        })
    .catch(err => res.status(400).send(err));
})


module.exports = router;