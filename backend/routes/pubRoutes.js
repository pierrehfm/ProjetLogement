const express = require('express');
const router = express.Router();
const { getPub, updatePub, getAllPub } = require('../controllers/pubController');
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadPubMiddleware");

router.get("/pub", authMiddleware, getPub);
router.post("/pub", authMiddleware, upload.fields([
    { name: "image" }
]), updatePub);
router.get("/allpub", authMiddleware, getAllPub);

module.exports = router;