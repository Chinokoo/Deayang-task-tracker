//modules.
const express = require('express');
const router = express.Router();
const { Task, joiTask, joiID } = require('../models/task');
const logger = require('../startup/winston');

//creating a task.
router.post('/api/tasks', async (req, res) => {
    const validate = joiTask.validate(req.body);
    if (validate.error) res.status(400).send(validate.error.message);

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    });

    await task.save();
    res.send(task);
    logger.info('created a task.');
});
//getting a task.
router.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find().sort('title');
    res.send(tasks);
    logger.info('get all the tasks.');
});
router.get('/api/tasks/:id', async (req, res) => {
    const validateId = joiID.validate(req.params.id);
    if (validateId.error) res.status(400).send(validate.error.message);

    const task = await Task.findById(req.params.id);
    if (!task) res.status(404).send('the task is not available.');

    res.send(task);
    logger.info('get a single task.');
});
//updating a task.
router.put('/api/tasks/:id', async (req, res) => {
    const validateId = joiID.validate(req.params.id);
    if (validateId.error) res.status(400).send(validate.error.message);

    const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    }, { new: true });
    if (!task) res.status(404).send('the task is not available.');
    res.send(task);
    logger.info('update a task.');
});
//delete a task.
router.delete('/api/tasks/:id', async (req, res) => {
    const validateId = joiID.validate(req.params.id);
    if (validateId.error) res.status(400).send(validate.error.message);

    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) res.status(404).send('the task is not available.');
    res.send(task);
    logger.info('deleted a task.');
});

//globalization.
module.exports = router;