const express = require('express');
const router = express.Router();
const { update, getAllUsers } = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

router.put('/update', authMiddleware, update);
router.get('/allusers', authMiddleware, getAllUsers);

module.exports = router;