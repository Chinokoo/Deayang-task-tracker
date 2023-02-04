//modules.
const express = require('express');
const router = express.Router();
const { Assign, joiTask } = require('../models/assign');
const { User } = require('../models/user');
const { Task } = require('../models/task');
const admin = require('../middleware/admin');
const users = require('../middleware/users');

//assigning a task.
router.post('/api/assign', [users, admin], async (req, res) => {
    const validate = joiTask.validate(req.body);
    if (validate.error) res.status(400).send(validate.error.message);

    const user = await User.findOne({ username: req.body.assignedTo });
    if (!user) return res.status(400).send('invalid username on assigned to.');

    const assignedTask = new Assign({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        dueDate: req.body.dueDate,
        assignedTo: req.body.assignedTo,
        assignedBy: req.user.username
    });
    await assignedTask.save();
    res.send(assignedTask);
});
// copying a task and assigning it.
router.post('/api/assign/:id', [users, admin], async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found!');

    const user = await User.findOne({ username: req.body.assignedTo });
    if (!user) return res.status(404).send('username not found!');

    const assignedTask = new Assign({
        title: task.title,
        description: task.description,
        completed: task.completed,
        dueDate: req.body.dueDate,
        assignedTo: req.body.assignedTo,
        assignedBy: req.user.username
    });

    await assignedTask.save();
    res.send(assignedTask);
});
//getting assigned tasks. admin
router.get('/api/admin/assign', [users, admin], async (req, res) => {
    const assignedTasks = await Assign.find().sort('title');
    res.send(assignedTasks);
});
//getting assigned task. users
router.get('/api/assign', users, async (req, res) => {
    const assignedTask = await Assign.find({ assignedTo: req.user.username });
    res.send(assignedTask);
});
//getting a single task
router.get('/api/assign/:id', users, async (req, res) => {
    const assign = await Assign.findById(req.params.id);
    res.send(assign);
});
//deassigning a task.
router.delete('/api/assign/:id', [users, admin], async (req, res) => {
    const assignedTask = await Assign.findByIdAndRemove(req.params.id);
    res.send(assignedTask);
});

//globalisation.
module.exports = router;