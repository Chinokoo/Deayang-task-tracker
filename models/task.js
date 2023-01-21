//modules.
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//mongoose schema.
const Task = mongoose.model('Task', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3030
    },
    completed: {
        type: Boolean,
        required: true
    }
}));

//joi schema.
const joiTask = Joi.object({
    title: Joi.string()
        .min(3)
        .max(300)
        .required(),
    description: Joi.string()
        .min(3)
        .max(303)
        .required(),
    completed: Joi.boolean()
        .required()
});

joiID = Joi.objectId()

//globalization.
module.exports.Task = Task;
module.exports.joiTask = joiTask;
module.exports.joiID = joiID;