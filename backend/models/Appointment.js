const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./User");

const Appointment = sequelize.define("Appointment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: User,
            key: "id"
        }
    },
    date: { 
        type: DataTypes.DATEONLY, // Format YYYY-MM-DD
        allowNull: false 
    },
    time: { 
        type: DataTypes.TIME, // Format HH:mm:ss
        allowNull: false 
    },
    link: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
});

module.exports = Appointment;
