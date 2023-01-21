//modules.
const express = require('express');
const app = express();
const winston = require('winston');
const mongoose = require('mongoose');
//const { level, info } = require('winston');

//middleware functions.
app.use(express.json());
app.use(function (err, req, res, next) {
    res.status(500).send('Internal Server Error.');
    logger.error('something failed!', err);
});

//winston.
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'task-tracker-Log' }),
        new winston.transports.Console()
    ]
});

//connecting with the database.
mongoose.connect('mongodb://127.0.0.1:27017/task-tracker')
    .then(() => logger.info('connection to the database is successfull.'))
    .catch(err => logger.error('connecting to the database failed.', err));
mongoose.set('strictQuery', false);

const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`listening on port' ${port}`));
