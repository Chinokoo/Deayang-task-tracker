const mongoose = require('mongoose');
const Joi = require('joi');

//const task schema..
const taskSchema = new mongoose.Schema({
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
    },
    dueDate: {
        type: Date,
        default: Date.UTC,
        required: true
    },
    assignedTo: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    },
    assignedBy: {
        type: String,
        required: false
    }
});

//mongoose schema.
const Assign = mongoose.model('Assign', taskSchema);

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
        .required(),
    dueDate: Joi.date()
        .required(),
    assignedTo: Joi.string()
        .min(3)
        .max(300)
        .required()
}).options({ abortEarly: false });

//globalisation......
module.exports.Assign = Assign;
module.exports.joiTask = joiTask;
