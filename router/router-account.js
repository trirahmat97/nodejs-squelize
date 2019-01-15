'use strict';

module.exports = function (app) {
    var controller = require('../controller/account-controller');

    app.route('/Account/list').get(controller.accounts);
    app.route('/Account/accounts').get(controller.accounts);
    app.route('/Account/account').post(controller.insert);
    app.route('/Account/account/:id').get(controller.getById);
    app.route('/Account/account').put(controller.update);
    app.route('/Account/account/:id').delete(controller.del);

}