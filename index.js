//modules.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('./startup/winston');
const tasks = require('./routes/tasks');
//const { level, info } = require('winston');

//middleware functions.
app.use(express.json());
app.use(tasks);
app.use(function (err, req, res, next) {
    res.status(500).send('Internal Server Error.');
    logger.error('something failed!', err);
});

//connecting with the database.
mongoose.connect('mongodb://127.0.0.1:27017/task-tracker')
    .then(() => logger.info('connection to the database is successfull.'))
    .catch(err => logger.error('connection to the database failed.', err));

//globalization.
module.exports.logger = logger;

//starting the server.
const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`listening on port' ${port}`));
