const { sequelize } = require("../models"); 

sequelize.sync({ truncate: true }).then(() => {
    console.log("Base de données réinitialisée !");
    process.exit(); // Ferme le script après exécution
}).catch(error => {
    console.error("Erreur lors de la réinitialisation :", error);
});
