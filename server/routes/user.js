const userController = require('../controller/userController');

module.exports = (router) => {
    router.route('/auth/register')
        .post([authController.validate('register')],authController.register);
    router.route('/auth/sociallogin')
        .post(authController.socialLogin);
};
