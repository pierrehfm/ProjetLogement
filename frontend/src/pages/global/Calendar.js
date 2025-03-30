import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getAppointments, createAppointment } from "../../api/appointments";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Navbar from "../../components/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importer les styles de react-calendar
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

    useEffect(() => {
        const fetchAppointments = async () => {
            if (token) {
                const data = await getAppointments(token);
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
        const result = await createAppointment(token, form);

        alert(result.message);
     
    };

    // const tileClassName = ({ date, view }) => {
    //     const eventDates = appointments.map((a) => new Date(a.date).toDateString());
    //     if (view === "month" && eventDates.includes(date.toDateString())) {
    //         return "highlighted-event";
    //     }
    //     return "";
    // };

    return (
        <div>
            <Navbar />
            <div className="calendar-container">
                <Calendar
                    prev2Label={null}
                    next2Label={null}
                    prevLabel="‹"
                    nextLabel="›"
                />

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
