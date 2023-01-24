//modules.
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { joiLogIn } = require('../models/login');
const logger = require('../startup/winston');

//loging in.
router.post('/api/login', async (req, res) => {
    const validate = joiLogIn.validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password.');

    const token = user.generateToken();
    res.send(token);
    logger.info('user login');
});

//globalisation
module.exports = router;
