//modules.
const express = require('express');
const router = express.Router();
const { Comment, commentId, joiComment } = require('../models/comment');
const { Task } = require('../models/task');
const users = require('../middleware/users');
const admin = require('../middleware/admin');
const logger = require('../startup/winston');

//creating a comment.
router.post('/api/comments', [users, admin], async (req, res) => {
    const validate = joiComment.validate(req.body);
    if (validate.error) res.status(400).send(validate.error.message);

    const task = await Task.findById(req.body.task);
    if (!task) res.status(400).send('Task not found.');

    const comment = new Comment({
        task,
        comment: req.body.comment
    });
    await comment.save();
    res.send(comment);
    logger.info('create a comment.');
});
//getting the comment.
router.get('/api/comments', [users, admin], async (req, res) => {
    const comments = await Comment.find().sort('comment');
    res.send(comments);
    logger.info('get all the comment.');
});
router.get('/api/comments/:id', [users, admin], async (req, res) => {
    const validateId = commentId.validate(req.params.id);
    if (validateId.error) res.status(400).send(validateId.error.message);

    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send('comment not found.');
    res.send(comment);
    logger.info('get a single comment.');
});
//updating a comment.
router.put('/api/comments/:id', [users, admin], async (req, res) => {
    const validateId = commentId.validate(req.params.id);
    if (validateId.error) res.status(400).send(validateId.error.message);

    const task = await Task.findById(req.body.task);
    if (!task) res.status(400).send('Task not found.');

    const comment = await Comment.findByIdAndUpdate(req.params.id, {
        task,
        comment: req.body.comment
    }, { new: true });
    if (!comment) return res.status(404).send('comment not found.');
    res.send(comment);
    logger.info('update a comment');
});
//deleting a comment.
router.delete('/api/comments/:id', [users, admin], async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).send('comment not found.');
    res.send(comment);
    logger.info('delete a comment.')
});

//globalisation.
module.exports = router;