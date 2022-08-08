const booksController = require('../controller/booksController');
const logger = require('../utils').logger;
const validateToken = require('../utils').validateToken;
const checkPermission = require('../utils').checkPermission;

module.exports = (router) => {
    router.route('/books')
        .post([logger, validateToken, checkPermission], booksController.books);
    router.route('/bookById')
        .get([validateToken], booksController.findBook);
    router.route('/bookAll')
        .get([validateToken], booksController.findBooks);
    router.route('/books/delete/:id')
        .delete([validateToken, checkPermission],booksController.deleteBook);
};
