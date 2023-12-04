import { Model, DataTypes } from 'sequelize';
import { db as sequelize } from '../db/index.js';
import { Location } from './locations.model.js';

class Room extends Model {}

Room.init(
    {
        room_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        room_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        room_floor: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        location_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Location, // Referencia al modelo 
                key: 'location_id', // La llave en el modelo Location al que hace referencia
            }
        }
    },
    {
        sequelize,
        modelName: "Room",
    }
);

Room.belongsTo(Location, {foreignKey: 'location_id'});
Location.hasMany(Room, {foreignKey: 'location_id'});

export {
    Room
} 