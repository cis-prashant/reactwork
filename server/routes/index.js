const booksRoutes = require('./books');

module.exports = (router) => {
    booksRoutes(router);
  return router;
};