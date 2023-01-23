//modules.
const express = require('express');
const router = express.Router();
const { User, joiUser } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const logger = require('../startup/winston');

//signing up the user.
router.post('/api/signin', async (req, res) => {
    const validate = joiUser.validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) return res.status(400).send('User with the given email already exists.');

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const lou = _.pick(user, ['username', 'email', 'phoneNumber', 'country']);
    res.send(lou);
    logger.info('sign in user.');
});
//getting the users.
router.get('/api/users', async (req, res) => {
    const users = await User.find()
        .sort('username')
        .select('username email phoneNumber country');
    res.send(users);
    logger.info('get all users.');
});

//globalisation.
module.exports = router;