import { Model, DataTypes } from 'sequelize';
import { db as sequelize } from '../db/index.js';
import { Mediaplayer } from './mediaplayer.model.js'; // Asegúrate de tener la ruta correcta

class MediaplayerConfig extends Model {}

MediaplayerConfig.init(
    {
        config_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        mediaplayer_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Mediaplayer,
                key: 'mediaplayer_id',
            }
        },
        wifi_connected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        wifi_password: {
            type: DataTypes.STRING,
            allowNull: true, // Depende de si quieres almacenar esta información
        },
        resolution: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Cualquier otro campo que necesites
    },
    {
        sequelize,
        modelName: "MediaplayerConfig",
    }
);

// Relación uno a uno con Mediaplayer
MediaplayerConfig.belongsTo(Mediaplayer, { foreignKey: 'mediaplayer_id' });
Mediaplayer.hasOne(MediaplayerConfig, { foreignKey: 'mediaplayer_id' });

export { MediaplayerConfig };
