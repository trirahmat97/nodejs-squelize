const {
    Account,
    Customer,
    Transaksi
} = require('../db/conn2');

var logger = require('../logger/winston');

exports.getById = function getById(id, callback) {
    Transaksi.findById(id)
        .then((transaksi) => {
            return callback(null, transaksi);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};

exports.getList = function getList(id, callback) {
    Transaksi.findAll({
            where: {
                accountid: id,
            },
            include: [{
                model: Account,
                include: [{
                    model: Customer
                }]
            }],
        })
        .then((transaksi) => {
            return callback(null, transaksi);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};

exports.getAll = function getAll(whereClause, callback) {
    Transaksi.findAll({
            where: whereClause,
            include: [{
                model: Account,
                include: [{
                    model: Customer,
                }]
            }]
        })
        .then((transaksi) => {
            return callback(null, transaksi);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};

exports.insert = function insert(data, callback) {
    transaksi = data;
    if (transaksi.account == null && transaksi.accountid == null) {
        res.json('customer kosong');
    } else {
        if (transaksi.accountid == null) {
            transaksi.accountid = transaksi.account.id;
        }
    }
    Transaksi.create(transaksi)
        .then(transaksi => {
            return callback(null, transaksi);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};

exports.update = function update(id, data, callback) {
    account = data;
    if (transaksi.account == null && transaksi.accountid == null) {
        res.json('customer kosong');
    } else {
        if (transaksi.accountid == null) {
            transaksi.accountid = transaksi.account.id;
        }
    }

    Transaksi.update(data, {
            where: {
                id: data.id
            },
            returning: true,
            plain: true
        })
        .then(result => {
            logger.info('result  update:');
            logger.info(result);
            return callback(null, data);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};

exports.del = function del(id2, callback) {
    Transaksi.destroy({
            where: {
                id: id2
            }
        })
        .then(result => {
            logger.info('result  update:');
            logger.info(result);
            return callback(null, id2);
        })
        .catch((error) => {
            logger.error(error);
            return callback(error);
        })
};