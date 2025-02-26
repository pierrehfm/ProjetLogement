const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db", // Fichier de la base SQLite
    logging: false, // Désactiver les logs SQL
});

module.exports = sequelize;
