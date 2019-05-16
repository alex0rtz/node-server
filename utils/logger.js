const rootPath = require('app-root-path');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => `{"time": "${timestamp}",  "label": "${label}", "level": "${level}", "msg": "${escape( message )}"},`);

const consoleFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] - ${level.toUpperCase()}: ${message}`;
});

let logger;

if (process.env.NODE_ENV === 'dev') {
    logger = createLogger({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            consoleFormat
        ),
        transports: [new transports.Console()]
    });
} else {
    logger = createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
        transports: [
            new transports.File({
                level: 'error',
                filename: `${rootPath}/logs/errors.log.json`
            }),
            new transports.File({
                filename: `${rootPath}/logs/combined.log.json`
            })
        ],
        exceptionHandlers: [
            new transports.File({
                filename: `${rootPath}/logs/exceptions.log.json`
            })
        ]
    });
}

module.exports = logger;