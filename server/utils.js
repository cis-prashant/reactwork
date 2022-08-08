const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = {
   logger: (req, res, next) => {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));

        logger.log({
          level: 'info',
          message: 'Hello distributed log files!ddddddd'
        });
        console.log('-----here------');
        next();
  }

 
};