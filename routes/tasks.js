//modules.
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Task, joiTask, joiID } = require('../models/task');
const logger = require('../startup/winston');
const users = require('../middleware/users');
const admin = require('../middleware/admin');

//creating a task.
router.post('/api/tasks', users, async (req, res) => {
    const validate = joiTask.validate(req.body);
    if (validate.error) res.status(400).send(validate.error.message);

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        dueDate: req.body.dueDate,
        owner: req.user.username
    });

    await task.save();
    const lota = _.pick(task, ['title', 'description', 'completed', 'dueDate']); //lota stands for lodash-task
    res.send(lota);
    logger.info('created a task.');
});
//getting a task.
router.get('/api/tasks', users, async (req, res) => {
    const tasks = await Task.findOne({ owner: req.user.username })
        .sort('title')
        .select('title description completed dueDate');
    res.send(tasks);
    logger.info('get all the tasks.');
});
router.get('/api/tasks/:id', users, async (req, res) => {
    const validateId = joiID.validate(req.params.id);
    if (validateId.error) res.status(400).send(validate.error.message);

    const task = await Task.findOne({ _id: req.params.id, owner: req.user.username });
    if (!task) res.status(404).send('the task is not available.');

    res.send(task);
    logger.info('get a single task.');
});
//admin get.
router.get('/api/admin/tasks', [users, admin], async (req, res) => {
    const task = await Task.find().sort('title');
    res.send(task);
});
//updating a task.
router.put('/api/tasks/:id', users, async (req, res) => {
    const validateId = joiID.validate(req.params.id);
    if (validateId.error) res.status(400).send(validate.error.message);

    const task = await Task.findOneAndUpdate({ _id: req.params.id, owner: req.user.username }, {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    }, { new: true });
    if (!task) res.status(404).send('the task is not available.');
    const lota = _.pick(task, ['title', 'description', 'dueDate', 'completed']);//lota stands for lodash task
    res.send(lota);
    logger.info('update a task.');
});
//delete a task.
router.delete('/api/tasks/:id', users, async (req, res) => {
    const validateId = joiID.validate(req.params.id);
    if (validateId.error) res.status(400).send(validate.error.message);

    const task = await Task.remove({ _id: req.params.id, owner: req.user.owner });
    if (!task) return res.status(404).send('the task is not available.');
    res.send(task);
    logger.info('deleted a task.');
});

//globalization.
module.exports = router;