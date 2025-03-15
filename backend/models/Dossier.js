const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./User");

const Dossier = sequelize.define("Dossier", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Un seul dossier par utilisateur
        references: {
            model: User,
            key: "id"
        }
    },
    currentAdress: { type: DataTypes.STRING },
    familySituation: { type: DataTypes.STRING },
    birthPlace: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    guarantorLastname: { type: DataTypes.STRING },
    guarantorFirstname: { type: DataTypes.STRING },
    guarantorEmail: { type: DataTypes.STRING },
    guarantorPhone: { type: DataTypes.STRING },
    researchLocation: { type: DataTypes.STRING },
    researchType: { type: DataTypes.STRING },
    researchSalary: { type: DataTypes.DECIMAL(10, 2) },
    researchBudget: { type: DataTypes.DECIMAL(10, 2) },
    file1: { type: DataTypes.STRING },
    file2: { type: DataTypes.STRING },
});

module.exports = Dossier;
