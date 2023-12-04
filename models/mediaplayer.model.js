import { Model, DataTypes } from 'sequelize';
import { db as sequelize } from '../db/index.js';
import { Room } from './rooms.model.js'; // Importar el modelo Room

class Mediaplayer extends Model {}

const MediaplayerStatus = {
    ACTIVE: 'activo',
    INACTIVE: 'inactivo',
    MAINTENANCE: 'en mantenimiento',
};

Mediaplayer.init(
    {
        mediaplayer_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        serial: {
            type: DataTypes.STRING,
            allowNull: false, // Si un mediaplayer puede no tener un canal asignado
            unique: true,
        },
        channel_id: {
            type: DataTypes.UUID,
            allowNull: true, // Si un mediaplayer puede no tener un canal asignado
        },
        room_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Room, // Referencia al modelo Room
                key: 'room_id', // La llave en el modelo Room al que hace referencia
            }
        },
        // Descripción: El estado actual del mediaplayer, por ejemplo, "activo", "inactivo", "en mantenimiento".
        // Crear un nuevo mediaplayer
        // Mediaplayer.create({
        //     // ...otros campos...
        //     status: MediaplayerStatus.ACTIVE,
        //     // ...otros campos...
        // });
        status: {
            type: DataTypes.ENUM,
            values: Object.values(MediaplayerStatus),
            allowNull: false,
            defaultValue: MediaplayerStatus.INACTIVE, // O cualquier otro estado por defecto que prefieras
        },
        // Descripción: La última vez que se actualizó el estado del mediaplayer.
        // last_updated: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // }
    },
    {
        sequelize,
        modelName: "Mediaplayer",
    }
);

// Establecer la relación con Room
Mediaplayer.belongsTo(Room, { foreignKey: 'room_id' });
Room.hasOne(Mediaplayer, { foreignKey: 'room_id' });

export {
    Mediaplayer
};
