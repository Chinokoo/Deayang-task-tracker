//modules.
const mongoose = require('mongoose');
const Joi = require('joi');

//mongoose schema.
const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    },
    email: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    dateOfBirth: {
        type: Date,
        default: Date.UTC,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
    country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    },
    admin: {
        type: Boolean,
        required: false
    }
}));

//joi schema.
const joiUser = Joi.object({
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
        //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) try this in the future.
        .required()
        .min(6)
        .max(15),
    confirmPassword: Joi.ref('password'),
    dateOfBirth: Joi.required(),
    phoneNumber: Joi.string()
        .required()
        .min(8)
        .max(15),
    country: Joi.string()
        .required()
        .min(3)
        .max(300)
}).options({ abortEarly: false });

//globalisation.
module.exports.User = User;
module.exports.joiUser = joiUser;