const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./User");

const Pub = sequelize.define("Pub", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: "id"
        }
    },
    link: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING }
});

module.exports = Pub;
