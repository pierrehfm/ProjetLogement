const User = require("./User");
const Dossier = require("./Dossier");

// Définition des associations
User.hasOne(Dossier, { foreignKey: "userId" });
Dossier.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Dossier };
