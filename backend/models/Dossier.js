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
    photo: { type: DataTypes.STRING },
    proofOfIncome: { type: DataTypes.STRING },
    paySlip: { type: DataTypes.STRING },
    incomeSelfEmployment: { type: DataTypes.STRING },
    employerCertificate: { type: DataTypes.STRING },
    aidOrAllowance: { type: DataTypes.STRING },
    pensionRetirement: { type: DataTypes.STRING },
    identityProof: { type: DataTypes.STRING },
    adressProof: { type: DataTypes.STRING },
    bankingDocuments: { type: DataTypes.STRING },
    taxNotice: { type: DataTypes.STRING },
    diplomasOrCertificates: { type: DataTypes.STRING }
});

module.exports = Dossier;
