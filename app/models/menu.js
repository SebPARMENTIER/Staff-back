const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Menu extends Model {};

Menu.init(
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
        tableName: "menu"
    }
);

module.exports = Menu;