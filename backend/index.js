const express = require("express");
const path = require('path');
const sequelize = require("./models/index");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const dossierRoutes = require("./routes/dossierRoutes");
const pubRoutes = require("./routes/pubRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", dossierRoutes);
app.use("/api", pubRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'usersDossiers')));
app.use('/uploadsPub', express.static(path.join(__dirname, 'pub')));

// Synchronisation de la BDD
sequelize.sync({ force: false })
    .then(() => console.log("Base de données synchronisée"))
    .catch(err => console.error("Erreur de synchronisation :", err));

// Lancement du serveur
app.listen(5000, () => {
    console.log("Serveur démarré sur http://localhost:5000");
});

