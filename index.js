//modules.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const logger = require('./startup/winston');
const tasks = require('./routes/tasks');
const comments = require('./routes/comments');
const users = require('./routes/users');
const login = require('./routes/login');
const assigned = require('./routes/assigned');

//middleware functions.
app.use(express.json());
app.use(tasks);
app.use(comments);
app.use(users);
app.use(login);
app.use(assigned);


//winston 
process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex),
        process.exit(1);
});
process.on('unhandledRejection', (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
});

//task-tracker private key.
if (!config.get('task-trackerPrivateKey')) {
    logger.error('Fatal Error! task-tracker private key not defined!');
    process.exit(1);
}

//connecting with the database.
mongoose.connect('mongodb://127.0.0.1:27017/task-tracker')
    .then(() => logger.info('connection to the database is successfull.'))
    .catch(err => logger.error('connection to the database failed.', err));

//globalization.
module.exports.logger = logger;

//starting the server.
const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`listening on port' ${port}`));
