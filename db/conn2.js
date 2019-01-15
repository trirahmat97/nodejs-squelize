const Sequelize = require('sequelize');
const CustomerModel = require('../model/Customer');
const AccountModel = require('../model/Account');
const TransaksiModel = require('../model/Transaksi');

const sequelize = new Sequelize('coba3', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        mon: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Customer = CustomerModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Transaksi = TransaksiModel(sequelize, Sequelize);

Account.belongsTo(Customer, {
    foreignKey: 'customerid',
    targetKey: 'id'
});

Transaksi.belongsTo(Account, {
    foreignKey: 'accountid',
    targetKey: 'id'
})

module.exports = {
    Customer,
    Account,
    Transaksi
}