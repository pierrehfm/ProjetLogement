const Pub = require("../models/pub");

const getPub = async (req, res) => {
    try {
        const userId = req.user.id;
        const pub = await Pub.findOne({ where: { userId } });

        if (!pub) {
            return res.status(404).json({ message: "Pub non trouvé" });
        }

        res.json(pub);
    } catch (error) {
        console.error("Erreur lors de la récupération de la pub :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const updatePub = async (req, res) => {
    try {
        const { link } = req.body;
        const image = req.files?.image ? req.files.image[0].path : null;
    
        let pub = await Pub.findOne({ where: { userId: req.user.id } });

        if (!pub) {
            pub = await Pub.create({
                userId: req.user.id,
                link,
                image,
            });
        } else {
            await pub.update({
                link,
                image: image || pub.image,
            });
        }

        res.json({ message: "Pub mise à jour", pub });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const getAllPub = async (req, res) => {
    try {
        const pubs = await Pub.findAll();
        res.json(pubs);
    } catch (error) {
        console.error("Erreur lors de la récupération des pubs :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = { getPub, updatePub, getAllPub };