//modules.
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

//mongoose schema.
const userSchema = new mongoose.Schema({
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
    },
});
userSchema.methods.generateToken = function () {
    if (this.admin) return token = jwt.sign({ id: this._id, username: this.username, admin: this.admin }, config.get('task-trackerPrivateKey'));
    return token = jwt.sign({ id: this._id, username: this.username }, config.get('task-trackerPrivateKey'));
}
//mongoose model.
const User = mongoose.model('User', userSchema);

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
        //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) will try this in the future.
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
        .max(300),
    admin: Joi.boolean()
        .optional()
}).options({ abortEarly: false });

//globalisation.
module.exports.User = User;
module.exports.joiUser = joiUser;