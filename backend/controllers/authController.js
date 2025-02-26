const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = "secret"; 

const register = async (req, res) => {
    const { firstname, lastname, gender, birthDate, accountType, email, password } = req.body;


    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            gender,
            birthDate,
            accountType,
            email,
            password_hash: hashedPassword
        });

        res.status(201).json({ message: "Utilisateur créé avec succès !", userId: newUser.id });

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'inscription." });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé." });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect." });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const me = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "Non autorisé" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY);

        const user = await User.findByPk(decoded.id, {
            attributes: ["id", "firstname", "lastname", "email", "gender", "birthDate", "accountType"]
        });

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération des infos utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = { register, login, me };

