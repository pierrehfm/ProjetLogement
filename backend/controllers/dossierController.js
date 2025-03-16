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
        const photo = req.files?.photo ? req.files.photo[0].path : null;
        const proofOfIncome = req.files?.proofOfIncome ? req.files.proofOfIncome[0].path : null;
        const paySlip = req.files?.paySlip ? req.files.paySlip[0].path : null;
        const incomeSelfEmployment = req.files?.incomeSelfEmployment ? req.files.incomeSelfEmployment[0].path : null;
        const employerCertificate = req.files?.employerCertificate ? req.files.employerCertificate[0].path : null;
        const aidOrAllowance = req.files?.aidOrAllowance ? req.files.aidOrAllowance[0].path : null;
        const pensionRetirement = req.files?.pensionRetirement ? req.files.pensionRetirement[0].path : null;
        const identityProof = req.files?.identityProof ? req.files.identityProof[0].path : null;
        const adressProof = req.files?.adressProof ? req.files.adressProof[0].path : null;
        const bankingDocuments = req.files?.bankingDocuments ? req.files.bankingDocuments[0].path : null;
        const taxNotice = req.files?.taxNotice ? req.files.taxNotice[0].path : null;
        const diplomasOrCertificates = req.files?.diplomasOrCertificates ? req.files.diplomasOrCertificates[0].path : null;
        
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
                photo,
                proofOfIncome,
                paySlip,
                incomeSelfEmployment,
                employerCertificate,
                aidOrAllowance,
                pensionRetirement,
                identityProof,
                adressProof,
                bankingDocuments,
                taxNotice,
                diplomasOrCertificates
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
                photo: photo || dossier.photo,
                proofOfIncome: proofOfIncome || dossier.proofOfIncome,
                paySlip: paySlip || dossier.paySlip,
                incomeSelfEmployment: incomeSelfEmployment || dossier.incomeSelfEmployment,
                employerCertificate: employerCertificate || dossier.employerCertificate,
                aidOrAllowance: aidOrAllowance || dossier.aidOrAllowance,
                pensionRetirement: pensionRetirement || dossier.pensionRetirement,
                identityProof: identityProof || dossier.identityProof,
                adressProof: adressProof || dossier.adressProof,
                bankingDocuments: bankingDocuments || dossier.bankingDocuments,
                taxNotice: taxNotice || dossier.taxNotice,
                diplomasOrCertificates: diplomasOrCertificates || dossier.diplomasOrCertificates,
            });
        }

        res.json({ message: "Dossier mis à jour", dossier });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = { getDossier, updateDossier };
