var response = require('../msg/message');
var transaksiDao = require('../dao/transaksi-dao');
var logger = require('../logger/winston');

var util = require('util');

exports.transaksis = function (req, res) {
    let whereClause = {};
    if (req.query.accountid) {
        whereClause.accountid = req.query.accountid;
    }
    transaksiDao.getAll(whereClause, function (error, rows) {
        if (error) {
            logger.error('error while select: ' + error);
            response.err(error, res);
        } else {
            response.ok(rows, res)
        }
    });
};

//list
exports.getList = function (req, res) {
    transaksiDao.getList(req.query.account, function (err, data) {
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        }
        response.ok(data, res);
        // res.json(data);
    });

};

exports.getById = function (req, res) {
    transaksiDao.getById(req.params['id'], function (err, data) {
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        }
        response.ok(data, res);
    });

};

exports.update = function (req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    transaksiDao.getById(req.body.id, function (err, data) { //check transaksi exists
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('transaksi not found', res);
        } else {
            //if exists, then continue update
            transaksiDao.update(req.body.id, req.body, function (err, data) {
                if (err) {
                    logger.error('error call update : ' + err);
                    response.err(err, res);
                }
                response.ok('updated data : ' + data.id, res);
            });
        }
    });
};

exports.insert = function (req, res) {
    logger.info('request for insert :');
    logger.debug(req.body);
    transaksiDao.insert(req.body, function (err, data) {
        if (err) {
            logger.error('error call insert : ' + err);
            response.err(err, res);
        }
        response.ok('data inserted with id ' + data.id, res);
    });
};

exports.del = function (req, res) {
    logger.info(util.format('deleting transaksi id %s', req.params['id']));
    transaksiDao.getById(req.params['id'], function (err, data) { //check transaksi exists
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('transaksi not found', res);
        } else {
            //if exists, continue delete
            transaksiDao.del(req.params['id'], function (err, data) {
                if (err) {
                    logger.error('error call delete : ' + err);
                    return response.err(err, res);
                }
                response.ok('transaksi deleted with id : ' + data, res);
            });
        }
    });
};