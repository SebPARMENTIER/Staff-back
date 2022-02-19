const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Food_kind extends Model {};

Food_kind.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "food_kind"
    }
);

module.exports = Food_kind;