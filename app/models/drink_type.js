const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Drink_type extends Model {};

Drink_type.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "drink_type"
    }
);

module.exports = Drink_type;