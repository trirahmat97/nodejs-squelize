'use strict';

var con = require('../db/con');

const sqlGetById = "select * from customer where id = ?";
const sqlGetAll = "select * from customer";
const sqlUpdate = "update customer set ? where id = ?";
const sqlInsert = "insert into customer set ?";
const sqlDelete = "delete from customer where id = ?";

exports.getId = function getId(id, calback) {
    con.query(sqlGetById, id, function (err, rows) {
        if (err) {
            console.log(err);
            return calback(err);
        }
        calback(null, rows[0]);
    });
}

exports.getAll = function (calback) {
    con.query(sqlGetAll, function (err, rows) {
        if (err) {
            return calback(err);
        }
        calback(null, rows);
    });
}

exports.insert = function (data, calback) {
    con.query(sqlInsert, data, function (err, rows) {
        if (err) {
            console.log(err);
            return calback(err);
        }
        calback(null, rows);
    });
}

exports.update = function (data, id, calback) {
    con.query(sqlUpdate, [data, id], function (err, rows) {
        if (err) {
            console.log(err);
            return calback(err);
        }
        calback(null, rows);
    });
}

exports.delete = function (id, calback) {
    con.query(sqlDelete, id, function (err, rows) {
        if (err) {
            console.log(err);
            return calback(err);
        }
        calback(null, rows);
    });
}