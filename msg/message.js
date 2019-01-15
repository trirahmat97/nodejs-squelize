'use strict';

exports.ok = function (values, res) {
    var data = {
        'status': "00",
        'message': "success",
        'values': values
    };

    res.json(data);
    res.end();
}

exports.err = function (values, res) {
    var data = {
        'status': "404",
        'message': "error",
        'values': values
    };
    res.json(data);
    res.end();
}

exports.dataNotFound = function (values, res) {
    var data = {
        'status': "505",
        'message': "not found",
        'values': values
    };

    res.json(data);
    res.end();
}