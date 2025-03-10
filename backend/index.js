const express = require("express");
const sequelize = require("./models/index");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Utilisation des routes (Garde uniquement celle-ci)
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Synchronisation de la BDD
sequelize.sync({ force: false })
    .then(() => console.log("Base de données synchronisée"))
    .catch(err => console.error("Erreur de synchronisation :", err));

// Lancement du serveur
app.listen(5000, () => {
    console.log("Serveur démarré sur http://localhost:5000");
});

