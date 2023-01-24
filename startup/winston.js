const winston = require('winston');
require('winston-mongodb');

//winston.
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'task-tracker-Log' }),
        new winston.transports.Console(),
        new winston.transports.MongoDB({ db: 'mongodb://127.0.0.1:27017/task-tracker' }),
        new winston.transports.MongoDB({ level: 'error', db: 'mongodb://127.0.0.1:27017/task-tracker' })
    ]
});

module.exports = logger
