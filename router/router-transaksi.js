'use strict';

module.exports = function (app) {
    var controller = require('../controller/controller-transaksi');
    app.route('/Transaction/list').get(controller.transaksis);
    app.route('/Transaction/transactions').get(controller.transaksis);
    app.route('/Transaction/transaction').post(controller.insert);
    app.route('/Transaction/transaction/:id').get(controller.getById);
    app.route('/Transaction/transaction').put(controller.update);
    app.route('/Transaction/transaction/:id').delete(controller.del);

}