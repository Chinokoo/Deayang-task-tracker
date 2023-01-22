//modules.
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//mongoose schema
const Comment = mongoose.model('Comment', new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    comment: {
        type: String,
        required: true,
        minlength: 3,
        maxlenth: 3024
    }
}));

//joi schema.
const joiComment = Joi.object({
    task: Joi.objectId().required(),
    comment: Joi.string()
        .required()
        .min(3)
        .max(3024)
}).options({ abortEarly: false });

commentId = Joi.objectId();

module.exports.Comment = Comment;
module.exports.joiComment = joiComment;
module.exports.commentId = commentId;