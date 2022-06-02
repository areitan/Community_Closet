const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Picture extends Model { }

Picture.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Picture',
    }
);

module.exports = Picture;