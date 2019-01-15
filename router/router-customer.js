'use strict';

module.exports = function (app) {
    var controller = require('../controller/customer-controller2');

    app.route('/Customer/list').get(controller.getAll);
    app.route('/Customer/customer/:id').get(controller.getById);
    app.route('/Customer/customer').post(controller.insert);
    app.route('/Customer/customer').put(controller.update);
    app.route('/Customer/customer/:id').delete(controller.delete);
}