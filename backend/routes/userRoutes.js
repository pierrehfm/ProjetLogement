const express = require('express');
const router = express.Router();
const { update } = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

router.put('/update', authMiddleware, update);

module.exports = router;