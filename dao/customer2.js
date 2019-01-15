const {
    Customer
} = require('../db/conn2');
var logger = require('../logger/winston');

exports.getId = function getId(id, calback) {
    Customer.findById(id)
        .then((customer) => {
            return calback(null, customer);
        })
        .catch((error) => {
            logger.error(error);
            return calback(error);
        })
}

exports.getAll = function (calback) {
    Customer.findAll()
        .then((customer) => {
            return calback(null, customer)
        })
        .catch((error) => {
            logger.error(error);
            return calback(error);
        })
}

exports.insert = function insert(data, calback) {
    Customer.create(data)
        .then((customer) => {
            return calback(null, customer)
        })
        .catch((error) => {
            logger.error(error);
            return calback(error);
        })
}

exports.update = function update(data, id, calback) {
    Customer.update(data, {
            where: {
                id: data.id
            },
            returning: true,
            plain: true
        })
        .then(result => {
            logger.info('result update');
            logger.info(result);
            return calback(null, data)
        })
        .catch((error) => {
            logger.error(error);
            return calback(error);
        })
}

exports.del = function del(id, calback) {
    Customer.destroy({
            where: {
                id: id
            }
        })
        .then(result => {
            logger.info('result delete');
            logger.error(result);
            return calback(null, id);
        })
        .catch((error) => {
            logger.error(error);
            return calback(error);
        })
}