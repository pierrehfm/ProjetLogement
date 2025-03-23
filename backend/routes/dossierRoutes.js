const express = require('express');
const router = express.Router();
const { getDossier, updateDossier, getAllDossiers, getPublicDossier } = require('../controllers/dossierController');
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/dossier", authMiddleware, getDossier);
router.post("/dossier", authMiddleware, upload.fields([
    { name: "photo" },
    { name: "proofOfIncome" },
    { name: "paySlip" },
    { name: "incomeSelfEmployment" },
    { name: "employerCertificate" },
    { name: "aidOrAllowance" },
    { name: "pensionRetirement" },
    { name: "identityProof" },
    { name: "adressProof" },
    { name: "bankingDocuments" },
    { name: "taxNotice" },
    { name: "diplomasOrCertificates" }
]), updateDossier);
router.get("/alldossiers", authMiddleware, getAllDossiers);
router.get("/dossier/:id?", getPublicDossier);

module.exports = router;