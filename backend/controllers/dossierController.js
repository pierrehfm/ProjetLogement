const Dossier = require("../models/Dossier");

const getDossier = async (req, res) => {
    try {
        const dossier = await Dossier.findOne({ where: { userId: req.user.id } });
        res.json(dossier || {});
    } catch (error) {
        console.error("Erreur lors de la récupération du dossier :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const updateDossier = async (req, res) => {
    try {
        // const { field1, field2 } = req.body;
        const { 
            currentAdress,
            familySituation,
            birthPlace,
            phone,
            guarantorLastname,
            guarantorFirstname,
            guarantorEmail,
            guarantorPhone,
            researchLocation,
            researchType,
            researchSalary,
            researchBudget
        } = req.body;
        const file1 = req.files?.file1 ? req.files.file1[0].path : null;
        const file2 = req.files?.file2 ? req.files.file2[0].path : null;

        let dossier = await Dossier.findOne({ where: { userId: req.user.id } });

        if (!dossier) {
            dossier = await Dossier.create({
                userId: req.user.id,
                currentAdress,
                familySituation,
                birthPlace,
                phone,
                guarantorLastname,
                guarantorFirstname,
                guarantorEmail,
                guarantorPhone,
                researchLocation,
                researchType,
                researchSalary,
                researchBudget,
                file1,
                file2
            });
        } else {
            await dossier.update({
                currentAdress,
                familySituation,
                birthPlace,
                phone,
                guarantorLastname,
                guarantorFirstname,
                guarantorEmail,
                guarantorPhone,
                researchLocation,
                researchType,
                researchSalary,
                researchBudget,
                file1: file1 || dossier.file1,
                file2: file2 || dossier.file2
            });
        }

        res.json({ message: "Dossier mis à jour", dossier });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = { getDossier, updateDossier };
