const express = require('express');
const router = express.Router();
const { getDossier, updateDossier } = require('../controllers/dossierController');
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/dossier", authMiddleware, getDossier); // Récupérer le dossier
router.post("/dossier", authMiddleware, upload.fields([{ name: "file1" }, { name: "file2" }]), updateDossier); // Créer ou MAJ

module.exports = router;