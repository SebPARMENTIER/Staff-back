const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Drink extends Model {};

Drink.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "drink"
    }
);

module.exports = Drink;