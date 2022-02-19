const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Card extends Model {};

Card.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "card"
    }
);

module.exports = Card;