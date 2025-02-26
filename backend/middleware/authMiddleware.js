const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret"; // 🔒 Stocke ça dans un fichier `.env` plus tard

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Token manquant." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token invalide." });
    }
};

module.exports = authMiddleware;
