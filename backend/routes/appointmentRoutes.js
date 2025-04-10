const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment } = require('../controllers/appointmentController');
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer();

router.get("/appointments", authMiddleware, getAppointments);
router.post("/appointment", authMiddleware, upload.none(), createAppointment);

module.exports = router;