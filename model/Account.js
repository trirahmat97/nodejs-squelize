const uuid = require('uuid/v4');

module.exports = (sequelize, type) => {
    return sequelize.define('account', {
        id: {
            field: 'id',
            type: type.UUID,
            primaryKey: true,
            autoIncrement: uuid()
        },
        opendate: {
            field: 'opendate',
            type: type.DATE
        },
        balance: {
            field: 'balance',
            type: type.DECIMAL
        },
        customerid: {
            type: type.INTEGER,
            onDelete: 'CASECADE',

            references: {
                model: 'customer',
                key: 'id'
            }
        }
    }, {
        tableName: 'account',
        timestamps: false
    });
}