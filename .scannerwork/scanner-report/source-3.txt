var massage = require('../msg/message');
var customerDao = require('../dao/customer-dao');
var log = require('../logger/winston');

exports.getById = function (req, res) {
    customerDao.getId(req.params['id'], function (err, data) {
        if (err) {
            massage.err(err, res);
        } else if (data == null) {
            log.error('log error : ', err, res);            
            massage.dataNotFound('data not found : ' + data, res);
        } else {
            massage.ok(data, res);
            log.info('log error data not found : ', data, res);
        }
    });
}

exports.getAll = function (req, res) {
    customerDao.getAll(function (err, data) {
        if (err) {
            console.log('error call customer : ' + err);
            massage.err(err, res);
        } else {
            massage.ok(data, res);
        }
    });
}

exports.insert = function (req, res) {
    customerDao.insert(req.body, function (err, data) {
        if (err) {
            console.log('error call insert : ' + err);
            massage.err(err, res);
        } else {
            massage.ok(data, res);
        }
    });
}

exports.update = function (req, res) {
    customerDao.getId(req.params['id'], function (err, data) {
        if (err) {
            console.log('error call getById : ' + err);
            massage.err(err, res);
        } else if (data == null) {
            massage.dataNotFound('customer not found ' + err, res);
        } else {
            customerDao.update(req.body, req.body.id, function (err, data) {
                if (err) {
                    console.log('error call update :' + err);
                    massage.err(err, res);
                }
                massage.ok(' update data ' + data.message, res);
            });
        }
    })
}

exports.delete = function (req, res) {
    customerDao.getId(req.params['id'], function (err, data) {
        if (err) {
            console.log('error call getbyid customer ' + err);
            massage.err(err, res);
        } else if (data == null) {
            massage.dataNotFound('customer not found ' + err, res);
        } else {
            customerDao.delete(req.params['id'], function (err, data) {
                if (err) {
                    console.log('call delete customer : ' + err);
                    massage.err(err, res);
                } else {
                    massage.ok(data, res);
                }
            });
        }
    })
}