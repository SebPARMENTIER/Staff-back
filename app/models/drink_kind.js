const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Drink_kind extends Model {};

Drink_kind.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "drink_kind"
    }
);

module.exports = Drink_kind;