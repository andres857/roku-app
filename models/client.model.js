import { Model, DataTypes } from 'sequelize';
import { db as sequelize } from '../db/index.js';

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
            unique: true,
        },
        client_abreviatura: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        modelName: "Client",
    }
);

export {
    Client
} 