const { Dossier, User } = require("../models/associations");
const fs = require('fs');
const path = require('path');

const getDossier = async (req, res) => {
    try {
        const userId = req.params.id || req.user.id; // Si un ID est passé, on l'utilise, sinon, c'est l'utilisateur connecté
        const dossier = await Dossier.findOne({ where: { userId } });

        if (!dossier) {
            return res.status(404).json({ message: "Dossier non trouvé" });
        }

        res.json(dossier);
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
                photo: req.files?.photo ? req.files.photo[0].path : null,
                proofOfIncome: req.files?.proofOfIncome ? req.files.proofOfIncome[0].path : null,
                paySlip: req.files?.paySlip ? req.files.paySlip[0].path : null,
                incomeSelfEmployment: req.files?.incomeSelfEmployment ? req.files.incomeSelfEmployment[0].path : null,
                employerCertificate: req.files?.employerCertificate ? req.files.employerCertificate[0].path : null,
                aidOrAllowance: req.files?.aidOrAllowance ? req.files.aidOrAllowance[0].path : null,
                pensionRetirement: req.files?.pensionRetirement ? req.files.pensionRetirement[0].path : null,
                identityProof: req.files?.identityProof ? req.files.identityProof[0].path : null,
                adressProof: req.files?.adressProof ? req.files.adressProof[0].path : null,
                bankingDocuments: req.files?.bankingDocuments ? req.files.bankingDocuments[0].path : null,
                taxNotice: req.files?.taxNotice ? req.files.taxNotice[0].path : null,
                diplomasOrCertificates: req.files?.diplomasOrCertificates ? req.files.diplomasOrCertificates[0].path : null,
            });
        } else {
            const deleteOldFile = (oldPath) => {
                if (oldPath && fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, (err) => {
                        if (err) console.error(`Erreur lors de la suppression de ${oldPath}:`, err);
                    });
                }
            };

            if (req.files?.photo) deleteOldFile(dossier.photo);
            if (req.files?.proofOfIncome) deleteOldFile(dossier.proofOfIncome);
            if (req.files?.paySlip) deleteOldFile(dossier.paySlip);
            if (req.files?.incomeSelfEmployment) deleteOldFile(dossier.incomeSelfEmployment);
            if (req.files?.employerCertificate) deleteOldFile(dossier.employerCertificate);
            if (req.files?.aidOrAllowance) deleteOldFile(dossier.aidOrAllowance);
            if (req.files?.pensionRetirement) deleteOldFile(dossier.pensionRetirement);
            if (req.files?.identityProof) deleteOldFile(dossier.identityProof);
            if (req.files?.adressProof) deleteOldFile(dossier.adressProof);
            if (req.files?.bankingDocuments) deleteOldFile(dossier.bankingDocuments);
            if (req.files?.taxNotice) deleteOldFile(dossier.taxNotice);
            if (req.files?.diplomasOrCertificates) deleteOldFile(dossier.diplomasOrCertificates);


            const dossierScore = calculateDossierScore({
                ...dossier.dataValues,
                ...{
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
                    dossierScore,
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
                }
            });

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
                photo: req.files?.photo ? req.files.photo[0].path : dossier.photo,
                proofOfIncome: req.files?.proofOfIncome ? req.files.proofOfIncome[0].path : dossier.proofOfIncome,
                paySlip: req.files?.paySlip ? req.files.paySlip[0].path : dossier.paySlip,
                incomeSelfEmployment: req.files?.incomeSelfEmployment ? req.files.incomeSelfEmployment[0].path : dossier.incomeSelfEmployment,
                employerCertificate: req.files?.employerCertificate ? req.files.employerCertificate[0].path : dossier.employerCertificate,
                aidOrAllowance: req.files?.aidOrAllowance ? req.files.aidOrAllowance[0].path : dossier.aidOrAllowance,
                pensionRetirement: req.files?.pensionRetirement ? req.files.pensionRetirement[0].path : dossier.pensionRetirement,
                identityProof: req.files?.identityProof ? req.files.identityProof[0].path : dossier.identityProof,
                adressProof: req.files?.adressProof ? req.files.adressProof[0].path : dossier.adressProof,
                bankingDocuments: req.files?.bankingDocuments ? req.files.bankingDocuments[0].path : dossier.bankingDocuments,
                taxNotice: req.files?.taxNotice ? req.files.taxNotice[0].path : dossier.taxNotice,
                diplomasOrCertificates: req.files?.diplomasOrCertificates ? req.files.diplomasOrCertificates[0].path : dossier.diplomasOrCertificates,
            });
        }

        res.json({ message: "Dossier mis à jour", dossier });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const getAllDossiers = async (req, res) => {
    try {
        const dossiers = await Dossier.findAll({
            include: {
                model: User,
                attributes: ["firstname", "lastname"] // Récupère uniquement les champs nécessaires
            }
        });
        res.json(dossiers);
    } catch (error) {
        console.error("Erreur lors de la récupération des dossiers :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const getPublicDossier = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "ID utilisateur requis" });
        }

        const dossier = await Dossier.findOne({ where: { userId } });

        if (!dossier) {
            return res.status(404).json({ message: "Dossier non trouvé" });
        }

        res.json(dossier);
    } catch (error) {
        console.error("Erreur lors de la récupération du dossier :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

function calculateDossierScore(dossier) {
    let score = 0;

    // 1. Pièces justificatives
    const documents = [
        dossier.photo,
        dossier.proofOfIncome,
        dossier.paySlip,
        dossier.incomeSelfEmployment,
        dossier.employerCertificate,
        dossier.aidOrAllowance,
        dossier.pensionRetirement,
        dossier.identityProof,
        dossier.adressProof,
        dossier.bankingDocuments,
        dossier.taxNotice,
        dossier.diplomasOrCertificates
    ];

    const uploadedDocuments = documents.filter(doc => !!doc).length;
    score += uploadedDocuments * 5; // Chaque document rapporte 5 points

    // 2. Salaire
    const salary = parseFloat(dossier.researchSalary) || 0;
    if (salary >= 4000) score += 20;
    else if (salary >= 3000) score += 15;
    else if (salary >= 2000) score += 10;
    else if (salary > 0) score += 5;

    // 3. Ratio Budget / Salaire
    const budget = parseFloat(dossier.researchBudget) || 0;
    if (salary > 0) {
        const ratio = budget / salary;
        if (ratio <= 0.33) score += 20;  // Moins d'un tiers
        else if (ratio <= 0.5) score += 10;
        else if (ratio <= 0.7) score += 5;
        else score -= 10; // Budget trop haut par rapport au salaire
    }

    // 4. Garantie (si un garant est présent)
    if (dossier.guarantorFirstname && dossier.guarantorLastname) {
        score += 15;
    }

    // S'assurer que le score reste entre 0 et 100
    score = Math.min(100, Math.max(0, score));

    return score;
}

module.exports = { getDossier, updateDossier, getAllDossiers, getPublicDossier };
