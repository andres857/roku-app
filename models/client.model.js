import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('mcc', 'mcc-devel', 'UvB!EWMpcmTXEdI(', {
    host: '192.168.0.102',
    port: 2555,
    dialect: 'mysql'
});

class Client extends Model {}

Client.init(
    {
        client_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_abreviatura: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "Client",
    }
);

module.exports = Client;