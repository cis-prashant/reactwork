const winston = require('winston');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

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
    validateToken: (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
         const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
          
          const options = {
              expiresIn: process.env.JWT_EXPIRES, algorithm: 'HS256'
          }; 
          try {
              // verify makes sure that the token hasn't expired and has been issued by us
              result = jwt.verify(token, process.env.JWT_SECRET, options);
              // Let's pass back the decoded token to the request object
              next();
          } catch (err) {
              result = { 
                  error: 'Authentication error. In-valid Token.',
                  status: 401
              };
              console.log(result);
              res.status(401).send(result);
              // Throw an error just in case anything goes wrong with verification
              //throw new Error(err);
          }
      } else {
        result = { 
          error: 'Authentication error. Token required.',
          status: 401
        };
        res.status(401).send(result);
      }
    },

    logger: (req, res, next) => {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));

        logger.log({
          level: 'info',
          message: 'Hello distributed log files!ddddddd'
        });
        next();
    },

    checkPermission: (req, res, next) => {       
        if(req.route.path == '/books' && req.route.methods.post) {
            let token = req.headers.authorization.split(' ')[1];
            let result;
            let options = {
                  expiresIn: process.env.JWT_EXPIRES, algorithm: 'HS256'
            }; 
            result = jwt.verify(token, process.env.JWT_SECRET, options);
            if(result.role.includes('CREATOR')) {
                next();
            } else {
                let resp = { 
                  error: 'You dont have permission to do this action!',
                  status: 401
                };
                res.status(401).send(resp);
            }
        }
    }
};