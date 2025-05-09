const User = require("../models/User");

const update = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const { firstname, lastname, gender, birthDate } = req.body;
        const updatedFields = {};

        if (firstname) updatedFields.firstname = firstname;
        if (lastname) updatedFields.lastname = lastname;
        if (gender) updatedFields.gender = gender;
        if (birthDate) updatedFields.birthDate = birthDate;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "Aucune modification apportée." });
        }

        await user.update(updatedFields);

        res.json({ message: "Informations mises à jour avec succès", user });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const listUsers = await User.findAll();
        res.json(listUsers);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const updateUserType = async (req, res) => {
    try {
        const { userId, accountType } = req.body;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const updatedFields = {};

        if (accountType) updatedFields.accountType = accountType;
        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "Aucune modification apportée." });
        }

        await user.update(updatedFields);

        res.json({ message: "Informations mises à jour avec succès", user });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = { update, getAllUsers, updateUserType };
