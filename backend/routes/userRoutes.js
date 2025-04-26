const express = require('express');
const router = express.Router();
const { update, getAllUsers, updateUserType } = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

router.put('/update', authMiddleware, update);
router.put('/updateusertype', authMiddleware, updateUserType);
router.get('/allusers', authMiddleware, getAllUsers);

module.exports = router;