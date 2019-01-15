var massage = require('../msg/message');
var customerDao = require('../dao/customer2');
var log = require('../logger/winston');
var util = require('util');

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
            log.error('error call customer : ' + err);
            massage.err(err, res);
        } else {
            massage.ok(data, res);
            // return res.json(data);
        }
    });
}

exports.insert = function (req, res) {
    customerDao.insert(req.body, function (err, data) {
        if (err) {
            log.error('error call insert : ' + err);
            massage.err(err, res);
        } else {
            massage.ok(data, res);
        }
    });
}

exports.update = function (req, res) {
    customerDao.getId(req.body.id, function (err, data) {
        if (err) {
            log.error('error call getById : ' + err);
            massage.err(err, res);
        } else if (data == null) {
            massage.dataNotFound('customer not found ' + err, res);
        } else {
            customerDao.update(req.body, req.body.id, function (err, data) {
                if (err) {
                    log.error('error call update :' + err);
                    massage.err(err, res);
                }
                massage.ok(' update data ' + data.id, res);
            });
        }
    })
}

exports.delete = function (req, res) {
    customerDao.getId(req.params['id'], function (err, data) {
        if (err) {
            log.error('error call getbyid customer ' + err);
            massage.err(err, res);
        } else if (data == null) {
            massage.dataNotFound('customer not found ' + err, res);
        } else {
            customerDao.del(req.params['id'], function (err, data) {
                if (err) {
                    log.error('call delete customer : ' + err);
                    massage.err(err, res);
                } else {
                    res.json(data.id);
                    // massage.ok(data, res);
                }
            });
        }
    })
}