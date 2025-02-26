const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database_name", "username", "password", {
    host: "localhost",
    dialect: "sqlite", // ou "mysql" / "postgres" selon ta config
    storage: "./database.sqlite", // Uniquement pour SQLite
    logging: false, // Désactiver les logs SQL (optionnel)
});

module.exports = sequelize;
