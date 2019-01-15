var response = require('../msg/message');
var accountDao = require('../dao/account-dao');
var logger = require('../logger/winston');

var util = require('util');

exports.accounts = function (req, res) {
    let whereClause = {};
    if (req.query.customerid) {
        whereClause.customerid = req.query.customerid;
    }
    accountDao.getAll(whereClause, function (error, rows) {
        if (error) {
            logger.error('error while select: ' + error);
            response.err(error, res);
        } else {
            response.ok(rows, res)
        }
    });
};

exports.getById = function (req, res) {
    accountDao.getById(req.params['id'], function (err, data) {
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        }
        response.ok(data, res);
    });

};

//test untuk get customer
exports.getList = function (req, res) {
    accountDao.getList(req.query.customer, function (err, data) {
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        }
        response.ok(data, res);
        // res.json(data);
    });
}

exports.update = function (req, res) {
    logger.info('request for update :');
    logger.debug(req.body);
    accountDao.getById(req.body.id, function (err, data) { //check account exists
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('account not found', res);
        } else {
            //if exists, then continue update
            accountDao.update(req.body.id, req.body, function (err, data) {
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
    accountDao.insert(req.body, function (err, data) {
        if (err) {
            logger.error('error call insert : ' + err);
            response.err(err, res);
        }
        response.ok('data inserted with id ' + data.id, res);
    });
};

exports.del = function (req, res) {
    logger.info(util.format('deleting account id %s', req.params['id']));
    accountDao.getById(req.params['id'], function (err, data) { //check account exists
        if (err) {
            logger.error('error call getById : ' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound('account not found', res);
        } else {
            //if exists, continue delete
            accountDao.del(req.params['id'], function (err, data) {
                if (err) {
                    logger.error('error call delete : ' + err);
                    return response.err(err, res);
                }
                response.ok('account deleted with id : ' + data, res);
            });
        }
    });
};