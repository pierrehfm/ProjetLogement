import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAppointments, createAppointment } from "../../api/appointments";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Navbar from "../../components/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/Calendar.css";

const CalendarPage = () => {
    const { me, token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        link: "",
        description: "",
    });
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (token) {
                const data = await getAppointments(token);
                console.log("Appointments récupérés :", data);
                setAppointments(data);
            }
        };
        fetchAppointments();
    }, [token]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddAppointment = async () => {
        const form = new FormData();
        form.append("date", formData.date);
        form.append("time", formData.time);
        form.append("description", formData.description);
        form.append("link", formData.link);
        await createAppointment(token, form);
        // Refresh appointments after adding
        const data = await getAppointments(token);
        setAppointments(data);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const appointmentsForSelectedDate = appointments.filter(
        (appt) =>
            new Date(appt.date).toDateString() ===
            new Date(selectedDate).toDateString()
    );

    return (
        <div>
            <Navbar />
            <div className="calendar-container">
                <div>
                    <Calendar
                        prev2Label={null}
                        next2Label={null}
                        prevLabel="‹"
                        nextLabel="›"
                        onClickDay={handleDateClick}
                        tileClassName={({ date, view }) => {
                            if (view === "month") {
                                const hasAppointment = appointments.some(
                                    (appt) =>
                                        new Date(appt.date).toDateString() ===
                                        date.toDateString()
                                );
                                return hasAppointment ? "has-appointment" : null;
                            }
                        }}
                    />
                    {selectedDate && (
                        <div style={{ marginTop: "20px", maxWidth: "500px" }}>
                            <h4>
                                Rendez-vous le{" "}
                                {new Date(selectedDate).toLocaleDateString()}
                            </h4>
                            {appointmentsForSelectedDate.length > 0 ? (
                                appointmentsForSelectedDate.map((appt, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            background: "#f1f1f1",
                                            padding: "10px",
                                            borderRadius: "6px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <strong>Heure :</strong> {appt.time}
                                        <br />
                                        <strong>Description :</strong> {appt.description}
                                        <br />
                                        {appt.link && (
                                            <>
                                                <strong>Lien :</strong>{" "}
                                                <a
                                                    href={appt.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {appt.link}
                                                </a>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>Aucun rendez-vous ce jour-là.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="form-container">
                    <h3>Ajouter un rendez-vous</h3>
                    <div className="input-group">
                        <Input
                            type="date"
                            name="date"
                            placeholder="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="time"
                            name="time"
                            placeholder="Heure (HH:mm)"
                            value={formData.time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Input
                        type="text"
                        name="link"
                        placeholder="Lien du dossier / annonce"
                        value={formData.link}
                        onChange={handleInputChange}
                    />
                    <Textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <Button onClick={handleAddAppointment} text="Ajouter" />
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
