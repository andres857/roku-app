import { Sequelize } from 'sequelize';

const db = new Sequelize('mcc', 'mcc-devel', 'UvB!EWMpcmTXEdI(', {
    host: '192.168.0.102',
    port: 2555,
    dialect: 'mysql'
});

export {
    db
}