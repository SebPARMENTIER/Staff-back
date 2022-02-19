const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Restaurant extends Model {};

Restaurant.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        adress: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "restaurant"
    }
);

module.exports = Restaurant;