const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class User extends Model {};

User.init(
    {
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        firstname: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "user"
    }
);

module.exports = User;