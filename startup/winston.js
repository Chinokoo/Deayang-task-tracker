const winston = require('winston');

//winston.
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: 'task-tracker-Log' }),
        new winston.transports.Console({ colorize: true, prettyprint: true })
    ]
});

module.exports = logger
