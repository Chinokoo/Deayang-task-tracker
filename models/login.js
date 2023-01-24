//modules.
const Joi = require('joi');

//joi schema.
const joiLogIn = Joi.object({
    username: Joi.string()
        .required()
        .min(3)
        .max(300),
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .required()
        .min(7)
        .max(1024),
    password: Joi.string()
        .required()
        .min(6)
        .max(15)
}).options({ abortEarly: false });

//globalisation.
module.exports.joiLogIn = joiLogIn;