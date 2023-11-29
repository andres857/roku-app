const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mcc', 'mcc-devel', 'UvB!EWMpcmTXEdI(', {
    host: '192.168.0.102',
    port: 2555,
    dialect: 'mysql'
});

async function main(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
main();
