const authController = require('../controller/authController');

module.exports = (router) => {
    router.route('/auth/register')
        .post(authController.register);
    router.route('/auth/login')
        .post(authController.login);
};
