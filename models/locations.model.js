import { Model, DataTypes } from 'sequelize';
import { db as sequelize } from '../db/index.js';
import { Client } from './client.model.js';

class Location extends Model {}

Location.init(
    {
        location_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        location_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        },
        client_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Client, // Referencia al modelo Client
                key: 'client_id', // La llave en el modelo Client a la que hace referencia
            }
        }
    },
    {
        sequelize,
        modelName: "Location",
    }
);

Location.belongsTo(Client, {foreignKey: 'client_id'});
Client.hasMany(Location, {foreignKey: 'client_id'});

export {
    Location
} 