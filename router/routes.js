'use strict';

module.exports = function(app){
    var todoList = require('../controller/customer-controller2');

    app.route('/').get(todoList.index);

    // app.route('/customers').get(controller.getAll);
    // app.route('/customer/:id').get(controller.getById);
    // app.route('/customer').post(controller.insert);
    // app.route('/customer').put(controller.update);
    // app.route('/customer/:id').delete(controller.delete);
}