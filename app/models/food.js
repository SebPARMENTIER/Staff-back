const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Food extends Model {};

Food.init(
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
        tableName: "food"
    }
);

module.exports = Food;