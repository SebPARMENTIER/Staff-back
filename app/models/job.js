const sequelize = require("../client");
const { DataTypes, Model } = require("sequelize");

class Job extends Model {};

Job.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "job"
    }
);

module.exports = Job;