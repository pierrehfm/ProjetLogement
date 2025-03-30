const Appointment = require("../models/Appointment");

const getAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointments = await Appointment.findAll({ where: { userId } });

        res.json(appointments);
    } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const createAppointment = async (req, res) => {
    try {
        const { date, time, link, description } = req.body;
        const userId = req.user.id;
        const newAppointment = await Appointment.create({
            userId,
            date,
            time,
            link,
            description,
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Erreur lors de l'ajout du rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = { getAppointments, createAppointment };
