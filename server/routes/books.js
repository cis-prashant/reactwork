const booksController = require('../controller/booksController');
const logger = require('../utils').logger;
const validateToken = require('../utils').validateToken;
const checkPermission = require('../utils').checkPermission;

module.exports = (router) => {
    router.route('/books')
        .post([logger, validateToken, checkPermission], booksController.books);
};
