const booksController = require('../controller/booksController');
const logger = require('../utils').logger;

module.exports = (router) => {
    router.route('/books')
        .post(logger, booksController.books);
};
