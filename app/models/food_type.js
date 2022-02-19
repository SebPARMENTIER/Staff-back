const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Food_type extends Model {};

Food_type.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "food_type"
    }
);

module.exports = Food_type;